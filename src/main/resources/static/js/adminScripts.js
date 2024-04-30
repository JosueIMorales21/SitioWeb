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
            setError(PASS, 'Ingresa una contraseña válida (8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo).');
            isValid = false;
        } else {
            setSuccess(PASS);
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

function validateTIENDA(inputField) {
    inputField.value = inputField.value.replace(/[^0-9]/g, '');
    if (inputField.value.length > 4) {
        inputField.value = inputField.value.slice(0, 4);
    }
}

////////////////////////////////////////////////////////////////////////////////////
/*   SEARCH ENGINE   */

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the search inputs and table body
    const leftSearchInput = document.getElementById('leftSearchInput');
    const rightSearchInput = document.getElementById('rightSearchInput');
    const tbody = document.querySelector('#userTable tbody');

    // Clone the original tbody
    const originalTbody = tbody.cloneNode(true);

    // Event listeners for the search inputs
    leftSearchInput.addEventListener('input', filterTable);
    rightSearchInput.addEventListener('input', filterTable);

    // Function to filter the table rows based on the search inputs
    function filterTable() {
        const leftSearchTerm = leftSearchInput.value.trim().toLowerCase();
        const rightSearchTerm = rightSearchInput.value.trim().toLowerCase();

        // Clear existing rows from the table body
        tbody.innerHTML = '';

        // Loop through each row in the original table body
        Array.from(originalTbody.children).forEach(row => {
            const NOMBRE = row.cells[1].textContent.trim().toLowerCase();
            const NEMPLEADO = row.cells[0].textContent.trim().toLowerCase();

            // Check if the row matches the search criteria for name and employee number
            const matchName = NOMBRE.includes(leftSearchTerm);
            const matchEmployeeNumber = NEMPLEADO.includes(rightSearchTerm);

            // If the row matches both search criteria, append it to the filtered table body
            if (matchName && matchEmployeeNumber) {
                tbody.appendChild(row.cloneNode(true));
            }
        });
    }
});
