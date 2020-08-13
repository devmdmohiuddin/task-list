// UI define
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // dom load event
    document.addEventListener('DOMContentLoaded', getTask)

    // Add task event
    form.addEventListener('submit', addTask)

    // remove task
    taskList.addEventListener('click', removeTask)

    // clear task
    clearBtn.addEventListener('click', clearTask)

    // filter task
    filter.addEventListener('keyup', filterTask)
}

// Get task
function getTask(e) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks =  JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li')
        
        // add class
        li.className = 'collection-item'

        // append text node
        li.appendChild(document.createTextNode(task))

        // create new link
        const link = document.createElement('a')

        // add class
        link.className = 'delete-item secondary-content'

        // innerHTML in the link
        link.innerHTML = '<i class="fas fa-times"></i>'

        // link append to li
        li.appendChild(link)

        // append li to ul
        taskList.appendChild(li)
    })

}



// Add Task
function addTask(e) {
    if (taskInput.value === '') { 
        alert('Add a Task')
    }

    // create li element
    const li = document.createElement('li')
    
    // add class
    li.className = 'collection-item'

    // append text node
    li.appendChild(document.createTextNode(taskInput.value))

    // create new link
    const link = document.createElement('a')

    // add class
    link.className = 'delete-item secondary-content'

    // innerHTML in the link
    link.innerHTML = '<i class="fas fa-times"></i>'

    // link append to li
    li.appendChild(link)

    // append li to ul
    taskList.appendChild(li)

    // local storage
    storeTaskInLocalStorage(taskInput.value)

    // clear taskInput
    taskInput.value = ''

    e.preventDefault()

}

// local storage
function storeTaskInLocalStorage(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks =  JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()

            // remove form local storage 
            removeFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

// remove from local storage
function removeFromLocalStorage(item) {
    let tasks

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task, index) {
        if (item.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
    
}
 
// clear task
function clearTask(e) {
    // taskList.innerHTML = '' //slow work

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild) // faster
    }

    clearTaskFromLocalStorage()
}

// claear from local storage
function clearTaskFromLocalStorage() {
    localStorage.clear()
}

// filter Task
function filterTask(e) {
    const text = e.target.value.toLowerCase()
    
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}