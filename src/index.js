import './index.css';
import projectController from './modules/project_controller';

let tContainer = document.getElementById('tasks');
let pContainer = document.getElementById('projects');

const tasksView = (tasks) => {
  const tList = document.createElement('ul');
  tContainer.appendChild(tList);
  tasks.forEach( task => {
    const taskName = document.createElement('li');
    taskName.innerHTML = task.title;
    tList.appendChild(taskName);
  });
};

const projectsView = (projects) => {
  const pList = document.createElement('ul');
  pContainer.appendChild(pList);
  projects.forEach(project => {
    const projectName = document.createElement('li');
    projectName.innerHTML = project.name
    pList.appendChild(projectName);
    if (project.name === 'Default') {
      tasksView(project.allTodos());
    }    

    projectName.addEventListener('click', () => {
      tContainer.innerHTML = '';
      tasksView(project.allTodos());
    });

  });
  
};

const render = () => {
  const controller = projectController();
  const projects = controller.allProjects();
  projectsView(projects);
};

render();