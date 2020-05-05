const storage = (() => {
  const saveProject = (project) => {
    let savedProjects = localStorage.getItem('projects');
    if (savedProjects !== undefined && savedProjects !== null) {
      savedProjects = JSON.parse(savedProjects);
      savedProjects.push(project);
      localStorage.setItem('projects', JSON.stringify(savedProjects));
    } else {
      const tempArray = [];
      tempArray.push(project);
      localStorage.setItem('projects', JSON.stringify(tempArray));
    }
  };

  const saveTask = (task) => {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks !== undefined && savedTasks !== null) {
      savedTasks = JSON.parse(savedTasks);
      savedTasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    } else {
      const tempArray = [];
      tempArray.push(task);
      localStorage.setItem('tasks', JSON.stringify(tempArray));
    }
  };

  const retrieveProjects = () => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects !== undefined && savedProjects !== null) {
      return JSON.parse(savedProjects);
    }
    return false;
  };

  const retrieveTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks !== undefined && savedTasks !== null) {
      return JSON.parse(savedTasks);
    }
    return false;
  };

  const updateTask = (newData, projectId, todoId) => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < savedTasks.length; i += 1) {
      if (savedTasks[i][5] === projectId && savedTasks[i][6] === todoId) {
        savedTasks[i] = newData;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        return;
      }
    }
  };

  const deleteTask = (projectId, todoId) => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < savedTasks.length; i += 1) {
      if (savedTasks[i][5] === projectId && savedTasks[i][6] === todoId) {
        savedTasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        return;
      }
    }
  };

  return {
    saveProject,
    saveTask,
    retrieveProjects,
    retrieveTasks,
    updateTask,
    deleteTask,
  };
})();

export default storage;
