// Assuming index.js is your front-end script managing DOM interactions
document.addEventListener('DOMContentLoaded', function () {
    const newTaskForm = document.getElementById('newTaskForm');

    newTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(newTaskForm);
        const data = Object.fromEntries(formData.entries());
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task added:', data);
            displayTasks(); // Function to refresh the list of tasks
        })
        .catch(error => console.error('Error:', error));
    });

    function displayTasks() {
        fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const tasksCard = document.getElementById('tasksCard');
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
        });
    }
});
