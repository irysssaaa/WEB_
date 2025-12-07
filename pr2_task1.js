// Функція, яка додає 0, якщо число < 10
function addZero(value) {
    return value < 10 ? "0" + value : value;
}

// Функція годинника
function showTime() {
    const now = new Date();

    let hours = addZero(now.getHours());
    let minutes = addZero(now.getMinutes());
    let seconds = addZero(now.getSeconds());

    const timeString = hours + ":" + minutes + ":" + seconds;

    document.getElementById("clock").textContent = timeString;

    // Оновлення кожну секунду
    setTimeout(showTime, 1000);
}

// Запуск після завантаження сторінки
showTime();
