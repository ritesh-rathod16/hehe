document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const currentStep = document.getElementById('current-step');
    const totalSteps = document.getElementById('total-steps');
    const resumeSummary = document.getElementById('resume-summary');

    // Mock resume data - in a real app, this would come from the backend
    const mockResumeData = {
        name: "John Doe",
        skills: ["Python", "JavaScript", "Django", "React", "AWS", "SQL"],
        experience: "5 years of software development experience",
        education: "B.S. Computer Science from State University"
    };

    // Display resume summary
    resumeSummary.innerHTML = `
        <p><strong>Name:</strong> ${mockResumeData.name}</p>
        <p><strong>Skills:</strong> ${mockResumeData.skills.join(', ')}</p>
        <p><strong>Experience:</strong> ${mockResumeData.experience}</p>
        <p><strong>Education:</strong> ${mockResumeData.education}</p>
    `;

    // Interview questions - in a real app, these would be generated based on the job description
    const interviewQuestions = [
        "Can you tell me about your experience with Python and how you've used it in your projects?",
        "Describe a challenging problem you solved using JavaScript and how you approached it.",
        "How do you handle working in a team environment, especially when there are disagreements about technical approaches?",
        "What experience do you have with cloud technologies like AWS?",
        "Where do you see your career in the next 5 years?"
    ];

    totalSteps.textContent = interviewQuestions.length;

    let currentQuestionIndex = 0;

    // Display first question
    setTimeout(() => {
        addAIMessage(interviewQuestions[currentQuestionIndex]);
        currentStep.textContent = currentQuestionIndex + 1;
    }, 1000);

    // Send button click handler
    sendBtn.addEventListener('click', sendMessage);

    // Handle Enter key press
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            
            // Simulate AI response after a delay
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < interviewQuestions.length) {
                    addAIMessage(interviewQuestions[currentQuestionIndex]);
                    currentStep.textContent = currentQuestionIndex + 1;
                } else {
                    addAIMessage("Thank you for completing the interview! Your responses have been recorded and will be reviewed by our team.");
                    sendBtn.disabled = true;
                    userInput.disabled = true;
                }
            }, 1000);
        }
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="flex items-start justify-end">
                <div class="ml-3">
                    <div class="text-sm font-medium text-white">You</div>
                    <div class="mt-1 text-sm text-white">
                        <p>${text}</p>
                    </div>
                </div>
                <div class="flex-shrink-0 bg-indigo-100 rounded-full p-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
            </div>
        `;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function addAIMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ai-message';
        messageDiv.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0 bg-indigo-100 rounded-full p-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">AI Interviewer</div>
                    <div class="mt-1 text-sm text-gray-700">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        `;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
