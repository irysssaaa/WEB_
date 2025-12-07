// ключ у localStorage
const CART_KEY = 'cartItems';

// прочитати корзину
function loadCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

// зберегти корзину
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// оновити кількість біля іконки
function updateCartCount() {
    const cart = loadCart();
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        countSpan.textContent = cart.length;
    }
}

// додавання товару
function handleAddToCart(event) {
    event.preventDefault();

    const btn = event.currentTarget;
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    if (!id || !name || !price) return;

    let quantityStr = prompt('Вкажіть кількість:', '1');
    if (quantityStr === null) return; // скасували

    let quantity = Number(quantityStr);
    if (!Number.isInteger(quantity) || quantity <= 0) {
        alert('Некоректна кількість.');
        return;
    }

    const cart = loadCart();
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }

    saveCart(cart);
    updateCartCount();

    if (confirm('Товар додано у корзину. Перейти у корзину?')) {
        window.location.href = 'cart.html';
    }
}

// клік по іконці корзини
function handleCartIconClick() {
    const cart = loadCart();
    if (cart.length === 0) {
        alert('Корзина пуста');
    } else {
        window.location.href = 'cart.html';
    }
}

// ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', handleCartIconClick);
    }
});
