// Запитуємо ім'я користувача
let userName = prompt("Введіть, будь ласка, ваше ім'я:", "Іра");

// Якщо користувач скасував або нічого не ввів – підставимо значення за замовчуванням
if (!userName) {
    userName = "Гість";
}

// Об'єкт з полем name і методом say()
const user = {
    name: userName,
    say() {
        // this має посилатись на об'єкт user
        alert(`Hello, ${this.name}!`);
    }
};

const btnHello = document.getElementById("hello");

// ❌ Так НЕПРАВИЛЬНО, тут this втрачається:
// btnHello.addEventListener("click", user.say);

// ✅ Правильно: фіксуємо контекст user методом bind
btnHello.addEventListener("click", user.say.bind(user));
