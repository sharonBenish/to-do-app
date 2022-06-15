const todoInput = document.getElementById("task-input")
const form = document.querySelector(".input__field")
const todoList = document.getElementById("todo-list");
const filters = document.querySelectorAll(".filters");
const clearBtn = document.getElementById("clear-completed");
const count = document.querySelector(".active-counter");

let tasks=[];
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    if (todoInput.value.trim()=="") return;

    const task = todoInput.value;
    const id = String(Date.now());
    const entry = {id: id, task:task, completed:false};
    addToArray(entry);
    addToDOM(entry)
    todoInput.value=""
})

function addToArray(entry){
    tasks.push(entry);
    console.log(tasks)
}

function addToDOM(entry){
    const el = `<div class="todo-list-item" data-completed="${entry.completed}" data-uniqid=${entry.id} draggable="true">
    <input type="checkbox" id=${entry.id}><span class="custom_checkbox" tabindex="0"></span>
    <label for=${entry.id}>${entry.task}</label>
    <span class="delete" hidden><img src="./images/icon-cross.svg" alt="" class="delete-icon" data-uniqid=${entry.id}></span>
</div>`

    todoList.innerHTML += el;
    updateChecks()
    updateCount(1);
}

function deleteItem(el){
    el.remove()
}

todoList.addEventListener("click", (e)=>{
    key = e.target;
    if (key.classList.contains("delete-icon")){
        console.log(key.dataset.uniqid)
        tasks = tasks.filter( task=> task.id != key.dataset.uniqid);
        console.log(tasks);
        const taskItem = key.parentElement.parentElement;
        deleteItem(taskItem);
        if (taskItem.dataset.completed == "false"){
            updateCount(-1)
        }
    }
    


   if(key.classList.contains("custom_checkbox")){
      
        const parent = key.parentElement
        console.log(parent)
        const checkbox = parent.querySelector("[type = 'checkbox']");
        const idx = tasks.findIndex(task => task.id == checkbox.id)
        if (checkbox.checked){
            checkbox.checked =false;
            parent.dataset.completed = false;
            tasks[idx].completed= false;
            updateCount(1);
        }else{
            checkbox.checked = true;
            parent.dataset.completed = true;
            tasks[idx].completed = true;
            updateCount(-1)
        }
       
    }

    if (key.type == "checkbox"){
        key.classList.toggle("is_marked");
        const idx = tasks.findIndex(task => task.id == key.id);
        console.log(e.currentTarget)

        if (key.checked){
            console.log("marked");
            updateCount(-1);
            key.parentElement.dataset.completed = true;
            tasks[idx].completed = true;
            console.log(tasks)
        }else{
            updateCount(1);
            key.parentElement.dataset.completed = false;
            tasks[idx].completed= false;
            console.log(tasks)
        }
    }

})



function updateChecks(){
    const taskItems = [...todoList.children];
    for (item of taskItems){
        if (item.dataset.completed == "true"){
            const checkbox = item.querySelector("[type = 'checkbox']");
            checkbox.checked =true;
        }
    }
}

function updateCount(int){
    const countNo =+ count.innerHTML.trim();
    console.log(countNo);
    console.log(int)
    count.innerHTML = countNo + int;
}

filters.forEach(filter=> filter.addEventListener("click", e=>{
    const key = e.target;
    const taskItems = [...todoList.children];
    if (key.dataset.filter=="all"){
        for (task of taskItems){
            task.classList.remove("hide")
        }
    }else if (key.dataset.filter=="active"){
        for (task of taskItems){
            if (task.dataset.completed == "true"){
                task.classList.add("hide")
            } else{
                task.classList.remove("hide")
            }
        }
    }
    if (key.dataset.filter=="completed"){
        for (task of taskItems){
            if (task.dataset.completed == "true"){
                task.classList.remove("hide")
            } else{
                task.classList.add("hide")
            }
        }
    }
})
)

clearBtn.addEventListener("click", ()=>{
    const taskItems = [...todoList.children];
    for (item of taskItems){
        if (item.dataset.completed == "true"){
            deleteItem(item);
            tasks = tasks.filter(task => task.id != item.dataset.uniqid)
            console.log(tasks)
        }
    }
})



const dragArea = document.getElementById('todo-list');
    new Sortable(dragArea,{
        swap: true, // Enable swap plugin
        swapClass: 'dragging', // The class applied to the hovered swap item
        animation: 150
    });
