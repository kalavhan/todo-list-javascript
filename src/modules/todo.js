const Todo = (title, description, dueDate, priority, status = false) => {
  const toggleCheck = () => status = !status;

  const checked = () => status = true;

  const unchecked = () => status = false;

  const editTask = (editedTitle, editedDescription, editedDueDate, editedPriority) => {
    title = editedTitle;
    description = editedDescription;
    dueDate = editedDueDate;
    priority = editedPriority;
  }

  return {
    title,
    description,
    dueDate,
    priority,
    toggleCheck,
    checked,
    unchecked,
    editTask
  }

};

export default Todo