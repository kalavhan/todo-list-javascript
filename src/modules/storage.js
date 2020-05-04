const storage = (() => {
  const saveProject = (project) => {
    let savedProjects = localStorage.getItem('projects');
    if (savedProjects != undefined && savedProjects != null){
      savedProjects = JSON.parse(savedProjects);
      savedProjects.push(project);
      localStorage.setItem('projects', JSON.stringify(savedProjects));
    } else {
      let tempArray = [];
      tempArray.push(project);
      console.log(project)
      localStorage.setItem('projects', JSON.stringify(tempArray));
    }
  }

  const saveTask = (task) => {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks != undefined && savedTasks != null){
      savedTasks = JSON.parse(savedTasks);
      savedTasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    } else {
      let tempArray = [];
      tempArray.push(task);
      localStorage.setItem('tasks', JSON.stringify(tempArray));
    }
  }

  const retrieveProjects = () => {
    let savedProjects = localStorage.getItem('projects');
    if (savedProjects != undefined && savedProjects != null){
      return JSON.parse(savedProjects);
    } else {
      return false;
    }
  }

  const retrieveTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks != undefined && savedTasks != null) {
      return JSON.parse(savedTasks);
    } else {
      return false;
    }
  }

  const updateTask = (newData, projectId, todoId) => {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(newData);
    console.log(projectId);
    console.log(todoId);
    console.log(savedTasks);
    for(let i = 0; i < savedTasks.length; i++){
      if(savedTasks[i][5] === projectId && savedTasks[i][6] === todoId){
        savedTasks[i] = newData;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
      }
    }
  }

  return {
    saveProject,
    saveTask,
    retrieveProjects,
    retrieveTasks,
    updateTask
  }
})();

export default storage;