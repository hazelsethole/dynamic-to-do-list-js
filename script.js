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
        }
    });
});