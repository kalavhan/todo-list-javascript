const Todo = (title, description, dueDate, priority, status = false, projectId) => {

  const toggleCheck = () => status = !status;

  const checked = () => status = true;

  const unchecked = () => status = false;

  return {
    title,
    description,
    dueDate,
    priority,
    toggleCheck,
    checked,
    unchecked,
    projectId
  }

};

export default Todo