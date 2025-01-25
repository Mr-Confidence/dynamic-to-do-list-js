document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from Local Storage and display them
    loadTasks();

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Get stored tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Render each task from the stored array
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving tasks again when loading
    }

    // Function to create a task element
    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create and style the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Event listener for removing tasks
        removeButton.addEventListener('click', function () {
            taskList.removeChild(listItem);
            saveTasks(); // Update Local Storage after task removal
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(item => item.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        taskText = taskText.trim();

        // If the task text is empty, do not add it
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the task element and optionally save it
        createTaskElement(taskText);
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the task input field after adding the task
        if (save) taskInput.value = "";
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => addTask(taskInput.value));

    // Event listener for "Enter" key press in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});
