import os
import sys
import logging
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import replicate
from flask_cors import CORS

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Muat variabel lingkungan dari file .env
load_dotenv()

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000", 
    "https://careerpath-ai-chi.vercel.app",
    "https://careerpath-ai-chi.vercel.app/",
    "https://*.vercel.app"
], supports_credentials=True)

# Konfigurasi Replicate dengan token dari .env
replicate_token = os.getenv("REPLICATE_API_TOKEN")
if not replicate_token:
    logger.error("REPLICATE_API_TOKEN not found in environment variables")
    raise ValueError("REPLICATE_API_TOKEN is required")

replicate.api_token = replicate_token
logger.info("Replicate API token configured successfully")

@app.route('/api/recommend', methods=['POST'])
def get_recommendation():
    try:
        user_data = request.json
        user_q1 = user_data.get('q1', '')
        user_q2 = user_data.get('q2', '')

        logger.info(f"Received request - q1: {user_q1}, q2: {user_q2}")

        # Siapkan prompt untuk model Granite
        prompt_text = (
            f"Berdasarkan data berikut, berikan rekomendasi jurusan kuliah dan pekerjaan yang cocok untuk saya:\n\n"
            f"Mata pelajaran favorit: {user_q1}\n"
            f"Hobi dan kegiatan: {user_q2}\n\n"
            f"Format jawaban harus ringkas dan jelas."
        )

        logger.info("Calling Replicate API...")
        
        # Panggil API Replicate (menggunakan library)
        # Try Granite model first, fallback to alternative if needed
        try:
            output = replicate.run(
                "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996",
                input={
                    "prompt": prompt_text,
                    "max_tokens": 1000
                }
            )
        except Exception as granite_error:
            logger.warning(f"Granite model failed: {granite_error}")
            logger.info("Trying alternative model...")
            
            # Fallback to alternative model
            output = replicate.run(
                "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
                input={
                    "prompt": prompt_text,
                    "max_tokens": 1000
                }
            )

        # Kumpulkan hasil dari output API
        result_text = "".join(output)
        logger.info("Replicate API call successful")

        return jsonify({"result": result_text})

    except Exception as e:
        # Log error secara detail
        logger.error(f"Error occurred: {str(e)}", exc_info=True)
        
        # Handle specific Replicate errors
        if "403" in str(e):
            error_message = "Authentication failed. Please check your Replicate API token."
        elif "401" in str(e):
            error_message = "Unauthorized. Please check your Replicate API token."
        else:
            error_message = f"An error occurred: {str(e)}"
        
        return jsonify({"error": error_message}), 500

@app.route('/test-token', methods=['GET'])
def test_token():
    """Test endpoint to verify Replicate API token"""
    try:
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
    return jsonify({"status": "healthy", "message": "Service is running"})

if __name__ == '__main__':
    port = os.getenv("PORT", 5000)
    logger.info(f"Starting Flask app on port {port}")
    app.run(host='0.0.0.0', port=port)