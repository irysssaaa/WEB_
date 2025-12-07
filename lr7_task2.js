// Функція з умови завдання
function checkNumber(num) {
    return new Promise((resolve, reject) => {
        // Імітація асинхронної роботи (1 секунда)
        setTimeout(() => {
            if (num > 10) {
                resolve("Число більше 10");
            } else {
                reject("Число менше або дорівнює 10");
            }
        }, 1000);
    });
}

// Робота з елементами сторінки
const numberInput = document.getElementById("numberInput");
const checkBtn = document.getElementById("checkBtn");
const loader = document.getElementById("loader");
const resultDiv = document.getElementById("result");

checkBtn.addEventListener("click", () => {
    const value = Number(numberInput.value);

    // Перевірка на коректність введення
    if (Number.isNaN(value)) {
        resultDiv.textContent = "Введіть коректне число!";
        resultDiv.className = "result error";
        return;
    }

    // Показуємо лоадер (завдання 0)
    loader.style.display = "block";
    resultDiv.textContent = "";
    resultDiv.className = "result";

    checkNumber(value)
        .then(message => {
            resultDiv.textContent = message;
            resultDiv.className = "result success";
        })
        .catch(errorMessage => {
            resultDiv.textContent = errorMessage;
            resultDiv.className = "result error";
        })
        .finally(() => {
            // Ховаємо лоадер після завершення Promise
            loader.style.display = "none";
        });
});
