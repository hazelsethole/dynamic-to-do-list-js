// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // Select the add button
    const taskInput = document.getElementById('task-input'); // Select the task input field
    const taskList = document.getElementById('task-list'); // Select the task list

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the input value

        if (taskText === "") {
            alert("Please enter a task."); // Alert if the input is empty
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set the text of the list item

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set button text
        removeButton.className = 'remove-btn'; // Add class for styling

        // Add click event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the list item from the task list
        };

        // Append the remove button to the list item and the list item to the task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for the add button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Call addTask if Enter is pressed
            document.addEventListener('DOMContentLoaded', () => {
                const addButton = document.getElementById('add-task-btn');
                const taskInput = document.getElementById('task-input');
                const taskList = document.getElementById('task-list');
            
                // Load tasks from Local Storage
                loadTasks();
            
                function loadTasks() {
                    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                    storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again
                }
            
                function addTask(taskText, save = true) {
                    if (!taskText) return; // Prevent adding empty tasks
            
                    const listItem = document.createElement('li');
                    listItem.textContent = taskText;
            
                    const removeButton = document.createElement('button');
                    removeButton.textContent = "Remove";
                    removeButton.className = 'remove-btn';
            
                    // Remove task functionality
                    removeButton.addEventListener('click', function() {
                        taskList.removeChild(listItem);
                        removeTaskFromLocalStorage(taskText); // Remove from Local Storage
                    });
            
                    listItem.appendChild(removeButton);
                    taskList.appendChild(listItem);
            
                    // Save task to Local Storage
                    if (save) {
                        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                        storedTasks.push(taskText);
                        localStorage.setItem('tasks', JSON.stringify(storedTasks));
                    }
            
                    // Clear the input field
                    taskInput.value = '';
                }
            
                // Function to remove a task from Local Storage
                function removeTaskFromLocalStorage(taskText) {
                    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                    storedTasks = storedTasks.filter(task => task !== taskText); // Filter out the removed task
                    localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
                }
            
                addButton.addEventListener('click', () => {
                    const taskText = taskInput.value.trim();
                    addTask(taskText); // Add task with saving
                });
            
                taskInput.addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                        const taskText = taskInput.value.trim();
                        addTask(taskText); // Add task with saving
                    }
                });
            });
        }
    });
});