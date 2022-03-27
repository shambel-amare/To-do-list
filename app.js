// Define UI variables
const form= document.querySelector('#task-form')
const taskList= document.querySelector('.task-collection')
const clearBtn= document.querySelector('.clear-btn')
const filter= document.querySelector('#filter')
const taskInput= document.querySelector('#task')

loadEventListner();

function loadEventListner(){

//Document loader
document.addEventListener('DOMContentLoaded',getTasks);
// Add task
form.addEventListener('submit',addTask);
//remove task event
taskList.addEventListener('click',removeTask)
//clear all tasks
clearBtn.addEventListener('click',clearTask)
//filter tasks
filter.addEventListener('keyup',filterTasks)
};
//get tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
    //create li element inside a div of classname list-item
    const list=document.createElement('div')
    list.className='list-item delete-item'
    const li=document.createElement('li')

    //create text node 
    li.appendChild(document.createTextNode(task))
    //create the delete link and append to li
    const link=document.createElement('a')
    link.className='delete-tag'
    link.setAttribute('href','#')
    link.appendChild(document.createTextNode('X'))

    //append li to the list
    list.appendChild(li)

    list.appendChild(link)

    //append li to ul
    taskList.appendChild(list)
    })
}
//Add task
function addTask(e){
    e.preventDefault();
    if(taskInput.value===''){
        alert('Add task')
    }else {
        //create li element inside a div of classname list-item
        const list=document.createElement('div')
        list.className='list-item delete-item'
        const li=document.createElement('li')
        
        //create text node 
        li.appendChild(document.createTextNode(taskInput.value))
        //create the delete link and append to li
        const link=document.createElement('a')
        link.className='delete-tag'
        link.setAttribute('href','#')
        link.appendChild(document.createTextNode('X'))
        
        //append li to the list
        list.appendChild(li)
        
        list.appendChild(link)
        
        //append li to ul
        taskList.appendChild(list)
        
        //Store in LS
        storeTaskInLocalStorage(taskInput.value);
}
    //clear input
    taskInput.value=''

}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you Sure?')){

            e.target.parentElement.remove()
            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }

}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task,index){
    if(taskItem.firstChild.textContent===task){
        tasks.splice(index,1);
    }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTask(){
    // taskList.innerHTML='';
    if(confirm('Are You Sure?')){

        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
    }
    }
clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.list-item').forEach(taskFilter=(task)=>{
        const item =task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text)!=-1){
            task.style.display='flex'

        }else{
            task.style.display='none'
        }
})
}
