import storage from './storage';
const Todo = (
  title,
  description,
  dueDate,
  priority,
  status = false,
  projectId,
  todoId
) => {
  function toggleCheck() {
    this.status = !this.status;
    storage.updateTask(
      [
        this.title,
        this.description,
        this.dueDate,
        this.priority,
        this.status,
        projectId,
        todoId,
      ],
      projectId,
      todoId
    );
  }

  const checked = () => (status = true);

  const unchecked = () => (status = false);

  function editTask(
    editedTitle,
    editedDescription,
    editedDueDate,
    editedPriority
  ) {
    this.title = editedTitle;
    this.description = editedDescription;
    this.dueDate = editedDueDate;
    this.priority = editedPriority;
    storage.updateTask(
      [
        this.title,
        this.description,
        this.dueDate,
        this.priority,
        this.status,
        projectId,
        todoId,
      ],
      projectId,
      todoId
    );
  }

  return {
    title,
    description,
    dueDate,
    priority,
    status,
    projectId,
    todoId,
    toggleCheck,
    checked,
    unchecked,
    editTask,
  };
};

export default Todo;
