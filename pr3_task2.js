// Функція, що повертає день тижня у короткому форматі
function getWeekDay(date) {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}

// Приклад з умови:
// 3 січня 2012 — це вівторок (ВТ)
const date = new Date(2012, 0, 3);

// Вивід у документ
document.getElementById("date").textContent =
    date.toLocaleDateString();

document.getElementById("weekday").textContent =
    getWeekDay(date);
