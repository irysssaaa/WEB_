// Допоміжна функція для дописування нуля спереду
function pad2(num) {
    return num.toString().padStart(2, "0");
}

// Головна функція з умови
function formatDate(date) {
    const now = new Date();
    const diffMs = now - date;              // різниця в мілісекундах
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 1) {
        return "прямо зараз";
    }

    if (diffSec < 60) {
        return `${diffSec} сек. назад`;
    }

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) {
        return `${diffMin} хв. назад`;
    }

    // Повна дата: DD.MM.YY HH:mm
    const day = pad2(date.getDate());
    const month = pad2(date.getMonth() + 1);
    const year = pad2(date.getFullYear() % 100);
    const hours = pad2(date.getHours());
    const minutes = pad2(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Підключення до елементів сторінки
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("dateInput");
    const btn = document.getElementById("formatBtn");
    const output = document.getElementById("output");

    btn.addEventListener("click", function () {
        if (!input.value) {
            output.textContent = "Виберіть дату та час!";
            return;
        }

        const date = new Date(input.value);
        const result = formatDate(date);
        output.textContent = result;
    });
});
