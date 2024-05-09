//////////////////////////////////////////////////////////////////////////////////////////

/*                            LOGIN CONFIGURATION                            */


//////////////////////////////////////////////////////////////////////////////////////////

/*                     TOOGLE PASSWORD FUNCTION (SHOW HIDE PASSWORD)                     */

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

//////////////////////////////////////////////////////////////////////////////////////////

/*                             USER CREDENTIALS VALIDATION                              */

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

//////////////////////////////////////////////////////////////////////////////////////////

/*                                VALIDATE FIELDS FORMAT                                */



/*                            USER NUMBER VALIDATION                           */
function validateUser(inputField) {

    // USER CAN ONLY ENTER NUMBERS FROM 0 TO 9
    inputField.value = inputField.value.replace(/[^0-9]/g, '');

    // LIMIT THE FIELD LENGTH UP TO 10 CHARACTERS
    if (inputField.value.length > 10) {
        inputField.value = inputField.value.slice(0, 10);
    }
}

/*                              PASSWORD VALIDATION                             */
function validatePassword(inputField) {
    // LIMIT THE FIELD LENGTH UP TO 8 CHARACTERS
    if (inputField.value.length > 8) {
        inputField.value = inputField.value.slice(0, 8);
    }
}