# AI HR Screening Bot

An AI-powered tool to automate the initial screening of job candidates by parsing resumes, conducting chat interviews, and ranking candidates based on job requirements.

## Features

- **Resume Parser**: Extracts skills, experience, and education from resumes (PDF/DOCX)
- **AI Matching**: Scores candidates based on job description match
- **Chat Interview**: Conducts automated text-based screening interviews
- **Admin Dashboard**: HR view for managing and reviewing candidates

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Tailwind CSS for styling
- PDF.js for client-side PDF parsing

### Backend
- Python Flask
- spaCy for NLP
- scikit-learn for text matching

### AI/ML
- Resume parsing with NLP
- TF-IDF and cosine similarity for candidate matching
- OpenAI API for chat interviews (optional)

## Setup

1. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m spacy download en_core_web_lg
   python app.py
