// Ключ для localStorage
const STORAGE_KEY = 'pr5_todos';

// DOM-елементи
const input = document.getElementById('new-task-input');
const list = document.getElementById('tasks-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let todos = loadTodos();
let currentFilter = 'all';

// --- зчитування / збереження ---

function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    try {
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// --- допоміжні функції ---

function formatDate(timestamp) {
    const d = new Date(timestamp);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}.${mm}.${yy}, ${hh}:${min}`;
}

function createTodo(text) {
    return {
        id: Date.now(),
        text: text.trim(),
        createdAt: Date.now(),
        done: false
    };
}

// --- рендер списку ---

function renderTodos() {
    list.innerHTML = '';

    let filtered = todos;
    if (currentFilter === 'active') {
        filtered = todos.filter(t => !t.done);
    } else if (currentFilter === 'completed') {
        filtered = todos.filter(t => t.done);
    }

    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (todo.done) {
            li.classList.add('task-done');
        }
        li.dataset.id = todo.id;

        // checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = todo.done;

        // контент
        const content = document.createElement('div');
        content.className = 'task-content';

        const textEl = document.createElement('div');
        textEl.className = 'task-text';
        textEl.textContent = todo.text;

        const dateEl = document.createElement('div');
        dateEl.className = 'task-date';
        dateEl.textContent = formatDate(todo.createdAt);

        content.appendChild(textEl);
        content.appendChild(dateEl);

        // кнопка видалення
        const delBtn = document.createElement('button');
        delBtn.className = 'task-delete';
        delBtn.textContent = '✕';

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(delBtn);

        list.appendChild(li);

        // --- події ---

        // зміна стану (виконано/невиконано)
        checkbox.addEventListener('change', () => {
            todo.done = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        // видалення
        delBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });

        // редагування по подвійним кліку
        textEl.addEventListener('dblclick', () => {
            startEditTodo(todo, textEl);
        });
    });
}

function startEditTodo(todo, textEl) {
    const parent = textEl.parentElement;
    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.className = 'task-edit-input';
    inputEdit.value = todo.text;

    parent.replaceChild(inputEdit, textEl);
    inputEdit.focus();
    inputEdit.select();

    function finishEdit(save) {
        if (save) {
            const newText = inputEdit.value.trim();
            if (newText) {
                todo.text = newText;
            }
        }
        saveTodos();
        renderTodos();
    }

    inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            finishEdit(true);
        } else if (e.key === 'Escape') {
            finishEdit(false);
        }
    });

    inputEdit.addEventListener('blur', () => finishEdit(true));
}

// --- додавання завдання ---

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const text = input.value.trim();
        if (!text) return;
        todos.unshift(createTodo(text));
        saveTodos();
        input.value = '';
        renderTodos();
    }
});

// --- фільтри ---

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// перший рендер
renderTodos();
