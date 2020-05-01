import Projects from './projects';

const projectController = () => {
  let projects = [];

  const defaultProject = Projects('Default');
  defaultProject.addTodo('Go to walk', 'walk in the park', '2020-06-24', 'Medium');
  projects.push(defaultProject);

  const project2 = Projects('Project 2')
  projects.push(project2);
  project2.addTodo('Write article', 'Publich article to medium', '2020-07-12', 'Low');

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