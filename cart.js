const CART_KEY = 'cartItems';

function loadCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCount() {
    const cart = loadCart();
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        countSpan.textContent = cart.length;
    }
}

function formatPrice(num) {
    return num.toLocaleString('uk-UA') + ' грн';
}

function renderCart() {
    const cart = loadCart();
    const table = document.getElementById('cart-table');
    const tbody = document.getElementById('cart-body');
    const emptyBlock = document.getElementById('cart-empty');
    const actions = document.getElementById('cart-actions');
    const totalCell = document.getElementById('cart-total');

    if (!cart.length) {
        table.style.display = 'none';
        actions.style.display = 'none';
        emptyBlock.style.display = 'block';
        totalCell.textContent = '0 грн';
        return;
    }

    emptyBlock.style.display = 'none';
    table.style.display = '';
    actions.style.display = 'flex';

    tbody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const sum = item.price * item.quantity;
        total += sum;

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${formatPrice(item.price)}</td>
            <td>${item.quantity} <a href="#" data-id="${item.id}" class="change-qty">(змінити к-сть)</a></td>
            <td>${formatPrice(sum)}</td>
            <td><a href="#" data-id="${item.id}" class="delete-item">(видалити)</a></td>
        `;

        tbody.appendChild(tr);
    });

    totalCell.innerHTML = `<strong>${formatPrice(total)}</strong>`;

    // обробники для "змінити к-сть"
    tbody.querySelectorAll('.change-qty').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.dataset.id;
            const cart = loadCart();
            const item = cart.find(i => i.id === id);
            if (!item) return;

            const newQtyStr = prompt('Нова кількість:', item.quantity);
            if (newQtyStr === null) return;
            const newQty = Number(newQtyStr);
            if (!Number.isInteger(newQty) || newQty <= 0) {
                alert('Некоректна кількість.');
                return;
            }
            item.quantity = newQty;
            saveCart(cart);
            renderCart();
            updateCartCount();
        });
    });

    // обробники для "видалити"
    tbody.querySelectorAll('.delete-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.dataset.id;
            let cart = loadCart();
            cart = cart.filter(i => i.id !== id);
            saveCart(cart);
            renderCart();
            updateCartCount();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            const cart = loadCart();
            if (!cart.length) {
                alert('Корзина пуста');
            }
        });
    }

    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'pr6_task1.html';
        });
    }

    const payBtn = document.getElementById('pay-btn');
    if (payBtn) {
        payBtn.addEventListener('click', () => {
            alert('Оплата поки що працює тільки в уяві викладача 😄');
        });
    }
});
