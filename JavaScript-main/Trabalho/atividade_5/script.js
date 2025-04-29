const taskInput = document.getElementById('new-task');
const categorySelect = document.getElementById('task-category');
const deadlineInput = document.getElementById('task-deadline');
const addButton = document.getElementById('add-button');
const pendingTaskList = document.getElementById('pending-tasks');
const completedTaskList = document.getElementById('completed-tasks');
const taskCount = document.getElementById('task-count');
const clearListButton = document.getElementById('clear-list');
const filterButtons = document.querySelectorAll('.filter-button');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

let tasks = loadTasks();
let editingIndex = null;
let currentFilter = 'all';

renderTasks();
updateTaskCount();
updateFilterButtons();
updateThemeButtonText();

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks-advanced-plus');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks() {
    localStorage.setItem('tasks-advanced-plus', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const deadline = deadlineInput.value;

    if (taskText !== '') {
        tasks.push({ text: taskText, category: category, deadline: deadline, completed: false });
        taskInput.value = '';
        deadlineInput.value = '';
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
}

function toggleComplete(index) {
    const actualIndex = tasks.findIndex(t => t.text === getTaskByIndex(index).text && t.completed === getTaskByIndex(index).completed && t.category === getTaskByIndex(index).category && t.deadline === getTaskByIndex(index).deadline);
    if (actualIndex !== -1) {
        tasks[actualIndex].completed = !tasks[actualIndex].completed;
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
}

function deleteTask(index) {
    const actualIndex = tasks.findIndex(t => t.text === getTaskByIndex(index).text && t.completed === getTaskByIndex(index).completed && t.category === getTaskByIndex(index).category && t.deadline === getTaskByIndex(index).deadline);
    if (actualIndex !== -1) {
        tasks.splice(actualIndex, 1);
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
}

function clearTaskList() {
    tasks = [];
    localStorage.removeItem('tasks-advanced-plus');
    renderTasks();
    updateTaskCount();
}

function renderTasks() {
    pendingTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    const filteredTasks = getFilteredTasks();
    const pendingTasks = filteredTasks.filter(task => !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);

    pendingTasks.forEach((task, index) => {
        renderTaskItem(task, index, false, pendingTaskList);
    });

    completedTasks.forEach((task, index) => {
        renderTaskItem(task, index, true, completedTaskList);
    });
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'pending':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

function getTaskByIndex(renderIndex, isCompletedList) {
    const filteredTasks = getFilteredTasks();
    const listToUse = isCompletedList ? filteredTasks.filter(task => task.completed) : filteredTasks.filter(task => !task.completed);
    return listToUse[renderIndex];
}

function renderTaskItem(task, renderIndex, isCompleted, listElement) {
    const actualIndex = tasks.findIndex(t => t.text === task.text && t.completed === isCompleted && t.category === task.category && t.deadline === task.deadline);
    if (actualIndex === -1) return;

    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    if (editingIndex === actualIndex && !isCompleted) {
        listItem.classList.add('editing');
        listItem.innerHTML = `
            <input type="text" id="edit-input-${actualIndex}" value="${task.text}">
            <select id="edit-category-${actualIndex}">
                <option value="Geral" ${task.category === 'Geral' ? 'selected' : ''}>Geral</option>
                <option value="Trabalho" ${task.category === 'Trabalho' ? 'selected' : ''}>Trabalho</option>
                <option value="Estudo" ${task.category === 'Estudo' ? 'selected' : ''}>Estudo</option>
                <option value="Casa" ${task.category === 'Casa' ? 'selected' : ''}>Casa</option>
                <option value="Outro" ${task.category === 'Outro' ? 'selected' : ''}>Outro</option>
            </select>
            <input type="date" id="edit-deadline-${actualIndex}" value="${task.deadline || ''}">
        `;
        const editInput = listItem.querySelector(`#edit-input-${actualIndex}`);
        const editCategory = listItem.querySelector(`#edit-category-${actualIndex}`);
        const editDeadline = listItem.querySelector(`#edit-deadline-${actualIndex}`);

        editInput.addEventListener('blur', () => saveEdit(actualIndex, editInput.value, editCategory.value, editDeadline.value));
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                editInput.blur();
            }
        });
        editCategory.addEventListener('change', () => saveEdit(actualIndex, editInput.value, editCategory.value, editDeadline.value));
        editDeadline.addEventListener('change', () => saveEdit(actualIndex, editInput.value, editCategory.value, editDeadline.value));
        editInput.focus();
    } else {
        listItem.innerHTML = `
            <span onclick="toggleComplete(${actualIndex})" class="${isCompleted ? 'completed' : ''}">${task.text} <small>(${task.category})</small> ${task.deadline ? `<small>(Vence em: ${formatDate(task.deadline)})</small>` : ''}</span>
        `;
    }
    listElement.appendChild(listItem);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function startEdit(index) {
    editingIndex = index;
    renderTasks();
}

function saveEdit(index, newText, newCategory, newDeadline) {
    if (newText.trim() !== "") {
        tasks[index].text = newText.trim();
        tasks[index].category = newCategory;
        tasks[index].deadline = newDeadline;
        saveTasks();
        editingIndex = null;
        renderTasks();
    } else {
        deleteTask(index);
    }
}

function updateTaskCount() {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => !task.completed).length;
    const completedTasks = tasks.filter(task => task.completed).length;
    taskCount.textContent = `Total: ${totalTasks} | Pendentes: ${pendingTasks} | Concluídas: ${completedTasks}`;
}

function filterTasks(filterType) {
    currentFilter = filterType;
    updateFilterButtons();
    renderTasks();
}

function updateFilterButtons() {
    filterButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.filter === currentFilter);
    });
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateThemeButtonText();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    updateThemeButtonText();
}

function updateThemeButtonText() {
    themeToggle.textContent = body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
}

// Event listeners
addButton.addEventListener('click', addTask);
clearListButton.addEventListener('click', clearTaskList);
themeToggle.addEventListener('click', toggleTheme);
filterButtons.forEach(button => {
    button.addEventListener('click', () => filterTasks(button.dataset.filter));
});

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTheme();