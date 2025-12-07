let generator = null;
let min = null;
let max = null;

function* randomGenerator(min, max) {
    while (true) {
        // випадкове ціле число від min до max включно
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        yield rand;
    }
}

function askRange() {
    let a = prompt("Введіть мінімальне значення (min):", "1");
    let b = prompt("Введіть максимальне значення (max):", "10");

    if (a === null || b === null) {
        alert("Межі не задано. Використаємо значення за замовчуванням 1..10");
        a = 1;
        b = 10;
    }

    min = Number(a);
    max = Number(b);

    if (Number.isNaN(min) || Number.isNaN(max)) {
        alert("Введено некоректні числа. Використаємо значення за замовчуванням 1..10");
        min = 1;
        max = 10;
    }

    if (min > max) {
        // якщо користувач переплутав місцями – міняємо
        const tmp = min;
        min = max;
        max = tmp;
    }

    // оновлюємо текст діапазону
    const rangeSpan = document.getElementById("range");
    if (rangeSpan) {
        rangeSpan.textContent = `${min} .. ${max}`;
    }

    // створюємо новий генератор з новими межами
    generator = randomGenerator(min, max);

    // очищаємо попередній вивід
    const out = document.getElementById("out");
    if (out) {
        out.textContent = "Натисніть кнопку, щоб отримати число";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("next");
    const changeRangeBtn = document.getElementById("changeRange");
    const out = document.getElementById("out");

    // запитуємо межі при завантаженні сторінки
    askRange();

    nextBtn.addEventListener("click", () => {
        if (!generator) return;

        const result = generator.next();
        out.textContent = result.value;
    });

    changeRangeBtn.addEventListener("click", () => {
        askRange();
    });
});
