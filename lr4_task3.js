// Створюємо масив library з кількома об'єктами книг
let library = [
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        year: 1997,
        isRead: true,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        }
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        isRead: false,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        }
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        isRead: true,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        }
    }
];

const runBtn = document.getElementById("run");
const output = document.getElementById("output");

runBtn.addEventListener("click", runTask3);

function runTask3() {
    output.textContent = ""; // очистити вивід

    console.clear();
    console.log("Початковий масив library:", library);

    // 1. Відсортувати масив library за роком видання (зростання)
    let sortedLibrary = [...library].sort((a, b) => a.year - b.year);
    console.log("Відсортовані книги за роком видання:", sortedLibrary);

    // 2. Створити масив непрочитаних книг unreadBooks
    let unreadBooks = library.filter(book => !book.isRead);
    console.log("Непрочитані книги:", unreadBooks);

    // 3. Знайти книгу, яку написав "J.R.R. Tolkien"
    let tolkienBook = library.find(book => book.author === "J.R.R. Tolkien");
    console.log("Книга Толкіна:", tolkienBook);

    // Вивести теж саме у <pre> на сторінці
    addLine("=== Відсортовані книги за роком видання ===");
    sortedLibrary.forEach(book => addLine(book.bookInfo()));

    addLine("\n=== Непрочитані книги ===");
    unreadBooks.forEach(book => addLine(book.bookInfo()));

    addLine("\n=== Книга Толкіна ===");
    if (tolkienBook) {
        addLine(tolkienBook.bookInfo());
    } else {
        addLine("Книги автора J.R.R. Tolkien не знайдено");
    }
}

function addLine(text) {
    output.textContent += text + "\n";
}
