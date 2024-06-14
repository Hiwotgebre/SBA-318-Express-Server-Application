document.addEventListener('DOMContentLoaded', function () {
  const newTaskForm = document.getElementById('newTaskForm');
  const errorElement = document.getElementById('error');
  const tasksCard = document.getElementById('tasksCard');
  const successMessage = document.createElement('div');

  // Initialize tasks from local storage
  loadTasks();

  // Form submission event listener
  newTaskForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
      const messages = validateForm();

      if (messages.length > 0) {
          errorElement.innerHTML = `<ul>${messages.map(message => `<li>${message}</li>`).join('')}</ul>`; // Display errors in a list
          successMessage.innerHTML = ''; // Clear any previous success messages
      } else {
          if (addTask()) {
              clearForm();
              errorElement.innerHTML = ''; // Clear error messages
              displaySuccessMessage();
              loadTasks();
          }
      }
  });

  function validateForm() {
      let messages = [];
      const newTaskNameInput = document.getElementById('newTaskNameInput');
      const newTaskAssignedTo = document.getElementById('newTaskAssignedTo');
      const newTaskDueDate = document.getElementById('newTaskDueDate');
      const newStatus = document.getElementById('newStatus');

      // Validation checks
      if (!newTaskNameInput.value.trim()) messages.push("Task name is required.");
      if (!newTaskAssignedTo.value.trim()) messages.push("Please select who the task is assigned to.");
      if (!newTaskDueDate.value.trim()) messages.push("Due date is required.");
      if (!newStatus.value.trim()) messages.push("Please select the task status.");

      return messages;
  }

  function addTask() {
      const newTask = {
          name: document.getElementById('newTaskNameInput').value,
          assignedTo: document.getElementById('newTaskAssignedTo').value,
          dueDate: document.getElementById('newTaskDueDate').value,
          status: document.getElementById('newStatus').value
      };

      // Add to local storage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      renderTasks(); // Refresh the displayed tasks
      return true; // Return true to indicate successful addition
  }

  function clearForm() {
      newTaskForm.reset(); // Reset the form fields to initial values
  }

  function renderTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasksCard.innerHTML = tasks.map(task => `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${task.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Assigned to: ${task.assignedTo}</h6>
                  <p class="card-text">Due: ${task.dueDate}</p>
                  <p class="card-text">Status: ${task.status}</p>
              </div>
          </div>
      `).join('');
  }

  function displaySuccessMessage() {
      successMessage.className = 'alert alert-success';
      successMessage.textContent = 'Task added successfully!';
      document.querySelector('.form-wrapper').prepend(successMessage);
      clearMessagesAfterDelay(successMessage, 5000); //Clear success message after 5 seconds
  }

  function clearMessagesAfterDelay(element, delay) {
    setTimeout(() => {
      element.innerHTML = ''; //Clear the content of the element
    }, delay);
  }

  function loadTasks() {
      renderTasks();
  }
});
