// Генератор чат-бота
function* chatBot() {
    // Крок 1: запит імені
    const name = yield "Hi! What is your name?";

    // Крок 2: запит, як справи
    const howAreYou = yield `Nice to meet you, ${name}! How are you?`;

    // Крок 3: прощання
    yield "Goodbye!";
    // можна було б ще використати name / howAreYou, але для завдання це не обов'язково
}

// Виведення діалогу на сторінку
function addLogEntry(label, text, type) {
    const log = document.getElementById("dialogLog");
    const p = document.createElement("p");
    p.className = "log-entry";

    const spanLabel = document.createElement("span");
    spanLabel.className = "label";
    spanLabel.textContent = label + ": ";

    const spanText = document.createElement("span");
    spanText.textContent = text;
    if (type === "bot") {
        spanText.className = "bot";
    } else if (type === "user") {
        spanText.className = "user";
    }

    p.appendChild(spanLabel);
    p.appendChild(spanText);
    log.appendChild(p);
}

// Логіка запуску діалогу
document.getElementById("startChat").addEventListener("click", function () {
    const bot = chatBot();
    let step = bot.next(); // перший yield -> запит "Hi! What is your name?"

    while (!step.done) {
        // Питання від бота
        const question = step.value;
        addLogEntry("Bot", question, "bot");

        // Відповідь користувача через prompt
        const answer = prompt(question) || "";
        addLogEntry("You", answer, "user");

        // Передаємо відповідь назад у генератор
        step = bot.next(answer);
    }

    // Останнє повідомлення "Goodbye!" вже додано в циклі як питання
});
