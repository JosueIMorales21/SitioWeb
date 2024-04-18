document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Ocultar";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Mostrar";
        }
    });
});

function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    usernameError.classList.add('d-none');
    passwordError.classList.add('d-none');

    if (username.trim() === '') {
        usernameError.classList.remove('d-none');
        return false;
    }

    if (password.trim() === '') {
        passwordError.classList.remove('d-none');
        return false;
    }

    return true;
}

function validateUser(inputField) {
    // Remove any non-numeric characters
    inputField.value = inputField.value.replace(/[^0-9]/g, '');

    // Limit the length of the input to 10 characters
    if (inputField.value.length > 10) {
        inputField.value = inputField.value.slice(0, 10);
    }
}