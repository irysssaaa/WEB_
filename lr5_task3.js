let total = 0;
let correct = 0;
let rightAnswer = null;
let answered = false;

const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next");

function updateScore() {
    const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    scoreEl.textContent =
        `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextTask() {
    answered = false;
    resultEl.textContent = "";
    answersEl.innerHTML = "";

    const a = random(2, 9);
    const b = random(2, 9);
    rightAnswer = a * b;

    questionEl.textContent = `${a} × ${b} =`;

    const options = new Set();
    options.add(rightAnswer);
    while (options.size < 4) {
        options.add(random(2, 81));
    }

    Array.from(options)
        .sort(() => Math.random() - 0.5)
        .forEach(value => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "answer";
            radio.value = value;

            radio.addEventListener("change", checkAnswer);

            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + value));
            answersEl.appendChild(label);
        });
}

function checkAnswer(e) {
    if (answered) return;
    answered = true;

    total++;

    const user = Number(e.target.value);
    if (user === rightAnswer) {
        correct++;
        resultEl.textContent = "Правильно!";
    } else {
        resultEl.textContent = `Помилка, правильна відповідь «${rightAnswer}»`;
    }

    updateScore();
    document
        .querySelectorAll('input[name="answer"]')
        .forEach(r => r.disabled = true);
}

nextBtn.addEventListener("click", nextTask);
updateScore();
