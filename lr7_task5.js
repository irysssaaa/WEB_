// Допоміжна функція: створює Promise, який повертає
// випадкове число 1–10 через задану кількість мілісекунд
function createDelayedRandom(delayMs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const value = Math.floor(Math.random() * 10) + 1; // 1–10
            resolve(value);
        }, delayMs);
    });
}

const startBtn = document.getElementById('startBtn');
const loader = document.getElementById('loader');
const resultDiv = document.getElementById('result');

startBtn.addEventListener('click', () => {
    // Показуємо лоадер (завдання 0)
    loader.classList.remove('hidden');
    resultDiv.textContent = 'Очікуємо результати Promise...';
    startBtn.disabled = true;

    const startTime = performance.now();

    const p1 = createDelayedRandom(1000); // 1 секунда
    const p2 = createDelayedRandom(2000); // 2 секунди
    const p3 = createDelayedRandom(3000); // 3 секунди

    Promise.all([p1, p2, p3])
        .then((values) => {
            const sum = values.reduce((acc, val) => acc + val, 0);
            const durationSec = ((performance.now() - startTime) / 1000).toFixed(2);

            resultDiv.textContent =
                'Отримані значення: ' + values.join(', ') +
                '\nСума значень: ' + sum +
                '\nЧас виконання: ' + durationSec + ' сек.';
        })
        .catch((error) => {
            resultDiv.textContent = 'Сталася помилка: ' + error;
        })
        .finally(() => {
            // Ховаємо лоадер
            loader.classList.add('hidden');
            startBtn.disabled = false;
        });
});
