const Todo = (title, description, dueDate, priority, status = false) => {
  function toggleCheck() {
    this.status = !this.status;
  }

  const checked = () => status = true;

  const unchecked = () => status = false;

  function editTask(editedTitle, editedDescription, editedDueDate, editedPriority) {
    this.title = editedTitle;
    this.description = editedDescription;
    this.dueDate = editedDueDate;
    this.priority = editedPriority;
  }

  return {
    title,
    description,
    dueDate,
    priority,
    status,
    toggleCheck,
    checked,
    unchecked,
    editTask
  }

};

export default Todo