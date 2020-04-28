const Todo = (title, description, dueDate, priority, status = false) => {

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
    unchecked
  }

};

export default Todo