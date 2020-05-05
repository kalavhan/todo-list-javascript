import Todo from './todo';
import storage from './storage';

const Projects = (name, projectId) => {
  const todos = [];
  let todoId = 0;
  const allTodos = () => todos;

  const getTodo = (position) => todos[position];

  const addTodo = (title, description, dueDate, priority) => {
    todos.push(
      Todo(title, description, dueDate, priority, false, projectId, todoId),
    );
    storage.saveTask([
      title,
      description,
      dueDate,
      priority,
      false,
      projectId,
      todoId,
    ]);
    todoId += 1;
  };

  const addLocalTodo = (
    savedTitle,
    savedDescription,
    savedDueDate,
    savedPriority,
    savedStatus,
    savedProjectId,
    savedTodoId,
  ) => {
    todos.push(
      Todo(
        savedTitle,
        savedDescription,
        savedDueDate,
        savedPriority,
        savedStatus,
        savedProjectId,
        savedTodoId,
      ),
    );
    todoId = savedTodoId + 1;
  };

  const deleteTodo = (index) => {
    todos.splice(index, 1);
    storage.deleteTask(projectId, index);
  };

  return {
    name,
    projectId,
    allTodos,
    getTodo,
    addTodo,
    addLocalTodo,
    deleteTodo,
  };
};

export default Projects;
