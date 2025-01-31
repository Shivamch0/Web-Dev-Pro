document.addEventListener('DOMContentLoaded',function(){
const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');  
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => {
    renderTasks(task);
});

todoButton.addEventListener(
    'click',
    function(){
       const taskTest =  todoInput.value.trim();  // Trim remove extra spaces after the sentence
       if(taskTest === ""){
        return;
       }

       const newTask = {     // Giving a unique id , text , status to the task //
        id : Date.now(),
        text : taskTest,
        completed : false
       }
       tasks.push(newTask);
       saveTasks();  // Save the input in the local storage //
       renderTasks(newTask);
       todoInput.value = "";  // clear input //
       console.log(tasks);
    }
);

function renderTasks(task){
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    if(task.completed){
        li.classList.add('completed')
    }
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;
    li.addEventListener('click',
        function(e){
            if(e.target.tagName === 'BUTTON'){
               return;
            }else{
                task.completed = !task.completed;
            }
            li.classList.toggle('completed');
            saveTasks();
        });

    li.querySelector('button').addEventListener('click',
        function(e){
            e.stopPropagation();  // Prevent toggle from firing //
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove();
            saveTasks();
        }
    )

    todoList.appendChild(li);
}

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Establish connection with local storage //
}
});