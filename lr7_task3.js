// Функція, яка повертає Promise
function randomNumber() {
    return new Promise((resolve) => {
        // випадкова затримка 1-3 секунди
        const delay = Math.floor(Math.random() * 2000) + 1000; // 1000–3000 мс

        setTimeout(() => {
            const num = Math.floor(Math.random() * 100) + 1; // 1–100
            resolve({ number: num, delay });
        }, delay);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const loader = document.getElementById('loader');
    const resultDiv = document.getElementById('result');

    startBtn.addEventListener('click', () => {
        // показуємо лоадер
        loader.style.display = 'block';
        resultDiv.textContent = '';

        const startTime = Date.now();

        randomNumber()
            .then(({ number, delay }) => {
                const timeMs = Date.now() - startTime;

                // ховаємо лоадер
                loader.style.display = 'none';

                resultDiv.innerHTML =
                    `Випадкове число: <strong>${number}</strong><br>` +
                    `Час виконання (затримка): ${(timeMs / 1000).toFixed(2)} с`;
            })
            .catch((err) => {
                loader.style.display = 'none';
                resultDiv.textContent = 'Сталася помилка: ' + err;
            });
    });
});
