// Функція повертає останній день місяця
// year – повний рік, month – місяць від 0 до 11
function getLastDayOfMonth(year, month) {
    // 0-й день наступного місяця = останній день поточного
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}

// Функція повертає кількість секунд до завтра
function getSecondsToTomorrow() {
    const now = new Date();

    // Завтра, 00:00
    const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 0
    );

    const diffMs = tomorrow - now;      // різниця в мілісекундах
    const diffSec = Math.round(diffMs / 1000); // у секундах
    return diffSec;
}

// Підключаємо обробники після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
    const yearInput = document.getElementById("year");
    const monthInput = document.getElementById("month");
    const lastDayResult = document.getElementById("lastDayResult");
    const secondsResult = document.getElementById("secondsResult");

    const btnLastDay = document.getElementById("btnLastDay");
    const btnSeconds = document.getElementById("btnSeconds");

    btnLastDay.addEventListener("click", () => {
        const year = Number(yearInput.value);
        const month = Number(monthInput.value); // 0–11

        if (Number.isNaN(year) || Number.isNaN(month)) {
            lastDayResult.textContent = "Введіть коректний рік і місяць.";
            return;
        }

        if (month < 0 || month > 11) {
            lastDayResult.textContent = "Місяць має бути від 0 до 11.";
            return;
        }

        const day = getLastDayOfMonth(year, month);
        lastDayResult.textContent = `Останній день місяця: ${day}`;
    });

    btnSeconds.addEventListener("click", () => {
        const seconds = getSecondsToTomorrow();
        secondsResult.textContent = `До завтра залишилось приблизно ${seconds} секунд.`;
    });
});
