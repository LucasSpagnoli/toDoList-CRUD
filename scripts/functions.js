import { inputTask, taskItem, taskList, taskArray, tasksQuant, compTaskArray, compTaskItem, currentPage, storageTasks, inputDate, inputTime } from "./var.js"
import { timeRemain, verifyDate } from "./dateTime.js"

/* Função que muda o texto no canto das tasks */
function textChange() {
    /* Mudança no texto de tasks completas */
    if (taskArray.length > 0) {
        if (taskArray.length === 1) {
            tasksQuant.innerHTML = `${taskArray.length} task`
        } else {
            tasksQuant.innerHTML = `${taskArray.length} tasks`
        }
    } else {
        tasksQuant.innerHTML = `No tasks`
    }
}

/* Função que salva as tasks */
export function saveTasks() {
    storageTasks.localTasks = JSON.stringify(taskArray)
    storageTasks.localCompTasks = JSON.stringify(compTaskArray)
    localStorage.setItem("tasksArrays", storageTasks.localTasks)
    localStorage.setItem("compTasksArrays", storageTasks.localCompTasks)
}

/* Função que carrega as tasks */
export function loadTasks() {
    const localTaskArray = localStorage.getItem("tasksArrays")
    const localCompTaskArray = localStorage.getItem("compTasksArrays")
    if (localTaskArray) {
        const arrayTasks = JSON.parse(localTaskArray)
        arrayTasks.forEach((task) => {
            taskArray.push(task)
        })
        renderTasks("new")
    }
    if (localCompTaskArray) {
        const arrayCompTasks = JSON.parse(localCompTaskArray)
        arrayCompTasks.forEach((task) => {
            compTaskArray.push(task)
        })
        renderTasks("comp")
    }
}

/* Função que carrega as tasks */
export function renderTasks(type) {
    let preTaskList = ""
    if (type == "new") {
        /* Se a task for nova */
        /* Carrega cada task percorrendo a array */
        taskArray.forEach((item, index) => {
            preTaskList += `
        <li class="task-item" id="b${index}">
            <button class="task-checkbox" data-comp-id="${index}">
            &#10003
            </button>
            <p class="task-text" id="a${index}">
            ${item.nome} (${timeRemain(item.dueDate, item.dueTime)})
            </p>
            <button class="del-task-btn" data-del-id="${index}">
            &#128465
            </button>
        </li>`
        })

        /* Se for uma task completa */
    } else if (type == "comp") {

        /* Carrega tasks completas percorrendo array */
        compTaskArray.forEach((item) => {
            preTaskList += `
        <li class="task-item">
            <p class="task-text">${item.nome}
            </p>
        </li>`
        })
    }
    taskList.innerHTML += preTaskList
}

/* Função que chama pra carregar tasks ativas */
export function renderActiveTasks() {
    taskList.innerHTML = ""
    renderTasks("new")
    textChange()
    currentPage.page = "active"
}

/* Função que chama pra carregar tasks completas */
export function renderCompTasks() {
    /* Esvazia lista de tasks */
    taskList.innerHTML = ""
    /* Carrega tasks completas */
    renderTasks("comp")
    /* Muda o texto */
    textChange()
    currentPage.page = "comp"
}

/* Função que chama pra carregar todas as tasks */
export function renderAllTasks() {
    taskList.innerHTML = ""
    renderTasks("comp")
    renderTasks("new")
    textChange()
    currentPage.page = "all"
}

/* Função que deleta tasks */
export function deleteTask(delId) {
    taskArray.splice(delId, 1)
    if (currentPage.page == "active") {
        renderActiveTasks()
    } else {
        renderAllTasks()
    }
    saveTasks()
}

/* Função que completa task */
export function completeTask(compId) {
    compTaskItem.nome = taskArray[compId].nome
    compTaskItem.dueDate = ""
    compTaskArray.push({ ...compTaskItem })
    deleteTask(compId)
    saveTasks()
}

/* Cria tasks */
export function addTask() {
    /* Condição pra saber se não está vazio o input */
    if (inputTask.value && inputDate.value && inputTime.value) {
        const [dia, mes] = inputDate.value.split('/')
        const [hora, min] = inputTime.value.split(':')
        if (verifyDate(dia, mes, hora, min)) {
            taskItem.nome = inputTask.value
            taskItem.dueDate = `${dia}/${mes}`
            taskItem.dueTime = `${hora}:${min}`
            taskArray.push({ ...taskItem })
            if (currentPage.page == "active") {
                renderActiveTasks()
            } else {
                renderAllTasks()
            }
            inputTask.value = ""
            saveTasks()
        } else {
            window.alert("Digite um formato de dia e hora válido")
        }
    } else {
        window.alert("Digite um nome para sua task!")
    }
}