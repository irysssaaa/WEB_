// 1. Створюємо об'єкт book
const book = {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    year: 1997,
    isRead: true,

    // 2. Метод bookInfo
    bookInfo() {
        return `
Назва: ${this.title}<br>
Автор: ${this.author}<br>
Рік видання: ${this.year}<br>
Прочитана: ${this.isRead ? "Так" : "Ні"}
        `;
    }
};

const output = document.getElementById("output");
const showBtn = document.getElementById("showInfo");
const toggleBtn = document.getElementById("toggleRead");

// Показ інформації про книгу
showBtn.addEventListener("click", () => {
    output.innerHTML = book.bookInfo();
});

// 3. Зміна isRead на протилежне
toggleBtn.addEventListener("click", () => {
    book.isRead = !book.isRead;
    output.innerHTML = book.bookInfo();
});
