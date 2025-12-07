// Функція для створення книжки з методом bookInfo
function createBook(title, author, year, isRead) {
    return {
        title,
        author,
        year,
        isRead,
        bookInfo() {
            const readText = this.isRead ? "Так" : "Ні";
            const info = `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${readText}`;
            log(info);
        }
    };
}

// Початковий масив library (мінімум 3 книги)
let library = [
    createBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 1997, true),
    createBook("The Hobbit", "J.R.R. Tolkien", 1937, false),
    createBook("1984", "George Orwell", 1949, true)
];

const outputEl = document.getElementById("output");

// Допоміжна функція для виводу в <pre> та консоль
function log(text) {
    console.log(text);
    outputEl.textContent += text + "\n";
}

// Функція, яка виводить усі книги
function displayLibrary() {
    outputEl.textContent = "";           // очистити вікно
    log("Поточний список книг:");
    library.forEach(book => book.bookInfo());
}

// Завдання 4: додавання нової книги від користувача
function addBookToLibrary() {
    const title = prompt("Введіть назву книги:");
    if (!title) return;

    const author = prompt("Введіть автора книги:");
    if (!author) return;

    const yearInput = prompt("Введіть рік видання книги:");
    const year = Number(yearInput);
    if (!yearInput || Number.isNaN(year)) {
        alert("Рік потрібно ввести числом!");
        return;
    }

    const isRead = confirm("Чи прочитана книга? (OK – Так, Cancel – Ні)");

    const newBook = createBook(title, author, year, isRead);
    library.push(newBook);

    // Після додавання — показати оновлений список
    displayLibrary();
}

// Перший вивід списку
displayLibrary();

// Обробник кнопки
document.getElementById("addBookBtn").addEventListener("click", addBookToLibrary);
