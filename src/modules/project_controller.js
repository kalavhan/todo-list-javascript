import Projects from './projects';
import storage from './storage';

const projectController = () => {
  let projects = [];
  let count = 1;

  const defaultData = () => {
    const savedProjects = storage.retrieveProjects();
    const savedTasks = storage.retrieveTasks();
    if (savedProjects != false){
      savedProjects.forEach( savedProject => {
        const newProject = Projects(savedProject[0], savedProject[1]);
        projects.push(newProject);
        if (savedTasks != false){
          const newProjectTasks = savedTasks.filter(pTask => pTask[5] == savedProject[1]);
          newProjectTasks.forEach( newTask => {
            newProject.addLocalTodo(newTask[0], newTask[1], newTask[2], newTask[3], newTask[4], newTask[5], newTask[6]);
          });
        }
      });
    } else {
      const defaultProject = Projects('Default', 0);
      storage.saveProject(['Default', 0]);
      projects.push(defaultProject);
      defaultProject.addTodo('Click me (example)', 'This is just and example', '2020-06-24', 'Medium');
    }
  }

  const addProject = (name) => {
    projects.push(Projects(name, count));
    storage.saveProject([name, count]);
    count = count + 1;
  }

  const allProjects = () => {
    return projects;
  }

  return {
    defaultData,
    allProjects,
    addProject
  };
}
export default projectController;