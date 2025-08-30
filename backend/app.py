import os
import sys
from flask import Flask

# Create a simple Flask app just to run on Render
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, this is a test page."

# This code will print the environment variable to the build logs
if __name__ == '__main__':
    api_token = os.getenv('REPLICATE_API_TOKEN')
    if api_token is None:
        print("REPLICATE_API_TOKEN environment variable not set.", file=sys.stderr)
    else:
        print(f"REPLICATE_API_TOKEN is set. Length: {len(api_token)}", file=sys.stderr)
    app.run(debug=True, port=os.getenv('PORT', 5000))