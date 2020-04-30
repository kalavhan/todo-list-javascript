import './index.css';
import projectController from './modules/project_controller';

let tContainer = document.getElementById('tasks');
let pContainer = document.getElementById('projects');
let content = document.getElementById('content');
const controller = projectController();
let lastProjectSelected = '';
let activeProject = '';

const newTaskModal = () => {
  const taskModalContainer = document.createElement('div');
  taskModalContainer.classList.add('taskModalContainer');
  const taskModal = document.createElement('div');
  taskModal.classList.add('taskModal');

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = '&#10005;';
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
  descInput.placeholder = 'Task Description'
  taskModal.appendChild(descInput);

  const datePicker = document.createElement('input');
  datePicker.type = 'date';
  taskModal.appendChild(datePicker);

  let array = ['--Priority--', 'High', 'Medium', 'Low'];
  let selectList = document.createElement("select");
  selectList.id = "priority";
  taskModal.appendChild(selectList);

  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
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
    activeProject.addTodo('Testing', 'bla bkah bkah bkah', '65789', 'medium');
    tContainer.innerHTML = "";
    tasksView(activeProject.allTodos());
    content.removeChild(taskModalContainer);
  })
  content.appendChild(taskModalContainer);
}

const tasksView = (tasks) => {
  const taskTopContainer = document.createElement('div');
  taskTopContainer.setAttribute('class', 'taskTopContainer');
  const taskTitle = document.createElement('h3');
  taskTitle.innerHTML = 'Tasks';

  const taskBtnContainer = document.createElement('div');
  taskBtnContainer.setAttribute('class', 'newTaskBtn');
  const newTaskBtn = document.createElement('button');
  newTaskBtn.setAttribute('class', 'btn');
  newTaskBtn.innerHTML = 'Add Task'

  newTaskBtn.addEventListener('click', () => {
    newTaskModal();
  });
  taskBtnContainer.appendChild(newTaskBtn);

  taskTopContainer.appendChild(taskTitle);
  taskTopContainer.appendChild(taskBtnContainer);

  const taskListContainer = document.createElement('div');
  taskListContainer.setAttribute('class', 'taskListContainer');
  
  tasks.forEach( task => {
    const tList = document.createElement('div');
    tList.setAttribute('class', 'task-item');

    const taskStatus = document.createElement('input');
    taskStatus.setAttribute('type', 'checkbox');
    taskStatus.checked = task.status;

    const taskName = document.createElement('h4');
    taskName.innerHTML = task.title;

    const taskDate = document.createElement('p');
    taskDate.innerHTML = task.dueDate;

    tList.appendChild(taskStatus);
    tList.appendChild(taskName);
    tList.appendChild(taskDate);

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
  const closeBtn = document.createElement("span");
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
  })
  addProjectBtn.addEventListener('click', () => {
    controller.addProject(inputField.value);
    pContainer.innerHTML = "";
    tContainer.innerHTML = "";
    projectsView(controller.allProjects());
    content.removeChild(nPModalContainer);
  })
  content.appendChild(nPModalContainer);
}

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
  })
  const pListContainer = document.createElement('div');
  const pList = document.createElement('ul');
  pListContainer.appendChild(pList);
  pListContainer.classList.add('pListContainer');
  pContainer.appendChild(pListContainer);
  projects.forEach(project => {
    const projectName = document.createElement('li');
    projectName.innerHTML = project.name
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