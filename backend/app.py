import os
import sys
import logging
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import replicate
from flask_cors import CORS

# Setup logging with more detailed configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS with more specific settings for production
CORS(app, 
     origins=["*"],  # Allow all origins for now
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=False)

# Configure Replicate with token from environment
replicate_token = os.getenv("REPLICATE_API_TOKEN") or "r8_PjRsIVXS5VFs9DcOpa7Tyt0ZoMK5Jrx1NjkAl"
if not replicate_token:
    logger.error("REPLICATE_API_TOKEN not found in environment variables")
    # Don't raise error immediately, let the app start but log the issue
    logger.warning("App will start but API calls will fail without REPLICATE_API_TOKEN")

if replicate_token:
    replicate.api_token = replicate_token
    logger.info("Replicate API token configured successfully")
else:
    logger.warning("Replicate API token not configured - API calls will fail")

@app.route('/api/recommend', methods=['POST', 'OPTIONS'])
def get_recommendation():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
        return response
    
    # Check if API token is configured
    if not replicate_token:
        logger.error("Replicate API token not configured")
        return jsonify({
            "error": "API token not configured. Please check environment variables."
        }), 500
    
    # Handle actual POST request
    try:
        # Validate request data
        if not request.is_json:
            logger.error("Request is not JSON")
            return jsonify({"error": "Request must be JSON"}), 400
        
        user_data = request.json
        if not user_data:
            logger.error("Empty request body")
            return jsonify({"error": "Request body cannot be empty"}), 400
        
        user_q1 = user_data.get('q1', '')
        user_q2 = user_data.get('q2', '')

        # Validate required fields
        if not user_q1 or not user_q2:
            logger.error("Missing required fields: q1 or q2")
            return jsonify({"error": "Both q1 and q2 are required"}), 400

        logger.info(f"Received request - q1: {user_q1[:50]}..., q2: {user_q2[:50]}...")

        # Prepare prompt for Granite model
        prompt_text = (
            f"Berdasarkan data berikut, berikan rekomendasi jurusan kuliah dan pekerjaan yang cocok untuk saya:\n\n"
            f"Mata pelajaran favorit: {user_q1}\n"
            f"Hobi dan kegiatan: {user_q2}\n\n"
            f"Format jawaban harus ringkas dan jelas."
        )

        logger.info("Calling Replicate API...")
        
        # Call Replicate API with better error handling
        try:
            output = replicate.run(
                "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996",
                input={
                    "prompt": prompt_text,
                    "max_tokens": 1000
                }
            )
            logger.info("Granite model call successful")
        except Exception as granite_error:
            logger.warning(f"Granite model failed: {granite_error}")
            logger.info("Trying alternative model...")
            
            try:
                # Fallback to alternative model
                output = replicate.run(
                    "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
                    input={
                        "prompt": prompt_text,
                        "max_tokens": 1000
                    }
                )
                logger.info("Alternative model call successful")
            except Exception as alt_error:
                logger.error(f"Alternative model also failed: {alt_error}")
                raise Exception(f"Both models failed. Granite: {granite_error}, Alternative: {alt_error}")

        # Collect result from API output
        if not output:
            logger.error("Empty response from Replicate API")
            return jsonify({"error": "Empty response from AI model"}), 500
        
        result_text = "".join(output)
        logger.info(f"Replicate API call successful, response length: {len(result_text)}")

        return jsonify({"result": result_text})

    except Exception as e:
        # Log error in detail
        logger.error(f"Error occurred: {str(e)}", exc_info=True)
        
        # Handle specific Replicate errors
        error_str = str(e).lower()
        if "403" in error_str or "forbidden" in error_str:
            error_message = "Authentication failed. Please check your Replicate API token."
        elif "401" in error_str or "unauthorized" in error_str:
            error_message = "Unauthorized. Please check your Replicate API token."
        elif "quota" in error_str or "limit" in error_str:
            error_message = "API quota exceeded. Please try again later."
        elif "timeout" in error_str:
            error_message = "Request timeout. Please try again."
        else:
            error_message = f"An error occurred: {str(e)}"
        
        return jsonify({"error": error_message}), 500

@app.route('/test-token', methods=['GET'])
def test_token():
    """Test endpoint to verify Replicate API token"""
    try:
        if not replicate_token:
            return jsonify({
                "status": "error",
                "message": "REPLICATE_API_TOKEN not configured"
            }), 400
        
        # Test basic API call
        import requests
        
        headers = {
            "Authorization": f"Token {replicate_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get("https://api.replicate.com/v1/models", headers=headers)
        
        if response.status_code == 200:
            return jsonify({
                "status": "success",
                "message": "Token is valid",
                "status_code": response.status_code
            })
        else:
            return jsonify({
                "status": "error",
                "message": f"Token validation failed: {response.status_code}",
                "status_code": response.status_code,
                "response": response.text
            }), 400
            
    except Exception as e:
        logger.error(f"Token test error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": f"Token test failed: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the service is running"""
    return jsonify({
        "status": "healthy", 
        "message": "Service is running",
        "token_configured": bool(replicate_token)
    })

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    logger.info(f"Starting Flask app on port {port}")
    logger.info(f"Environment: {'production' if os.getenv('RENDER') else 'development'}")
    app.run(host='0.0.0.0', port=port, debug=False)