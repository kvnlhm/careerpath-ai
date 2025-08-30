import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import replicate
from flask_cors import CORS  # Tambahkan baris ini

# Muat variabel lingkungan dari file .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Tambahkan baris ini untuk mengaktifkan CORS

# Konfigurasi Replicate dengan token dari .env
replicate.api_token = os.getenv("REPLICATE_API_TOKEN")

@app.route('/api/recommend', methods=['POST'])
def get_recommendation():
    try:
        user_data = request.json
        user_q1 = user_data.get('q1', '')
        user_q2 = user_data.get('q2', '')

        # Siapkan prompt untuk model Granite
        prompt_text = (
            f"Berdasarkan data berikut, berikan rekomendasi jurusan kuliah dan pekerjaan yang cocok untuk saya:\n\n"
            f"Mata pelajaran favorit: {user_q1}\n"
            f"Hobi dan kegiatan: {user_q2}\n\n"
            f"Format jawaban harus ringkas dan jelas."
        )

        # Panggil API Replicate (menggunakan library)
        output = replicate.run(
            "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996",
            input={
                "prompt": prompt_text,
                "max_tokens": 1000  # Tambahkan baris ini
            }
        )

        # Kumpulkan hasil dari output API
        result_text = "".join(output)

        return jsonify({"result": result_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)