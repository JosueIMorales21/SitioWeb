function openMenu(menuId) {
    var menu = document.getElementById(menuId);
    if (menu.style.display === "none" || menu.style.display === "") {
        // Hide all menus
        var menus = document.querySelectorAll('.menu');
        menus.forEach(function(menu) {
            menu.style.display = "none";
        });

        // Show the selected menu
        menu.style.display = "block";
    } else {
        // Hide the selected menu
        menu.style.display = "none";
    }
}
///////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAdmin');
    const NEMPLEADO = document.getElementById('NEMPLEADO');
    const NOMBRE = document.getElementById('NOMBRE');
    const PASS = document.getElementById('PASS');
    const PERFIL = document.getElementById('PERFIL');

    form.addEventListener('submit', e => {
        console.log('Form submitted'); // Debugging line
        if (!validateInputs()) {
            e.preventDefault(); // Prevent the form from being submitted
        }
    });

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidPASS = password => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_.])[A-Za-z\d!@#$%^&*()_.]{8,}$/;
        return re.test(String(password));
    }

    const validateInputs = () => {
        let isValid = true;

        const nempleadoValue = NEMPLEADO.value.trim();
        const nombreValue = NOMBRE.value.trim();
        const passValue = PASS.value.trim();
        const perfilValue = PERFIL.value.trim();

        if (!nempleadoValue) {
            setError(NEMPLEADO, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(NEMPLEADO);
        }

        if (!nombreValue) {
            setError(NOMBRE, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(NOMBRE);
        }

        if (!passValue) {
            setError(PASS, 'Campo requerido');
            isValid = false;
        } else if (!isValidPASS(passValue)) {
            setError(PASS, 'Ingresa una contraseña válida');
            isValid = false;
        } else {
            setSuccess(PASS);
        }

        if (!perfilValue) {
            setError(PERFIL, 'Campo requerido');
            isValid = false;
        } else if (perfilValue !== '10' && perfilValue !== '15') {
            setError(PERFIL, 'Rol desconocido.');
            isValid = false;
        } else {
            setSuccess(PERFIL);
        }

        return isValid;
    };
})


///////////////////////////////////////////////////////////////////

function validateNEMPLEADO(inputField) {
    // Remove any non-numeric characters
    inputField.value = inputField.value.replace(/[^0-9]/g, '');

    // Limit the length of the input to 10 characters
    if (inputField.value.length > 10) {
        inputField.value = inputField.value.slice(0, 10);
    }
}

function validateNOMBRE(inputField) {
    // Remove any non-alphabetic characters including "ñ" and spaces
    inputField.value = inputField.value.replace(/[^a-zA-ZÁáÉéÍíÓóÚúÑñ\s]/g, '');

    // Limit the length of the input to 50 characters
    if (inputField.value.length > 50) {
        inputField.value = inputField.value.slice(0, 50);
    }
}

function validatePASS(inputField) {
    // Remove any characters other than letters (including accents), numbers, and symbols
    inputField.value = inputField.value.replace(/[^a-zA-ZÁáÉéÍíÓóÚú\s\d!?$.]/g, '');

    // Limit the length of the input to 8 characters
    if (inputField.value.length > 8) {
        inputField.value = inputField.value.slice(0, 8);
    }

    // Validate the password format
    const passwordRegex = /^(?=.*[a-záéíóú])(?=.*[A-ZÁÉÍÓÚ])(?=.*\d)(?=.*[!?$])[A-Za-zÁáÉéÍíÓóÚú\d!?$]{8,}$/;

    if (!passwordRegex.test(inputField.value)) {
        // Show error message if the password does not meet the criteria
        document.getElementById("PASS_error").classList.remove("d-none");
    } else {
        document.getElementById("PASS_error").classList.add("d-none");
    }
}

function validatePERFIL(inputField) {
    inputField.value = inputField.value.replace(/[^0-9]/g, '');
    if (inputField.value.length > 2) {
        inputField.value = inputField.value.slice(0, 2);
    }
}

function validateTIENDA(inputField) {
    inputField.value = inputField.value.replace(/[^0-9]/g, '');
    if (inputField.value.length > 4) {
        inputField.value = inputField.value.slice(0, 4);
    }
}

