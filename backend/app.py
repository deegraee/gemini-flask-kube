import os
from flask import Flask, request, jsonify
import google.generativeai as genai # type: ignore
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Load API key from environment variable
API_KEY = os.getenv("API_KEY")

# Configure the generative AI library with the API key if it exists
if API_KEY:
    genai.configure(api_key=API_KEY)

@app.route('/')
def home():
    if API_KEY:
        return jsonify({"message": "You have accessed the backend and the API key is correct."})
    else:
        return jsonify({"message": "API key not configured"}), 400

@app.route('/generate', methods=['POST'])
def generate_text():
    prompt = request.json.get('prompt')
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        response = genai.generate_text(prompt=prompt)
        return jsonify({'response': response.result}) 
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
