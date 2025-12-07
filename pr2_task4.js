const betInput = document.getElementById("betInput");
const playBtn = document.getElementById("playBtn");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

function getRandomFromMinus5To5() {
    // ціле число від -5 до 5 включно
    return Math.floor(Math.random() * 11) - 5;
}

playBtn.addEventListener("click", function () {
    const betValue = parseFloat(betInput.value);

    resultDiv.textContent = "";
    resultDiv.className = "";
    statusDiv.textContent = "";

    if (isNaN(betValue) || betValue <= 0) {
        statusDiv.textContent = "Введіть додатну суму ставки.";
        return;
    }

    // показуємо процес "очікування"
    statusDiv.textContent = "Генеруємо результат, зачекайте 1 секунду...";
    playBtn.disabled = true;

    const randomNumber = getRandomFromMinus5To5();

    setTimeout(function () {
        // завершення "очікування"
        statusDiv.textContent = `Випало число: ${randomNumber}`;

        if (randomNumber <= 0) {
            resultDiv.textContent = "Ви не вгадали зі своєю ставкою. Ставка програна.";
            resultDiv.className = "result-lose";
        } else {
            const winAmount = betValue * randomNumber;
            resultDiv.textContent = `Вітаємо! Ви виграли ${winAmount.toFixed(2)} грн 🎉`;
            resultDiv.className = "result-win";
        }

        playBtn.disabled = false;
    }, 1000);
});
