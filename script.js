document.addEventListener('DOMContentLoaded', function() {
    // Selecting the required DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Loading tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => createTaskElement(taskText));
    }
  
    // Creating task element
    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Remove task from DOM and Local Storage
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };
  
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }
  
    // Add new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }
  
        // Create task element
        createTaskElement(taskText);
  
        // Save to Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
  
        // Clear input
        taskInput.value = '';
    }
  
    // Removing task from Local Storage
    function removeTaskFromStorage(taskToRemove) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  
    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
  
    // Load existing tasks on page load
    loadTasks();
  });