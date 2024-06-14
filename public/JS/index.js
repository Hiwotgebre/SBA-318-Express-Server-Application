document.addEventListener('DOMContentLoaded', function () {
    const newTaskForm = document.getElementById('newTaskForm');
    const errorElement = document.getElementById('error');

    // Form submission event listener
    newTaskForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const messages = validateForm();

        if (messages.length > 0) {
            errorElement.innerHTML = `<ul>${messages.map(message => `<li>${message}</li>`).join('')}</ul>`; // Display errors in a list
        } else {
            addTask();
            clearForm();
            errorElement.innerHTML = ''; // Clear error messages
        }
    });

    function validateForm() {
        let messages = [];
        const newTaskNameInput = document.getElementById('newTaskNameInput');
        const newTaskAssignedTo = document.getElementById('newTaskAssignedTo');
        const newTaskDueDate = document.getElementById('newTaskDueDate');
        const newStatus = document.getElementById('newStatus');

        // Validation checks
        if (!newTaskNameInput.value.trim()) {
            messages.push("Task name is required.");
        }
        if (!newTaskAssignedTo.value.trim()) {
            messages.push("Please select who the task is assigned to.");
        }
        if (!newTaskDueDate.value.trim()) {
            messages.push("Due date is required.");
        }
        if (!newStatus.value.trim()) {
            messages.push("Please select the task status.");
        }

        return messages;
    }

    function addTask() {
        // Placeholder for adding task logic
        console.log('Task added successfully!');
        // Implement your task addition logic here or trigger other script functions
    }

    function clearForm() {
        newTaskForm.reset(); // Reset the form fields to initial values
    }
});
