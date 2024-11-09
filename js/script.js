let currentInput = '';
let operation = '';
let previousInput = '';
let history = [];

function appendNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number.toString();
        updateScreen();
    }
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    const operationString = `${previousInput} ${operation} ${currentInput} = ${result}`;
    history.push(operationString);
    updateHistory();
    currentInput = result.toString();
    operation = '';
    previousInput = '';
    updateScreen();
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateScreen();
}

// Función para eliminar el último dígito
function deleteLast() {
    currentInput = currentInput.slice(0, -1); // Elimina el último carácter
    updateScreen();
}

// Función para añadir un punto decimal
function appendDot() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateScreen();
    }
}

function updateScreen() {
    document.getElementById('screen').innerText = currentInput || '0';
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = history.join('<br>');
    historyElement.scrollTop = historyElement.scrollHeight;
}
