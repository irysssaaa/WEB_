// Масив товарів
const products = [
    { productId: 1, name: "Ноутбук", price: 25000 },
    { productId: 2, name: "Смартфон", price: 18000 },
    { productId: 3, name: "Навушники", price: 2500 },
    { productId: 4, name: "Планшет", price: 15000 }
];

// Масив покупок
const purchases = [
    { purchaseId: 101, productId: 1, quantity: 2 },
    { purchaseId: 102, productId: 2, quantity: 1 },
    { purchaseId: 103, productId: 3, quantity: 5 },
    { purchaseId: 104, productId: 1, quantity: 1 },
    { purchaseId: 105, productId: 4, quantity: 3 }
];

/**
 * getTotalSales(products, purchases)
 * Об'єднує дані products та purchases
 * і повертає об'єкт:
 * {
 *   "Ноутбук": сума,
 *   "Смартфон": сума,
 *   ...
 * }
 */
function getTotalSales(productsArray, purchasesArray) {
    return purchasesArray.reduce((accumulator, purchase) => {
        // знаходимо товар, що відповідає purchase.productId
        const product = productsArray.find(
            (item) => item.productId === purchase.productId
        );

        // якщо товар знайдено
        if (product) {
            const revenue = product.price * purchase.quantity;

            // якщо такий товар уже є в accumulator – додаємо
            if (accumulator[product.name]) {
                accumulator[product.name] += revenue;
            } else {
                // інакше створюємо новий запис
                accumulator[product.name] = revenue;
            }
        }

        return accumulator;
    }, {}); // початкове значення – порожній об'єкт
}

// Функція для відображення результату на сторінці
function showTotalSales() {
    const resultDiv = document.getElementById("result");
    const totals = getTotalSales(products, purchases);

    // Якщо об'єкт порожній
    const productNames = Object.keys(totals);
    if (productNames.length === 0) {
        resultDiv.innerHTML = "<p>Немає даних для відображення.</p>";
        return;
    }

    // Формуємо HTML-таблицю
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Загальна сума продажу (грн)</th>
                </tr>
            </thead>
            <tbody>
    `;

    productNames.forEach((name) => {
        tableHTML += `
            <tr>
                <td>${name}</td>
                <td>${totals[name]}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    resultDiv.innerHTML = tableHTML;
}

// Вішаємо обробник події після завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
    const calcBtn = document.getElementById("calcBtn");
    calcBtn.addEventListener("click", showTotalSales);
});
