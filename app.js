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
  // DOM Load event - Event that gets called right after the DOM is called
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  //   Remove task event
  taskList.addEventListener("click", removeTask);
  //   Clear task event
  clearBtn.addEventListener("click", clearTasks);
  //   Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // convert to string in this case JSON
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // loop trought tasks
  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));
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
  });
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

  //Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  //Clear Input
  taskInput.value = "";

  //   console.log(li);

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task - parentElement
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You sure")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  // console.log(taskItem);
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // delete 1 from the index
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  // need to set localStorage again
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  //! one way
  //   taskList.innerHTML = "";

  //! Another Way
  //  if there is a firstChild (li) we want to remove it
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //   https://jsperf.com/innerhtml-vs-removechild/47

  // Clear from LocalStorage
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  // access to what is being typed
  const text = e.target.value.toLowerCase();

  // forEach can be used because querySelectorAll return a nodeList
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLocaleLowerCase().indexOf(text) !== -1) {
      task.getElementsByClassName.display = "block";
    } else {
      task.style.display = "none";
    }
  });

  //   console.log(text);
}
