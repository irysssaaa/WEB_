// Створюємо об'єкт Date:
// (рік, місяць, день, години, хвилини)
// У JS місяці починаються з 0,
// тому лютий = 1
const myDate = new Date(2021, 1, 20, 3, 12);

// Виводимо дату у документ
document.getElementById("result").textContent =
    myDate.toLocaleString();
