"use strict";

const textInput = document.getElementById("textInput");
const output = document.getElementById("output");
const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");

const defaultText = "Приклад ефекту друкарської машинки.";
let typingTimeoutId = null;
let cursorIntervalId = null;

/**
 * Запускає анімацію друкарської машинки для переданого тексту
 */
function startTypewriter(text) {
    // Очистити попередні таймери
    if (typingTimeoutId !== null) {
        clearTimeout(typingTimeoutId);
    }
    if (cursorIntervalId !== null) {
        clearInterval(cursorIntervalId);
    }

    output.textContent = "";
    let index = 0;

    // Функція, яка друкує по одному символу
    function typeChar() {
        if (index < text.length) {
            output.textContent += text.charAt(index);
            index++;
            typingTimeoutId = setTimeout(typeChar, 120); // інтервал між літерами
        } else {
            // Коли надрукували все — запускаємо блимання курсора
            startCursorBlink();
        }
    }

    // Починаємо друкувати
    typeChar();
}

/**
 * Блимання курсора (використовує setInterval)
 */
function startCursorBlink() {
    let showCursor = true;
    const baseText = output.textContent;

    cursorIntervalId = setInterval(function () {
        showCursor = !showCursor;
        output.textContent = showCursor ? baseText + " ▌" : baseText + " ";
    }, 400);
}

/**
 * Обробник натискання на кнопку "Почати друк"
 */
function handleStartClick() {
    const userText = textInput.value.trim();
    const textToType = userText !== "" ? userText : defaultText;
    startTypewriter(textToType);
}

/**
 * Обробник натискання на кнопку "Очистити"
 */
function handleClearClick() {
    if (typingTimeoutId !== null) {
        clearTimeout(typingTimeoutId);
    }
    if (cursorIntervalId !== null) {
        clearInterval(cursorIntervalId);
    }
    output.textContent = "";
    textInput.value = "";
}

// Прив'язуємо обробники подій
startBtn.addEventListener("click", handleStartClick);
clearBtn.addEventListener("click", handleClearClick);
