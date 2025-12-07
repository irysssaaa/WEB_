let totalQuestions = 0;
let correctAnswers = 0;
let currentAnswer = null;

const scoreEl = document.getElementById('score');
const taskEl = document.getElementById('task');
const answerInput = document.getElementById('answer');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const checkBtn = document.getElementById('check-btn');

function updateScore() {
    let percent = totalQuestions === 0
        ? 0
        : Math.round((correctAnswers / totalQuestions) * 100);

    scoreEl.textContent =
        `Загальний рахунок: ${percent}% (${correctAnswers} правильних відповідей з ${totalQuestions})`;
}

function generateTask() {
    const a = Math.floor(Math.random() * 9) + 1; // 1–9
    const b = Math.floor(Math.random() * 9) + 1;

    currentAnswer = a * b;
    taskEl.textContent = `${a} × ${b} = ?`;
    answerInput.value = '';
    answerInput.focus();
    resultEl.textContent = '';
}

function checkAnswer() {
    if (currentAnswer === null) {
        resultEl.textContent = 'Спочатку натисніть «Наступне завдання».';
        return;
    }

    const userValue = Number(answerInput.value);

    if (Number.isNaN(userValue) || answerInput.value.trim() === '') {
        resultEl.textContent = 'Введіть число у поле відповіді.';
        return;
    }

    totalQuestions++;

    if (userValue === currentAnswer) {
        correctAnswers++;
        resultEl.textContent = 'Правильно!';
    } else {
        resultEl.textContent = `Помилка, правильна відповідь «${currentAnswer}».`;
    }

    updateScore();
    currentAnswer = null; // щоб не перевіряли те саме ще раз
}

nextBtn.addEventListener('click', generateTask);
checkBtn.addEventListener('click', checkAnswer);

answerInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Початковий рахунок
updateScore();
