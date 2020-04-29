import Projects from './projects';

const projectController = () => {
  let projects = [];

  const defaultProject = Projects('Default');
  defaultProject.addTodo('Go to walk', 'walk in the park', '24/06/2020', 'Medium');
  projects.push(defaultProject);

  const project2 = Projects('Project 2')
  projects.push(project2);
  project2.addTodo('Write article', 'Publich article to medium', '24/06/2020', 'Low');

  projects.push(Projects('Project 3'));

  const addProject = (name) => {
    projects.push(Projects(name));
  }

  const allProjects = () => {
    return projects;
  }

  return {
    allProjects,
    addProject
  };
}
export default projectController;