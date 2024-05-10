//////////////////////////////////////////////////////////////////////////////////////////

/*                            SIDE MENU CONTROLLER                            */

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
//////////////////////////////////////////////////////////////////////////////////////////

/*                            USER FORM (CREATE)                            */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAdmin');
    const NEMPLEADO = document.getElementById('NEMPLEADO');
    const NOMBRE = document.getElementById('NOMBRE');
    const PASS = document.getElementById('PASS');

    form.addEventListener('submit', e => {
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

//////////////////////////////////////////////////////////////////////////////////////////

/*                            VALIDATE TEXT FORMAT FIELDS                            */

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

function validateDESCRIPCION(inputField) {
    inputField.value = inputField.value.replace(/[^a-zA-ZÁáÉéÍíÓóÚúÑñ0-9\s]/g, '');

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

//////////////////////////////////////////////////////////////////////////////////////////

/*                            SEARCH BARS CONFIGURATION                            */

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the search inputs and table body
    const leftSearchInput = document.getElementById('leftSearchInput');
    const rightSearchInput = document.getElementById('rightSearchInput');
    const tbody = document.querySelector('#userTable tbody');

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

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the search inputs and table body
    const leftSearchInput2 = document.getElementById('leftSearchInput2');
    const rightSearchInput2 = document.getElementById('rightSearchInput2');
    const tbody = document.querySelector('#userTable2 tbody');

    // Clone the original tbody
    const originalTbody = tbody.cloneNode(true);

    // Event listeners for the search inputs
    leftSearchInput2.addEventListener('input', filterTable);
    rightSearchInput2.addEventListener('input', filterTable);

    // Function to filter the table rows based on the search inputs
    function filterTable() {
        const leftSearchTerm = leftSearchInput2.value.trim().toLowerCase();
        const rightSearchTerm = rightSearchInput2.value.trim().toLowerCase();

        // Clear existing rows from the table body
        tbody.innerHTML = '';

        // Loop through each row in the original table body
        Array.from(originalTbody.children).forEach(row => {
            const DESCRIPCION = row.cells[1].textContent.trim().toLowerCase();
            const SKU = row.cells[0].textContent.trim().toLowerCase();

            // Check if the row matches the search criteria for name and employee number
            const matchName = DESCRIPCION.includes(leftSearchTerm);
            const matchEmployeeNumber = SKU.includes(rightSearchTerm);

            // If the row matches both search criteria, append it to the filtered table body
            if (matchName && matchEmployeeNumber) {
                tbody.appendChild(row.cloneNode(true));
            }
        });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////

/*                            PRODUCT FORMS (CREATE AND UPDATE)                            */

document.addEventListener('DOMContentLoaded', () => {
    const form2 = document.getElementById('formProduct');
    const SKU = document.getElementById('SKU');
    const DESCRIPCION = document.getElementById('DESCRIPCION');
    const COSTO = document.getElementById('COSTO');
    const PRECIO = document.getElementById('PRECIO');
    const DEPARTAMENTO = document.getElementById('DEPARTAMENTO');
    const TIENDA = document.getElementById('TIENDA_PROD');
    const DESCUENTO = document.getElementById('DESCUENTO');
    const CANTIDAD_TOTAL = document.getElementById('CANTIDAD_TOTAL');
    const CANTIDAD_DISPONIBLE = document.getElementById('CANTIDAD_DISPONIBLE');

    form2.addEventListener('submit', e => {
        console.log('Form submitted'); // Debugging line
        if (!validateInputs()) {
            e.preventDefault(); // Prevent the form from being submitted
        }
    });

    const setError = (element1, message) => {
        const inputControl = element1.parentElement;
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

    const validateInputs = () => {
        let isValid = true;

        const skuValue = SKU.value.trim();
        const descripcionValue = DESCRIPCION.value.trim();
        const costoValue = COSTO.value.trim();
        const precioValue = PRECIO.value.trim();
        const departamentoValue = DEPARTAMENTO.value.trim();
        const tiendaValue = TIENDA.value.trim();
        const descuentoValue = DESCUENTO.value.trim();
        const cantidad_totalValue = CANTIDAD_TOTAL.value.trim();
        const cantidad_disponibleValue = CANTIDAD_DISPONIBLE.value.trim();

        if (!skuValue) {
            setError(SKU, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(SKU);
        }

        if (!descripcionValue) {
            setError(DESCRIPCION, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(DESCRIPCION);
        }

        if (!costoValue) {
            setError(COSTO, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(COSTO);
        }

        if (!precioValue) {
            setError(PRECIO, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(PRECIO);
        }

        if (!departamentoValue) {
            setError(DEPARTAMENTO, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(DEPARTAMENTO);
        }

        if (!tiendaValue) {
            setError(TIENDA, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(TIENDA);
        }

        if (!descuentoValue) {
            setError(DESCUENTO, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(DESCUENTO);
        }

        if (!cantidad_totalValue) {
            setError(CANTIDAD_TOTAL, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(CANTIDAD_TOTAL);
        }

        if (!cantidad_disponibleValue) {
            setError(CANTIDAD_DISPONIBLE, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(CANTIDAD_DISPONIBLE);
        }

        return isValid;
    };
})

function validateSKU(inputField) {
    inputField.value = inputField.value.replace(/[^0-9]/g, '');
    if (inputField.value.length > 14) {
        inputField.value = inputField.value.slice(0, 14);
    }
}

function validateDEPA(inputField) {
    inputField.value = inputField.value.replace(/[^0-9]/g, '');
    if (inputField.value.length > 2) {
        inputField.value = inputField.value.slice(0, 2);
    }
}

/*                     AUTOCOMPLETE EDIT FORMS (UPDATE PRODUCT)                     */

function autoCompleteEditProduct(button) {
    const sValue = button.value;
    console.log(sValue);

    const skuInput = document.getElementById('SKU' + sValue);
    const descripcionInput = document.getElementById('DESCRIPCION' + sValue);
    const costoInput = document.getElementById('COSTO' + sValue);
    const precioInput = document.getElementById('PRECIO' + sValue);
    const departamentoInput = document.getElementById('DEPARTAMENTO' + sValue);
    const tiendaInput = document.getElementById('TIENDA_PROD' + sValue);
    const descuentoInput = document.getElementById('DESCUENTO' + sValue);
    const cantidad_totalInput = document.getElementById('CANTIDAD_TOTAL' + sValue);
    const cantidad_disponibleInput = document.getElementById('CANTIDAD_DISPONIBLE' + sValue);

    const skuValue = document.getElementById('SKU_VALUE' + sValue).getAttribute('value');
    const descripcionValue = document.getElementById('DESCRIPCION_VALUE' + sValue).getAttribute('value');
    const costoValue = document.getElementById('COSTO_VALUE' + sValue).getAttribute('value');
    const precioValue = document.getElementById('PRECIO_VALUE' + sValue).getAttribute('value');
    const departamentoValue = document.getElementById('DEPARTAMENTO_VALUE' + sValue).getAttribute('value');
    const tiendaValue = document.getElementById('TIENDA_PROD_VALUE' + sValue).getAttribute('value');
    const descuentoValue = document.getElementById('DESCUENTO_VALUE' + sValue).getAttribute('value');
    const cantidad_totalValue = document.getElementById('CANTIDAD_TOTAL_VALUE' + sValue).getAttribute('value');
    const cantidad_disponibleValue = document.getElementById('CANTIDAD_DISPONIBLE_VALUE' + sValue).getAttribute('value');

    skuInput.value = skuValue;
    descripcionInput.value = descripcionValue;
    costoInput.value = costoValue;
    precioInput.value = precioValue;
    departamentoInput.value = departamentoValue;
    tiendaInput.value = tiendaValue;
    descuentoInput.value = descuentoValue;
    cantidad_totalInput.value = cantidad_totalValue;
    cantidad_disponibleInput.value = cantidad_disponibleValue;

    const prodForm = document.getElementById('productEditForm' + sValue);

    prodForm.addEventListener('submit', e => {
        if (!validateData()) {
            e.preventDefault();
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

    const validateData = () => {
        let isValid = true;

        const skuValor = skuInput.value.trim();
        const descripcionValor = descripcionInput.value.trim();
        const costoValor = costoInput.value.trim();
        const precioValor = precioInput.value.trim();
        const departamentoValor = departamentoInput.value.trim();
        const tiendaValor = tiendaInput.value.trim();
        const descuentoValor = descuentoInput.value.trim();
        const cantidad_totalValor = cantidad_totalInput.value.trim();
        const cantidad_disponibleValor = cantidad_disponibleInput.value.trim();

        if (!skuValor) {
            setError(skuInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(skuInput);
        }

        if (!descripcionValor) {
            setError(descripcionInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(descripcionInput);
        }

        if (!costoValor) {
            setError(costoInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(costoInput);
        }

        if (!precioValor) {
            setError(precioInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(precioInput);
        }

        if (!departamentoValor) {
            setError(departamentoInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(departamentoInput);
        }

        if (!tiendaValor) {
            setError(tiendaInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(tiendaInput);
        }

        if (!descuentoValor) {
            setError(descuentoInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(descuentoInput);
        }

        if (!cantidad_totalValor) {
            setError(cantidad_totalInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(cantidad_totalInput);
        }

        if (!cantidad_disponibleValor) {
            setError(cantidad_disponibleInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(cantidad_disponibleInput);
        }

        return isValid;
    };
}

//////////////////////////////////////////////////////////////////////////////////////////

/*                     AUTOCOMPLETE EDIT FORMS (UPDATE USER)                     */

function autoCompleteEditUser(button) {
    const nemValue = button.value;

    console.log(nemValue)

    const nempleadoInput = document.getElementById('NEMPLEADO1' + nemValue);
    const nombreInput = document.getElementById('NOMBRE1' + nemValue);
    const passInput = document.getElementById('PASS1' + nemValue);
    const tiendaInput = document.getElementById('TIENDA1' + nemValue);

    const nempleadoValue = document.getElementById('NEMPLEADO_VALUE' + nemValue).getAttribute('value');
    const nombreValue = document.getElementById('NOMBRE_VALUE' + nemValue).getAttribute('value');
    const passValue = document.getElementById('PASS_VALUE' + nemValue).getAttribute('value');
    const tiendaValue = document.getElementById('TIENDA_VALUE' + nemValue).getAttribute('value');

    nempleadoInput.value = nempleadoValue;
    nombreInput.value = nombreValue;
    passInput.value = passValue;
    tiendaInput.value = tiendaValue;

    const form = document.getElementById('userEditForm' + nemValue);

    form.addEventListener('submit', e => {
        if (!validateInputs()) {
            e.preventDefault();
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

        const nempleado1Value = nempleadoInput.value.trim();
        const nombre1Value = nombreInput.value.trim();
        const pass1Value = passInput.value.trim();

        if (nempleado1Value != null) {
            setSuccess(nempleadoInput);
        } else {
            setError(nempleadoInput, "NEMPLEADO no encontrado.")
            isValid = false;
        }

        if (!nombre1Value) {
            setError(nombreInput, 'Campo requerido');
            isValid = false;
        } else {
            setSuccess(nombreInput);
        }

        if (!pass1Value) {
            setError(passInput, 'Campo requerido');
            isValid = false;
        } else if (!isValidPASS(pass1Value)) {
            setError(passInput, 'Ingresa una contraseña válida (8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo).');
            isValid = false;
        } else {
            setSuccess(passInput);
        }
        return isValid;
    };

}