from flask import Flask, request, jsonify
from resume_parser import parse_resume
import os

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/upload', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        # Save the file temporarily
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        # Parse the resume
        try:
            resume_data = parse_resume(filepath)
            return jsonify(resume_data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            # Clean up - remove the file after processing
            if os.path.exists(filepath):
                os.remove(filepath)

@app.route('/api/match', methods=['POST'])
def match_candidate():
    data = request.get_json()
    if not data or 'resume_text' not in data or 'job_description' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        from matching_algorithm import calculate_match_score
        match_score = calculate_match_score(data['resume_text'], data['job_description'])
        return jsonify({'match_score': match_score})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat_interview():
    data = request.get_json()
    if not data or 'message' not in data or 'conversation_history' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        # In a real app, you would use OpenAI API or similar here
        # This is a simplified mock response
        response = {
            "reply": "Thank you for your answer. Can you elaborate more on your experience with Python?",
            "score": 0.85,
            "next_question": "How do you handle debugging complex issues in your code?"
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
