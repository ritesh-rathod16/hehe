from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

nlp = spacy.load("en_core_web_lg")

def preprocess_text(text):
    """Preprocess text for matching."""
    # Remove stop words and lemmatize
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
    return " ".join(tokens)

def calculate_match_score(resume_text, job_description):
    """Calculate match score between resume and job description."""
    # Preprocess both texts
    processed_resume = preprocess_text(resume_text)
    processed_jd = preprocess_text(job_description)
    
    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([processed_resume, processed_jd])
    
    # Calculate cosine similarity
    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]
    
    # Convert to percentage
    match_score = round(similarity * 100, 2)
    
    return match_score

def extract_keywords(text, top_n=10):
    """Extract top keywords from text."""
    doc = nlp(text.lower())
    
    # Count non-stopword nouns
    keywords = {}
    for token in doc:
        if not token.is_stop and not token.is_punct and (token.pos_ == "NOUN" or token.pos_ == "PROPN"):
            lemma = token.lemma_
            keywords[lemma] = keywords.get(lemma, 0) + 1
    
    # Sort by frequency
    sorted_keywords = sorted(keywords.items(), key=lambda x: x[1], reverse=True)
    
    return [kw[0] for kw in sorted_keywords[:top_n]]
