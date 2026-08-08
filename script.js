const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAll = document.querySelector('.deleteAll');
const pendingNumber = document.querySelector('.pendingNumber');


// Array to store tasks
let tasks = [];


// This tells us which task we are editing
let editIndex = null;


// Load tasks when page opens
loadTasks();



// ADD / UPDATE TASK

addBtn.onclick = () => {

    let task = inputBox.value.trim();

    // Don't allow empty task
    if (task === "") {
        return;
    }


    // If editIndex is null → ADD task
    if (editIndex === null) {

        tasks.push(task);

    }

    // Otherwise → UPDATE task
    else {

        tasks[editIndex] = task;

        // Stop editing
        editIndex = null;

        // Change button back to Add
        addBtn.textContent = "Add";
    }


    // Save tasks
    saveTasks();

    // Display tasks
    showTasks();

    // Clear input
    inputBox.value = "";
};


// SHOW TASKS


function showTasks() {

    todoList.innerHTML = "";


    tasks.forEach((task, index) => {

        const li = document.createElement("li");


        // Task text
        const span = document.createElement("span");

        span.className = "taskText";

        span.textContent = task;


        // Edit button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "editBtn";


        editButton.onclick = () => {

            inputBox.value = tasks[index];

            editIndex = index;

            addBtn.textContent = "Update";

            inputBox.focus();
        };


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "deleteBtn";


        deleteButton.onclick = () => {

            tasks.splice(index, 1);

            saveTasks();

            showTasks();
        };


        // Add everything inside li
        li.appendChild(span);

        li.appendChild(editButton);

        li.appendChild(deleteButton);


        // Add li to ul
        todoList.appendChild(li);
    });


    // Update pending task number
    pendingNumber.textContent = tasks.length;
}



// CLEAR ALL TASKS

deleteAll.onclick = () => {

    tasks = [];

    saveTasks();

    showTasks();
};



// SAVE TASKS

function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}



// LOAD TASKS

function loadTasks() {

    const savedTasks = localStorage.getItem("todoTasks");


    if (savedTasks !== null) {

        tasks = JSON.parse(savedTasks);

    }


    showTasks();
};
