// Флаг, щоб не викликати подію повторно під час програмної зміни значення
let isUpdating = false;

const fahrenheitInput = document.getElementById('fahrenheit');
const celsiusInput = document.getElementById('celsius');

function fahrenheitToCelsius(F) {
    return (5 / 9) * (F - 32);
}

function celsiusToFahrenheit(C) {
    return (9 / 5) * C + 32;
}

// Обробник зміни Фаренгейта
fahrenheitInput.addEventListener('input', function () {
    if (isUpdating) return;
    const value = parseFloat(this.value);

    if (isNaN(value)) {
        isUpdating = true;
        celsiusInput.value = '';
        isUpdating = false;
        return;
    }

    const celsius = fahrenheitToCelsius(value);
    isUpdating = true;
    celsiusInput.value = celsius.toFixed(2);
    isUpdating = false;
});

// Обробник зміни Цельсія
celsiusInput.addEventListener('input', function () {
    if (isUpdating) return;
    const value = parseFloat(this.value);

    if (isNaN(value)) {
        isUpdating = true;
        fahrenheitInput.value = '';
        isUpdating = false;
        return;
    }

    const fahrenheit = celsiusToFahrenheit(value);
    isUpdating = true;
    fahrenheitInput.value = fahrenheit.toFixed(2);
    isUpdating = false;
});
