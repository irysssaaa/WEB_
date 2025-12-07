// Масив об'єктів books
const books = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        rating: 4.8,
        isRead: true
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        rating: 4.9,
        isRead: false
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        rating: 4.7,
        isRead: true
    },
    {
        title: "Animal Farm",
        author: "George Orwell",
        year: 1945,
        rating: 4.3,
        isRead: false
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        year: 1951,
        rating: 3.9,
        isRead: false
    }
];

// 1) getUnreadBooks – масив назв непрочитаних книг
function getUnreadBooks(booksArray) {
    return booksArray
        .filter(function(book) {
            return !book.isRead;
        })
        .map(function(book) {
            return book.title;
        });
}

// 2) getBooksByAuthor – книги автора, відсортовані за роком
function getBooksByAuthor(booksArray, authorName) {
    return booksArray
        .filter(function(book) {
            return book.author.toLowerCase() === authorName.toLowerCase();
        })
        .sort(function(a, b) {
            return a.year - b.year;
        });
}

// 3) getTopRatedBooks – книги з рейтингом > 4, за спаданням рейтингу
function getTopRatedBooks(booksArray) {
    return booksArray
        .filter(function(book) {
            return book.rating > 4;
        })
        .sort(function(a, b) {
            return b.rating - a.rating;
        });
}

// Допоміжна функція для виводу результату
function printResult(title, data) {
    const out = document.getElementById("output");

    if (Array.isArray(data)) {
        out.textContent = title + "\n\n" + JSON.stringify(data, null, 2);
    } else {
        out.textContent = title + "\n\n" + String(data);
    }
}

// Вішаємо обробники подій після завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
    const btnUnread = document.getElementById("btn-unread");
    const btnByAuthor = document.getElementById("btn-by-author");
    const btnTopRated = document.getElementById("btn-top-rated");
    const authorInput = document.getElementById("authorInput");

    btnUnread.addEventListener("click", function () {
        const unread = getUnreadBooks(books);
        printResult("Непрочитані книги (titles):", unread);
    });

    btnByAuthor.addEventListener("click", function () {
        const authorName = authorInput.value.trim();
        if (authorName === "") {
            printResult("Помилка", "Введіть ім'я автора у поле вище.");
            return;
        }
        const byAuthor = getBooksByAuthor(books, authorName);
        if (byAuthor.length === 0) {
            printResult(
                "Результат",
                "Книги автора \"" + authorName + "\" не знайдено."
            );
        } else {
            printResult(
                "Книги автора \"" + authorName + "\" (відсортовані за роком):",
                byAuthor
            );
        }
    });

    btnTopRated.addEventListener("click", function () {
        const topBooks = getTopRatedBooks(books);
        printResult("Топові книги (rating > 4):", topBooks);
    });
});
