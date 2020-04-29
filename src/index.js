import projectList from './modules/projectlist';
const render = () => {
window.alert('Hillarious');
const pList = projectList();
pList.addProject('second');
console.log(pList.projects);
let pro = pList.projects[1];
let qwe = pList.projects[0];
pro.addTodo('Go to walk', 'walk in the park', '24/06/2020', 'Medium');
qwe.addTodo('Buy cofee', 'go to the coffee shop', '24/06/2020', 'High');
console.log(pro.allTodos());
console.log(qwe.allTodos());
let task = pro.getTodo(0);
task.editTask('juojue', 'jueue', 'date', 'High');
console.log(pro.allTodos());
};

render();