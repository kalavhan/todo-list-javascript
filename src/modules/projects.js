const Projects = (name) => {
  let todos = [];

  const allTodos = () => {
    todos;
  };
  
  const getTodo = (position) => {
    todos[position];
  };

  const addTodo = (newTodo) => {
    todos.push(newTodo);
  }

  return {
    name,
    allTodos,
    getTodo,
    addTodo
  }
};