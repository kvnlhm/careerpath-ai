import os
import sys
import logging
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import replicate
from flask_cors import CORS

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS with the correct settings
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure Replicate with token from environment
replicate_token = os.getenv("REPLICATE_API_TOKEN")
if not replicate_token:
    logger.error("REPLICATE_API_TOKEN not found in environment variables")
    logger.warning("App will start, but API calls will fail without token.")

# This block will run on deployment and on every request
replicate.api_token = replicate_token
logger.info("Replicate API token configured successfully")

@app.route('/api/recommend', methods=['POST'])
def get_recommendation():
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
        
        # Check if API token is configured just before the call
        if not replicate_token:
            logger.error("Replicate API token is not configured")
            return jsonify({
                "error": "Internal server error: API token not configured."
            }), 500

        logger.info("Calling Replicate API...")
        
        # Call Replicate API
        try:
            output = replicate.run(
                "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996",
                input={
                    "prompt": (
                        f"Berdasarkan data berikut, berikan rekomendasi jurusan kuliah dan pekerjaan yang cocok untuk saya:\n\n"
                        f"Mata pelajaran favorit: {user_q1}\n"
                        f"Hobi dan kegiatan: {user_q2}\n\n"
                        f"Format jawaban harus ringkas dan jelas."
                    ),
                    "max_tokens": 1000
                }
            )
            logger.info("Granite model call successful")

        except Exception as granite_error:
            logger.error(f"Granite model failed: {granite_error}")
            return jsonify({
                "error": f"An error occurred with the AI model: {str(granite_error)}"
            }), 500

        # Collect result from API output
        if not output:
            logger.error("Empty response from Replicate API")
            return jsonify({"error": "Empty response from AI model"}), 500
        
        result_text = "".join(output)
        logger.info(f"Replicate API call successful, response length: {len(result_text)}")

        return jsonify({"result": result_text})

    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}", exc_info=True)
        return jsonify({"error": "An unexpected internal server error occurred."}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    logger.info(f"Starting Flask app on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
