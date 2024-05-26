console.log('todolist.js loaded')

const submitForm = document.getElementById('submitForm')
const taskTitle = document.getElementById('title')
const taskDescription = document.getElementById('description')
const taskPriority = document.getElementById('selectedPriority')
const tasksList = document.getElementById('tasksList')
const clearTasksButton = document.getElementById('clearTasks')
console.log({ submitForm, taskTitle, taskDescription, taskPriority, tasksList, clearTasksButton })

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed')
    console.log({ tasks })

    if (tasks.length > 0) {
        renderTasks()
    }
})

// Read information from inputs
taskTitle.addEventListener('input', (e) => {
    console.log("Reading title")
    console.log(e.target.value)
})

taskDescription.addEventListener('input', (e) => {
    console.log("Reading description")
    console.log(e.target.value)
})

taskPriority.addEventListener('change', (e) => {
    console.log("Reading priority")
    console.log(e.target.value)
})

clearTasksButton.addEventListener('click', (e) => {
    console.log('Clear tasks button clicked')
    clearTasks()
    tasksList.innerHTML = ''

})

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // How works preventDefault()?
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    // For example, this can be useful when:
    // Clicking on a "Submit" button, prevent it from submitting a form
    // Clicking on a link, prevent the link from following the URL
    // Note: Not all events are cancelable. Use the cancelable property to find out if an event is cancelable.

    console.log(e)

    addTask()

    console.log('Form submitted')
})

const addTask = () => {
    const title = taskTitle.value.trim()
    const description = taskDescription.value.trim()
    const priority = taskPriority.value

    const task = {
        id: Date.now().toString(),
        title,
        description,
        priority
    }

    tasks.push(task)
    console.log({ tasks })

    saveTasks()
    renderTasks()

    taskTitle.value = ''
    taskDescription.value = ''
    taskPriority.value = ''
}

const saveTasks = () => {
    console.log('Saving task')
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const clearTasks = () => {
    console.log('Clearing tasks')
    tasks = []
    saveTasks()
}

function renderTasks() {
    tasksList.innerHTML = ''
    tasks.forEach(task => {
        console.log({ task })
        const taskItem = document.createElement('div')
        const itemTitle = document.createElement('h3')
        const itemDescription = document.createElement('p')
        const itemPriority = document.createElement('span')
        const containerInfo = document.createElement('div')

        taskItem.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'border', 'border-primary', 'p-3', 'col-9')

        itemTitle.textContent = task.title
        itemDescription.textContent = task.description
        itemPriority.textContent = task.priority

        taskItem.appendChild(itemTitle)
        containerInfo.appendChild(itemDescription)
        containerInfo.appendChild(itemPriority)
        taskItem.appendChild(containerInfo)

        tasksList.appendChild(taskItem)

    })
}