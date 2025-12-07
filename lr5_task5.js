let captchaValue = "";

// ініціалізація капчі: length - кількість цифр
function initCaptcha(length) {
    const container = document.getElementById("captcha-display");
    const input = document.getElementById("captcha-input");
    const message = document.getElementById("captcha-message");

    container.innerHTML = "";
    input.value = "";
    message.textContent = "";
    message.className = "";

    captchaValue = "";

    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10); // 0–9
        captchaValue += digit;

        const span = document.createElement("span");
        span.textContent = digit;
        span.className = "captcha-pixel";
        container.appendChild(span);
    }
}

function checkCaptcha() {
    const input = document.getElementById("captcha-input");
    const message = document.getElementById("captcha-message");
    const userValue = input.value.trim();

    if (userValue === captchaValue) {
        message.textContent = "Вірно";
        message.className = "success";
    } else {
        message.textContent = "Помилка";
        message.className = "error";
    }
}

// коли сторінка завантажилась
document.addEventListener("DOMContentLoaded", function () {
    // ініціалізація капчі з 2 цифр (можеш змінити на 3, 4…)
    initCaptcha(2);

    document.getElementById("check-btn").addEventListener("click", checkCaptcha);
    document.getElementById("refresh-btn").addEventListener("click", function () {
        initCaptcha(captchaValue.length); // та сама кількість цифр
    });
});
