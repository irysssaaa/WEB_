// Функція з умови
function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні");
            }
        }, 1000); // затримка 1 секунда
    });
}

// Робота з елементами сторінки
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const compareBtn = document.getElementById("compareBtn");
const loader = document.getElementById("loader");
const resultDiv = document.getElementById("result");

compareBtn.addEventListener("click", () => {
    const num1 = Number(num1Input.value);
    const num2 = Number(num2Input.value);

    // Перевірка введення
    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        resultDiv.textContent = "Будь ласка, введіть обидва числа.";
        resultDiv.className = "error";
        return;
    }

    // Показуємо лоадер, очищаємо результат
    loader.style.display = "block";
    resultDiv.textContent = "";
    resultDiv.className = "";

    compareNumbers(num1, num2)
        .then(message => {
            loader.style.display = "none";
            resultDiv.textContent = message;
            resultDiv.className = "success";
        })
        .catch(errorMessage => {
            loader.style.display = "none";
            resultDiv.textContent = errorMessage;
            resultDiv.className = "error";
        });
});
