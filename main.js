// get user input
const inputArray = [];
const input = document.getElementById('input-field');
const taskList = document.getElementById('task-list');

function getUserInput() {
    input.addEventListener('keypress', function(event) {
        if (event.key == 'Enter' && input.value === "") {
            event.preventDefault();
        }
        else if (event.key == 'Enter' && input.value !== "") {
            event.preventDefault();
            createTask();
        }
    });

    deleteTask();
}

// create tasks

function createTask() {
    const newTask = input.value; 

    if (newTask !== '') {
        const task = {
            id: crypto.randomUUID(),
            text: newTask,
            completed: false
        };

        inputArray.push(task);
        input.value = "";
        renderTasks();
    }
}

function deleteTask() {
    taskList.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains("delete-btn")) {
            const taskItem = e.target.closest("li");
            const taskId = taskItem.dataset.id;
            const taskIndex = inputArray.findIndex(task => task.id === taskId);

            if (taskIndex!== -1) {
                inputArray.splice(taskIndex, 1);
            }

            taskItem.remove();
        }
    });
}

// render tasks
function renderTasks() {
    taskList.innerHTML = '';

    const sortedTasks = inputArray.sort((a, b) => a.completed - b.completed);

    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const toggle = document.createElement('span');
        toggle.className = 'toggle';
        toggle.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });

        li.appendChild(toggle);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        li.appendChild(taskText);

        const delBtn = document.createElement("button");
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '<img src="images/delete_btn.png" alt="Delete">';
        li.appendChild(delBtn);

        taskList.appendChild(li);

        if (task.completed) {
            li.classList.add("completed");
        }
    });
}


function toggleCompletion(index) {
    inputArray[index].completed = !inputArray[index].completed;
    renderTasks();
}

function clearAllTasks() {
    inputArray.length = 0; 
    renderTasks();         
}

document.addEventListener("DOMContentLoaded", () => {
    getUserInput(); 
  });