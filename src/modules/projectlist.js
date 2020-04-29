import Projects from './projects';
const projectList = () => {
  let projects = [];
  const defaultProject = Projects('default');
  projects.push(defaultProject);

  const addProject = (name) => {
    projects.push(Projects(name));
  }

  return {
    projects,
    addProject
  };
}
export default projectList;