// Початковий масив коміксів
const comics = [
    {
        title: "Spider-Man",
        author: "Stan Lee",
        publisher: "Marvel",
        year: 1962,
        inCollection: true
    },
    {
        title: "Batman: Year One",
        author: "Frank Miller",
        publisher: "DC Comics",
        year: 1987,
        inCollection: true
    },
    {
        title: "Watchmen",
        author: "Alan Moore",
        publisher: "DC Comics",
        year: 1986,
        inCollection: false
    }
];

// Функція для виведення колекції на сторінку
function displayComics() {
    const tbody = document.getElementById("comicsList");
    tbody.innerHTML = "";

    comics.forEach((comic, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${comic.title}</td>
            <td>${comic.author}</td>
            <td>${comic.publisher}</td>
            <td>${comic.year}</td>
            <td>${comic.inCollection ? "Так" : "Ні"}</td>
        `;

        tbody.appendChild(tr);
    });

    // Показати середній рік
    const avgSpan = document.getElementById("avgYear");
    if (comics.length > 0) {
        avgSpan.textContent = calculateAverageYear().toFixed(1);
    } else {
        avgSpan.textContent = "—";
    }
}

// Обчислення середнього року випуску
function calculateAverageYear() {
    const sum = comics.reduce((acc, comic) => acc + Number(comic.year), 0);
    return sum / comics.length;
}

// Обробка форми додавання коміксу
function handleAddComic(event) {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const publisherInput = document.getElementById("publisher");
    const yearInput = document.getElementById("year");
    const inCollectionInput = document.getElementById("inCollection");

    const newComic = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        publisher: publisherInput.value.trim(),
        year: Number(yearInput.value),
        inCollection: inCollectionInput.checked
    };

    // Додаємо в масив
    comics.push(newComic);

    // Очищаємо форму
    titleInput.value = "";
    authorInput.value = "";
    publisherInput.value = "";
    yearInput.value = "";
    inCollectionInput.checked = false;

    // Оновлюємо вивід
    displayComics();
}

// Після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addComicForm");
    form.addEventListener("submit", handleAddComic);

    // Показати стартову колекцію
    displayComics();
});
