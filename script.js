document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const formBtn = document.querySelector('.form-btn');
    
    // Load saved form data if it exists
    const savedData = localStorage.getItem('dreamHomeFormSubmissions');
    if (savedData) {
        const submissions = JSON.parse(savedData);
        console.log('Previously saved submissions:', submissions);
    }

    formBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const passwordInput = form.querySelector('input[type="password"]');
        const userName = nameInput.value.trim();
        
        // Validation
        if (!userName || !emailInput.value || !passwordInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (passwordInput.value.length < 6) {
            alert('Password should be at least 6 characters long');
            return;
        }
        
        // Create submission object
        const submission = {
            name: userName,
            email: emailInput.value,
            timestamp: new Date().toISOString()
        };

        // Get existing submissions or create new array
        const existingSubmissions = JSON.parse(localStorage.getItem('dreamHomeFormSubmissions')) || [];
        
        // Add new submission
        existingSubmissions.push(submission);
        
        // Save to localStorage
        localStorage.setItem('dreamHomeFormSubmissions', JSON.stringify(existingSubmissions));
        
        // Show personalized success message
        alert(`Thank you ${userName}! We've received your information and will contact you soon.`);
        
        // Reset form
        form.reset();
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});