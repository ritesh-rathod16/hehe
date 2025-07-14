document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('upload-container');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const parseBtn = document.getElementById('parse-btn');
    const resumeData = document.getElementById('resume-data');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    // Handle file selection via button
    fileInput.addEventListener('change', function(e) {
        handleFiles(e.target.files);
    });

    // Parse button click handler
    parseBtn.addEventListener('click', function() {
        // In a real app, this would send the file to the backend for parsing
        // For this demo, we'll use mock data
        const mockResumeData = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "(123) 456-7890",
            skills: ["Python", "JavaScript", "Django", "React", "AWS", "SQL"],
            experience: [
                {
                    title: "Senior Software Engineer",
                    company: "Tech Corp Inc.",
                    duration: "2018 - Present",
                    description: "Led a team of developers to build scalable web applications using Python and Django."
                },
                {
                    title: "Software Developer",
                    company: "Web Solutions LLC",
                    duration: "2015 - 2018",
                    description: "Developed and maintained front-end features using React and JavaScript."
                }
            ],
            education: [
                {
                    degree: "B.S. Computer Science",
                    university: "State University",
                    year: "2015"
                }
            ]
        };

        displayResumeData(mockResumeData);
        resumeData.classList.remove('hidden');
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('border-indigo-400', 'bg-indigo-50');
    }

    function unhighlight() {
        dropArea.classList.remove('border-indigo-400', 'bg-indigo-50');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            fileName.textContent = file.name;
            fileInfo.classList.remove('hidden');
        }
    }

    function displayResumeData(data) {
        // Display personal info
        const personalInfo = document.getElementById('personal-info');
        personalInfo.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        `;

        // Display skills
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = data.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');

        // Display experience
        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = data.experience.map(exp => `
            <div class="experience-item">
                <h4 class="font-semibold">${exp.title}</h4>
                <p class="text-gray-600">${exp.company} | ${exp.duration}</p>
                <p class="text-gray-700 mt-1">${exp.description}</p>
            </div>
        `).join('');

        // Display education
        const educationList = document.getElementById('education-list');
        educationList.innerHTML = data.education.map(edu => `
            <p><strong>${edu.degree}</strong></p>
            <p class="text-gray-600">${edu.university}, ${edu.year}</p>
        `).join('');
    }
});
