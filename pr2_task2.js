// скільки секунд сторінка вже працює
let secondsPassed = 0;

// додає 0, якщо число < 10
function addZero(num) {
    return num < 10 ? "0" + num : num;
}

// показ поточного часу
function showTime() {
    const now = new Date();

    const h = addZero(now.getHours());
    const m = addZero(now.getMinutes());
    const s = addZero(now.getSeconds());

    document.getElementById("time").textContent = `${h}:${m}:${s}`;
}

// оновлення кожні 5 секунд
function updateClock() {
    showTime();
    secondsPassed += 5;

    // після 30 секунд — закрити сторінку
    if (secondsPassed >= 30) {
        window.close();
    }
}

// запуск
showTime();
const timer = setInterval(updateClock, 5000);
