// Defined UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
  //   Remove task event
  taskList.addEventListener("click", removeTask);
  //   Clear task event
  clearBtn.addEventListener("click", clearTasks);
  //   Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Add Task
function addTask(e) {
  // make sure value exist
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to the li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Clear Input
  taskInput.value = "";

  //   console.log(li);

  e.preventDefault();
}

// Remove Task - parentElement
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You sure")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear Tasks
function clearTasks() {
  //! one way
  //   taskList.innerHTML = "";

  //! Faster Way
  //  if there is a firstChild (li) we want to remove it
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //   https://jsperf.com/innerhtml-vs-removechild/47
}

// Filter Tasks
function filterTasks(e) {
  // access to what is being typed
  const text = e.target.value.toLowerCase();

  // forEach can be used because querySelectorAll return a nodeList
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.getElementsByClassName.disply = "block";
    } else {
      task.style.display = "none";
    }
  });

  //   console.log(text);
}
