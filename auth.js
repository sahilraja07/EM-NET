// Form validation and submission handling
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Password validation rules
    const passwordRules = {
        minLength: 8,
        hasUpperCase: /[A-Z]/,
        hasLowerCase: /[a-z]/,
        hasNumber: /[0-9]/,
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
    };

    // Validate password
    function validatePassword(password) {
        const errors = [];
        
        if (password.length < passwordRules.minLength) {
            errors.push(`Password must be at least ${passwordRules.minLength} characters long`);
        }
        if (!passwordRules.hasUpperCase.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!passwordRules.hasLowerCase.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!passwordRules.hasNumber.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!passwordRules.hasSpecialChar.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        return errors;
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            const remember = loginForm.remember.checked;

            try {
                // Add loading state
                const submitButton = loginForm.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Logging in...';
                submitButton.disabled = true;

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Here you would typically make an API call to your backend
                console.log('Login attempt:', { email, remember });

                // Redirect to dashboard (replace with your actual dashboard URL)
                window.location.href = 'dashboard.html';
            } catch (error) {
                alert('Login failed. Please check your credentials and try again.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;

            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Validate password strength
            const passwordErrors = validatePassword(password);
            if (passwordErrors.length > 0) {
                alert('Password requirements:\n' + passwordErrors.join('\n'));
                return;
            }

            const formData = {
                facilityName: registerForm.facilityName.value,
                facilityType: registerForm.facilityType.value,
                email: registerForm.email.value,
                phone: registerForm.phone.value,
                password: password
            };

            try {
                // Add loading state
                const submitButton = registerForm.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Creating Account...';
                submitButton.disabled = true;

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Here you would typically make an API call to your backend
                console.log('Registration data:', formData);

                // Redirect to login page
                window.location.href = 'login.html?registered=true';
            } catch (error) {
                alert('Registration failed. Please try again.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Show success message if redirected after registration
    if (window.location.href.includes('login.html?registered=true')) {
        alert('Registration successful! Please log in with your credentials.');
    }
});

// Add password visibility toggle
document.addEventListener('DOMContentLoaded', () => {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'password-toggle';
        toggleButton.innerHTML = '👁️';
        toggleButton.style.position = 'absolute';
        toggleButton.style.right = '10px';
        toggleButton.style.top = '50%';
        toggleButton.style.transform = 'translateY(-50%)';
        toggleButton.style.border = 'none';
        toggleButton.style.background = 'none';
        toggleButton.style.cursor = 'pointer';
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
            toggleButton.innerHTML = input.type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });
}); 