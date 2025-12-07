// масив з телефонами (шляхи до картинок підставиш свої)
const imagesArray = [
    {
        path: 'images/14p.png',
        title: 'Samsung Galaxy',
        description: 'Смартфон з великим дисплеєм'
    },
    {
        path: 'images/black.png',
        title: 'iPhone',
        description: 'Смартфон з подвійною камерою'
    },
    {
        path: 'images/iphone3.jpg',
        title: 'Xiaomi',
        description: 'Доступний смартфон з гарною батареєю'
    }
];

// ініціалізація ротатора
function initPhotoRotator(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container || !images || images.length === 0) return;

    let currentIndex = 0;

    // створюємо всі елементи ТІЛЬКИ через createElement
    const wrapper = document.createElement('div');
    wrapper.className = 'rotator-wrapper';

    const header = document.createElement('div');
    header.className = 'rotator-header';

    const nav = document.createElement('div');
    nav.className = 'rotator-nav';

    const linkPrev = document.createElement('a');
    linkPrev.href = '#';
    linkPrev.textContent = 'Назад';

    const linkNext = document.createElement('a');
    linkNext.href = '#';
    linkNext.textContent = 'Вперед';

    nav.appendChild(linkPrev);
    nav.appendChild(linkNext);

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'rotator-image-wrapper';

    const img = document.createElement('img');
    imgWrapper.appendChild(img);

    const footer = document.createElement('div');
    footer.className = 'rotator-footer';

    const titleEl = document.createElement('div');
    titleEl.className = 'rotator-title';

    const descEl = document.createElement('div');
    descEl.className = 'rotator-description';

    footer.appendChild(titleEl);
    footer.appendChild(descEl);

    wrapper.appendChild(header);
    wrapper.appendChild(nav);
    wrapper.appendChild(imgWrapper);
    wrapper.appendChild(footer);

    container.appendChild(wrapper);

    function updateView() {
        const item = images[currentIndex];
        img.src = item.path;
        img.alt = item.title;
        header.textContent = `Фотографія ${currentIndex + 1} з ${images.length}`;
        titleEl.textContent = item.title;
        descEl.textContent = item.description;

        // показ / приховування посилань
        if (currentIndex === 0) {
            linkPrev.classList.add('hidden');
        } else {
            linkPrev.classList.remove('hidden');
        }

        if (currentIndex === images.length - 1) {
            linkNext.classList.add('hidden');
        } else {
            linkNext.classList.remove('hidden');
        }
    }

    linkPrev.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            updateView();
        }
    });

    linkNext.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateView();
        }
    });

    // перший показ
    updateView();
}

// запуск після завантаження сторінки
document.addEventListener('DOMContentLoaded', function () {
    initPhotoRotator('rotator', imagesArray);
});
