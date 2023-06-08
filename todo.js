const taskInput = document.querySelector(".task-input input");
const colorInput = document.getElementById("color-input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn");
const taskBox = document.querySelector(".task-box");
const addButton = document.getElementById("add-btn");
let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodoList(btn.id);
  });
});
function showTodoList(filter) {
  let liTag = "";
  todos.forEach((todo, id) => {
    let statusClass = todo.status === "completed" ? "completed" : "pending";
    if (filter === todo.status || filter === "all" || (filter === "pending" && todo.status !== "completed")) {
      liTag += `<li class="task ${statusClass}" draggable="true" style="background-color: ${todo.color || '#ffffff'};">
                  <div class="task-content">
                    <label for="${id}">
                      <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${todo.status === "completed" ? "checked" : ""}>
                      <p>${todo.name}</p>
                    </label>
                  </div>
                  <button id= "edit-btn" class="edit-btn" onclick="editTask(${id})">Edit</button>
                </li>`;
    }
  });
  taskBox.innerHTML = liTag || `<span>Currently No Task</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  checkTask.length === 0 ? clearAll.classList.remove("active") : clearAll.classList.add("active");
  taskBox.style.overflowY = taskBox.offsetHeight >= 300 ? "scroll" : "auto";
}
showTodoList("all");
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.querySelector("p");
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodoList();
});
function editTask(id) {
  isEditTask = true;
  editId = id;
  const todo = todos[id];
  taskInput.value = todo.name;
  colorInput.value = todo.color || "#000000";
}
addButton.addEventListener("click", () => {
  let userTask = taskInput.value.trim();
  if (userTask) {
    if (!isEditTask) {
      const taskInfo = { name: userTask, status: "pending", color: colorInput.value };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
      todos[editId].color = colorInput.value;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoList(document.querySelector("span.active").id);
  }
});
