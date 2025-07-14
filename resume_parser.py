import spacy
import PyPDF2
from docx import Document
import re

# Load the English language model for spaCy
nlp = spacy.load("en_core_web_lg")

def extract_text_from_pdf(file_path):
    """Extract text from a PDF file."""
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = " ".join([page.extract_text() for page in reader.pages])
    return text

def extract_text_from_docx(file_path):
    """Extract text from a DOCX file."""
    doc = Document(file_path)
    return " ".join([paragraph.text for paragraph in doc.paragraphs])

def extract_contact_info(text):
    """Extract email and phone number from text."""
    email = re.search(r'[\w\.-]+@[\w\.-]+', text)
    phone = re.search(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})', text)
    return {
        'email': email.group(0) if email else None,
        'phone': phone.group(0) if phone else None
    }

def extract_skills(text):
    """Extract skills from text using NLP."""
    doc = nlp(text)
    skills = []
    
    # Extract noun phrases that might represent skills
    for chunk in doc.noun_chunks:
        if len(chunk.text.split()) <= 3:  # Avoid long phrases
            skills.append(chunk.text)
    
    # Also look for specific entities that might be skills
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT"]:  # Organizations and products might be skills
            skills.append(ent.text)
    
    return list(set(skills))  # Remove duplicates

def extract_experience(text):
    """Extract work experience from text."""
    doc = nlp(text)
    experience = []
    
    # Simple pattern matching for experience sections
    experience_patterns = [
        r'experience(.+?)education',
        r'work history(.+?)education',
        r'employment(.+?)education'
    ]
    
    for pattern in experience_patterns:
        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        if match:
            experience_text = match.group(1)
            # Split into individual jobs
            jobs = re.split(r'\n\s*\n', experience_text.strip())
            for job in jobs:
                if job.strip():
                    experience.append(job.strip())
            break
    
    return experience

def extract_education(text):
    """Extract education information from text."""
    doc = nlp(text)
    education = []
    
    # Simple pattern matching for education sections
    education_patterns = [
        r'education(.+?)(experience|work history|employment|$)',
        r'education(.+?)$'
    ]
    
    for pattern in education_patterns:
        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        if match:
            education_text = match.group(1)
            # Split into individual entries
            entries = re.split(r'\n\s*\n', education_text.strip())
            for entry in entries:
                if entry.strip():
                    education.append(entry.strip())
            break
    
    return education

def parse_resume(file_path):
    """Main function to parse a resume file."""
    if file_path.endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file format")
    
    # Clean up text
    text = ' '.join(text.split())  # Remove extra whitespace
    
    # Extract information
    contact_info = extract_contact_info(text)
    skills = extract_skills(text)
    experience = extract_experience(text)
    education = extract_education(text)
    
    # Extract name (first line usually)
    name = text.split('\n')[0].strip()
    
    return {
        'name': name,
        'email': contact_info['email'],
        'phone': contact_info['phone'],
        'skills': skills,
        'experience': experience,
        'education': education,
        'raw_text': text
    }
