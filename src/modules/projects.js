import Todo from './todo';
const Projects = (name) => {
  let todos = [];

  const allTodos = () => {
    return todos;
  };
  
  const getTodo = (position) => {
    return todos[position];
  };

  const addTodo = (title, description, dueDate, priority) => {
    todos.push(Todo(title, description, dueDate, priority));
  }

  return {
    name,
    allTodos,
    getTodo,
    addTodo
  }
};

export default Projects;