let tasks = []; // array to store tasks
let filteredTasks = []; // array to store filtered tasks

// function to add a task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskDueDate = document.getElementById("due-date-input");

  // validate Inputs
  if (taskInput.value === "" || taskDueDate.value === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: Date.now(),
      task: taskInput.value,
      dueDate: taskDueDate.value,
      status: "Pending",
    };
    tasks.push(newTask);

    taskInput.value = "";
    taskDueDate.value = "";

    displayTasks();
  }
}

// function to display tasks
function displayTasks(tasksToShow = tasks) {
  const tableBody = document.querySelector("tbody");

  if (tasksToShow.length === 0) {
    // if no tasks found
    tableBody.innerHTML = `<tr><td colspan="4" class="p-2 text-gray-400">No tasks found</td></tr>`;
  } else {
    tableBody.innerHTML = "";
    tasksToShow.forEach((element) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                  <td class="p-3 text-white">${element.task}</td>
                  <td class="p-3 text-white">${element.dueDate}</td>
                  <td class="p-3 text-white">${element.status}</td>
                  <td class="p-3 text-white">
                    <button class="${
                      element.status === "Pending"
                        ? "bg-green-500"
                        : "bg-orange-400"
                    } sm:p-[5px] p-[5px] mb-2 rounded"onclick="toggleStatusTask(${
        element.id
      })">
                        ${
                          element.status === "Pending" ? "Completed" : "Pending"
                        }
                    </button>
                    <button class="bg-red-500 sm:p-[5px] p-[5px] rounded" onclick="deleteTask(${
                      element.id
                    })">Delete</button>
                  </td>
              `;
      tableBody.appendChild(row);
    });
  }
}

function toggleStatusTask(id) {
  const taskStatus = tasks.findIndex((task) => task.id === id);
  if (taskStatus !== -1) {
    if (tasks[taskStatus].status === "Completed") {
      tasks[taskStatus].status = "Pending";
    } else {
      tasks[taskStatus].status = "Completed";
    }
    displayTasks();
  }
}

// function to spcific delete a task
function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1); // delete task from array
    displayTasks(); //refresh the displayed tasks
  }
}

// function to delete a task
function deleteAllTasks() {
  tasks = []; // clear the tasks array
  displayTasks(); // refresh the displayed tasks
}

// function to filter tasks
function filterTasks() {
  const statusFilter = document.getElementById("status-filter").value;

  const filteredTasks = tasks.filter((task) => {
    let matchStatus = true;
    if (statusFilter !== "all") {
      matchStatus = task.status === statusFilter;
    }
    return matchStatus;
  });
  displayTasks(filteredTasks);
}
