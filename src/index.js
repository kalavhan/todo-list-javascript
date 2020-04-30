import './index.css';
import projectController from './modules/project_controller';

let tContainer = document.getElementById('tasks');
let pContainer = document.getElementById('projects');
let content = document.getElementById('content');
const controller = projectController();
let lastProjectSelected = '';

const tasksView = (tasks) => {
  const tList = document.createElement('ul');
  tContainer.appendChild(tList);
  tasks.forEach( task => {
    const taskName = document.createElement('li');
    taskName.innerHTML = task.title;
    tList.appendChild(taskName);
  });
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
      projectName.classList.add('active');
      tasksView(project.allTodos());
    }    

    projectName.addEventListener('click', () => {
      lastProjectSelected.classList.remove('active');
      projectName.classList.add('active');
      lastProjectSelected = projectName;
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