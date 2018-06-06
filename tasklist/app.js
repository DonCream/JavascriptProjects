let form = document.querySelector('#task-form');
let taskList = document.querySelector('.collection');
let clearBtn = document.querySelector('.clear-tasks');
let filter = document.querySelector('#filter');
let taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)
   form.addEventListener('submit', addTask);
   taskList.addEventListener('click', removeTask);
   clearBtn.addEventListener('click', clearTasks);
   filter.addEventListener('keyup', filterTasks);

}
// Get Task from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('task') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('task'));
  }

  tasks.forEach(function(task){
    let li = document.createElement('li');
    //    Add class to li
    li.className = 'collection-item';
    //    Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create a element named link
    let link = document.createElement('a');
    // Add Classes to a element
    link.className = 'delete-item secondary-content';
    //    Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //    Append the link(a) to li
    li.appendChild(link);
    //    Aooend li to ul
    taskList.appendChild(li);
  });
}

//    Add a Task
function addTask(e) {
   if(taskInput.value === '') {
      alert('Add a task');
   }
   //   Create li element
   let li = document.createElement('li');
   //    Add class to li
   li.className = 'collection-item';
   //    Create text node and append to li
   li.appendChild(document.createTextNode(taskInput.value));
   // Create a element named link
   let link = document.createElement('a');
   // Add Classes to a element
   link.className = 'delete-item secondary-content';
   //    Add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   //    Append the link(a) to li
   li.appendChild(link);
   //    Aooend li to ul
   taskList.appendChild(li);
   //    Store in Local Storage
   storeTaskInLocalStorage(taskInput.value);
   //    Clear Input
   taskInput.value = '';
   e.preventDefault();
}
//       Store task in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('task') === null) {
    tasks = [ ];
  } else {
    tasks = JSON.parse(localStorage.getItem('task'));
  }
  tasks.push(task);
  localStorage.setItem('task', JSON.stringify(tasks));
}
//    Remove a Task
function removeTask (e) {
   if (e.target.parentElement.classList.contains
      ('delete-item')) {
      if(confirm('are you sure?')) {
         e.target.parentElement.parentElement.remove();

         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
   }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('task') === null) {
      tasks = [ ];
    } else {
      tasks = JSON.parse(localStorage.getItem('task'));
    }
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//    Clear Tasks
function  clearTasks() {
   while(taskList.firstChild) {
   taskList.removeChild(taskList.firstChild);
   }

   //   Clear from Local Storage
   clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//    Filter Task in List
function filterTasks(e) {
   let text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(function(task) {
      let item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
         task.style.display = 'block';
      } else {
         task.style.display = 'none';
      }
   });
}
