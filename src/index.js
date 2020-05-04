import './index.css';
import projectController from './modules/project_controller';
/* eslint-disable */
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
/* eslint-enable */

let tContainer = document.getElementById('tasks');
let pContainer = document.getElementById('projects');
let content = document.getElementById('content');
const controller = projectController(0);
controller.defaultData();
let lastProjectSelected = '';
let activeProject = '';
let activeTask = '';

const newTaskModal = () => {
  const taskModalContainer = document.createElement('div');
  taskModalContainer.classList.add('taskModalContainer');
  const taskModal = document.createElement('div');
  taskModal.classList.add('taskModal');

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&#10005;';
  closeBtn.classList.add('closeBtn');
  taskModal.appendChild(closeBtn);

  const titleModal = document.createElement('h2');
  titleModal.innerHTML = 'Add new task';
  taskModal.appendChild(titleModal);

  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('placeholder', 'Task Name');
  taskModal.appendChild(titleInput);

  const descInput = document.createElement('textarea');
  descInput.maxLength = '2000';
  descInput.cols = '30';
  descInput.rows = '10';
  descInput.placeholder = 'Task Description';
  taskModal.appendChild(descInput);

  const datePicker = document.createElement('input');
  datePicker.type = 'date';
  taskModal.appendChild(datePicker);

  let array = ['--Priority--', 'High', 'Medium', 'Low'];
  let selectList = document.createElement('select');
  selectList.id = 'priority';
  taskModal.appendChild(selectList);

  for (let i = 0; i < array.length; i++) {
    let option = document.createElement('option');
    option.value = array[i];
    option.text = array[i];
    selectList.appendChild(option);
  }

  const addTaskBtn = document.createElement('button');
  addTaskBtn.innerHTML = 'Add Task';
  addTaskBtn.classList.add('btn');
  taskModal.appendChild(addTaskBtn);

  taskModalContainer.appendChild(taskModal);

  closeBtn.addEventListener('click', () => {
    content.removeChild(taskModalContainer);
  });

  addTaskBtn.addEventListener('click', () => {
    if (titleInput.value == null || titleInput.value == '') {
      titleInput.style.background = '#ffe6e6';
      titleInput.placeholder = 'Please provide the todo title!';
    } else if (descInput.value == null || descInput.value == '') {
      descInput.style.background = '#ffe6e6';
      descInput.placeholder = 'Please provide the todo description!';
    } else if (datePicker.value == null || datePicker.value == '') {
      console.log(datePicker.value);
      datePicker.style.background = '#ffe6e6';
    } else if (selectList.value == '--Priority--') {
      selectList.style.background = '#ffe6e6';
    } else {
      activeProject.addTodo(
        titleInput.value,
        descInput.value,
        datePicker.value,
        selectList.value
      );
      tContainer.innerHTML = '';
      tasksView(activeProject.allTodos());
      content.removeChild(taskModalContainer);
    }
  });
  content.appendChild(taskModalContainer);
};

const updateTaskModal = () => {
  const taskModalContainer = document.createElement('div');
  taskModalContainer.classList.add('taskModalContainer');
  const taskModal = document.createElement('div');
  taskModal.classList.add('taskModal');

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&#10005;';
  closeBtn.classList.add('closeBtn');
  taskModal.appendChild(closeBtn);

  const titleModal = document.createElement('h2');
  titleModal.innerHTML = 'Update ' + activeTask.title;
  taskModal.appendChild(titleModal);

  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('placeholder', 'Task Name');
  titleInput.value = activeTask.title;
  taskModal.appendChild(titleInput);

  const descInput = document.createElement('textarea');
  descInput.maxLength = '2000';
  descInput.cols = '30';
  descInput.rows = '10';
  descInput.placeholder = 'Task Description';
  descInput.value = activeTask.description;
  taskModal.appendChild(descInput);

  const datePicker = document.createElement('input');
  datePicker.type = 'date';
  datePicker.value = activeTask.dueDate;
  taskModal.appendChild(datePicker);

  let array = ['--Priority--', 'High', 'Medium', 'Low'];
  let selectList = document.createElement('select');
  selectList.id = 'priority';

  for (let i = 0; i < array.length; i++) {
    let option = document.createElement('option');
    option.text = array[i];
    selectList.appendChild(option);
  }
  selectList.value = activeTask.priority;
  taskModal.appendChild(selectList);

  const updateDeleteContainer = document.createElement('div');
  updateDeleteContainer.classList.add('update-delete-container');
  const updateTaskBtn = document.createElement('button');
  updateTaskBtn.innerHTML = 'Update Task';
  updateTaskBtn.classList.add('btn');
  updateDeleteContainer.appendChild(updateTaskBtn);

  const deleteTaskBtn = document.createElement('button');
  deleteTaskBtn.classList.add('delete-task');
  deleteTaskBtn.innerHTML = 'Delete';
  deleteTaskBtn.classList.add('btn');
  deleteTaskBtn.style.background = 'black';
  updateDeleteContainer.appendChild(deleteTaskBtn);

  taskModal.appendChild(updateDeleteContainer);
  taskModalContainer.appendChild(taskModal);

  closeBtn.addEventListener('click', () => {
    content.removeChild(taskModalContainer);
  });

  updateTaskBtn.addEventListener('click', () => {
    activeTask.editTask(
      titleInput.value,
      descInput.value,
      datePicker.value,
      selectList.value
    );
    tContainer.innerHTML = '';
    tasksView(activeProject.allTodos());
    content.removeChild(taskModalContainer);
  });

  deleteTaskBtn.addEventListener('click', () => {
    let taskIndex = activeProject.allTodos().indexOf(activeTask);
    activeProject.deleteTodo(taskIndex);
    tContainer.innerHTML = '';
    tasksView(activeProject.allTodos());
    content.removeChild(taskModalContainer);
  });
  content.appendChild(taskModalContainer);
};

const tasksView = (tasks) => {
  const taskTopContainer = document.createElement('div');
  taskTopContainer.setAttribute('class', 'taskTopContainer');
  const taskTitle = document.createElement('h3');
  taskTitle.innerHTML = 'Tasks';

  const taskBtnContainer = document.createElement('div');
  taskBtnContainer.setAttribute('class', 'newTaskBtn');
  const newTaskBtn = document.createElement('button');
  newTaskBtn.setAttribute('class', 'btn');
  newTaskBtn.innerHTML = 'Add Task';

  newTaskBtn.addEventListener('click', () => {
    activeTask = newTaskModal();
  });
  taskBtnContainer.appendChild(newTaskBtn);

  taskTopContainer.appendChild(taskTitle);
  taskTopContainer.appendChild(taskBtnContainer);

  const taskListContainer = document.createElement('div');
  taskListContainer.setAttribute('class', 'taskListContainer');

  tasks.forEach((task) => {
    const tList = document.createElement('div');
    tList.setAttribute('class', 'task-item');

    const taskStatus = document.createElement('input');
    taskStatus.setAttribute('type', 'checkbox');
    taskStatus.checked = task.status;

    if (task.status) {
      tList.style.background = '#ffe6e6';
    }

    taskStatus.addEventListener('click', () => {
      task.toggleCheck();
      tContainer.innerHTML = '';
      tasksView(activeProject.allTodos());
    });

    const taskName = document.createElement('h4');
    taskName.innerHTML = task.title;

    const taskDate = document.createElement('p');
    taskDate.innerHTML = task.dueDate;

    const priorityColor = document.createElement('span');
    priorityColor.classList.add('priority-color');
    if (task.priority === 'High') {
      priorityColor.style.background = 'green';
    } else if (task.priority === 'Medium') {
      priorityColor.style.background = 'blue';
    } else if (task.priority === 'Low') {
      priorityColor.style.background = 'orange';
    }

    const editDiv = document.createElement('div');
    editDiv.setAttribute('class', 'edit-div');
    const editTask = document.createElement('i');
    editTask.setAttribute('class', 'fas fa-pencil-alt');
    editDiv.appendChild(editTask);

    editDiv.addEventListener('click', () => {
      activeTask = task;
      updateTaskModal();
    });

    tList.appendChild(taskStatus);
    tList.appendChild(taskName);
    tList.appendChild(taskDate);
    tList.appendChild(priorityColor);
    tList.appendChild(editDiv);

    taskListContainer.appendChild(tList);
  });

  tContainer.appendChild(taskTopContainer);
  tContainer.appendChild(taskListContainer);
};

const newProjectModal = () => {
  const nPModalContainer = document.createElement('div');
  nPModalContainer.classList.add('projectModalContainer');
  const nPModal = document.createElement('div');
  nPModal.classList.add('projectModal');
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('closeBtn');
  closeBtn.innerHTML = '&#10005;';
  const titleModal = document.createElement('h2');
  titleModal.innerHTML = 'Add new project';
  const inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', 'Project name');
  const addProjectBtn = document.createElement('button');
  addProjectBtn.innerHTML = 'Add project';
  addProjectBtn.classList.add('btn');
  nPModal.appendChild(closeBtn);
  nPModal.appendChild(titleModal);
  nPModal.appendChild(inputField);
  nPModal.appendChild(addProjectBtn);
  nPModalContainer.appendChild(nPModal);
  closeBtn.addEventListener('click', () => {
    content.removeChild(nPModalContainer);
  });
  addProjectBtn.addEventListener('click', () => {
    if (inputField.value == null || inputField.value == '') {
      inputField.style.background = '#ffe6e6';
      inputField.placeholder = 'Please enter the project name!';
      return;
    } else {
      controller.addProject(inputField.value);
      pContainer.innerHTML = '';
      tContainer.innerHTML = '';
      projectsView(controller.allProjects());
      content.removeChild(nPModalContainer);
    }
  });
  content.appendChild(nPModalContainer);
};

const projectsView = (projects) => {
  const projectContainerTop = document.createElement('div');
  projectContainerTop.classList.add('pContainerTop');
  const projectTitle = document.createElement('h2');
  projectTitle.innerHTML = 'Projects';
  const newProjectBtn = document.createElement('button');
  newProjectBtn.innerHTML = 'Add project';
  newProjectBtn.classList.add('btn');
  projectContainerTop.appendChild(projectTitle);
  projectContainerTop.appendChild(newProjectBtn);
  pContainer.appendChild(projectContainerTop);

  newProjectBtn.addEventListener('click', () => {
    newProjectModal();
  });
  const pListContainer = document.createElement('div');
  const pList = document.createElement('ul');
  pListContainer.appendChild(pList);
  pListContainer.classList.add('pListContainer');
  pContainer.appendChild(pListContainer);
  projects.forEach((project) => {
    const projectName = document.createElement('li');
    projectName.innerHTML = project.name;
    pList.appendChild(projectName);
    if (project.name === 'Default') {
      lastProjectSelected = projectName;
      activeProject = project;
      projectName.classList.add('active');
      tasksView(project.allTodos());
    }

    projectName.addEventListener('click', () => {
      lastProjectSelected.classList.remove('active');
      projectName.classList.add('active');
      lastProjectSelected = projectName;
      activeProject = project;
      tContainer.innerHTML = '';
      tasksView(project.allTodos());
    });
  });
};

const render = () => {
  const projects = controller.allProjects();
  projectsView(projects);
};

render();