// Демонстраційний масив замовлень
const orders = [
    {
        orderId: 1,
        customer: { name: "Alice", email: "alice@example.com" },
        items: [
            { name: "Ноутбук", price: 1200 },
            { name: "Мишка", price: 25 }
        ],
        total: 1225
    },
    {
        orderId: 2,
        customer: { name: "Bob", email: "bob@example.com" },
        items: [
            { name: "Смартфон", price: 800 }
        ],
        total: 800
    },
    {
        orderId: 3,
        customer: { name: "Alice", email: "alice@example.com" },
        items: [
            { name: "Навушники", price: 100 },
            { name: "Чохол", price: 20 }
        ],
        total: 120
    },
    {
        orderId: 4,
        customer: { name: "Charlie", email: "charlie@example.com" },
        items: [
            { name: "Планшет", price: 600 }
        ],
        total: 600
    }
];

// Функція з умови завдання
function getTotalSpentByCustomer(ordersArray, customerName) {
    const normalizedName = customerName.trim().toLowerCase();

    if (normalizedName === "") {
        return 0;
    }

    // Фільтруємо замовлення потрібного клієнта
    const customerOrders = ordersArray.filter(function (order) {
        return order.customer.name.toLowerCase() === normalizedName;
    });

    // Рахуємо суму через reduce()
    const totalSpent = customerOrders.reduce(function (sum, order) {
        return sum + order.total;
    }, 0);

    return totalSpent;
}

// Вивід списку замовлень на сторінку
function renderOrdersList() {
    const container = document.getElementById("ordersList");
    if (!container) {
        return;
    }

    let html = "";

    orders.forEach(function (order) {
        html += `
            <div class="order-item">
                <div class="order-header">
                    Замовлення #${order.orderId} — ${order.customer.name} (${order.customer.email}),
                    сума: ${order.total} грн
                </div>
                <div class="order-items">
                    Товари:
                    <ul>
                        ${order.items
                            .map(function (item) {
                                return `<li>${item.name} – ${item.price} грн</li>`;
                            })
                            .join("")}
                    </ul>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Обробник для кнопки
function initPage() {
    renderOrdersList();

    const btn = document.getElementById("calcBtn");
    const input = document.getElementById("customerName");
    const resultDiv = document.getElementById("result");

    if (!btn || !input || !resultDiv) {
        return;
    }

    btn.addEventListener("click", function () {
        const name = input.value;
        const total = getTotalSpentByCustomer(orders, name);

        resultDiv.classList.remove("error", "success");

        if (name.trim() === "") {
            resultDiv.textContent = "Введіть ім'я клієнта.";
            resultDiv.classList.add("error");
            return;
        }

        if (total === 0) {
            resultDiv.textContent = "Для цього клієнта замовлень не знайдено.";
            resultDiv.classList.add("error");
        } else {
            resultDiv.textContent = `Клієнт "${name}" витратив загалом: ${total} грн.`;
            resultDiv.classList.add("success");
        }
    });
}

// Ініціалізація після завантаження сторінки
document.addEventListener("DOMContentLoaded", initPage);
