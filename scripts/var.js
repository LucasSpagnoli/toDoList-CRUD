/* Objeto da task */
let taskItem = {
    nome: "",
    dueDate: "",
    dueTime: ""
}
let compTaskItem = {
    nome: "",
    dueDate: null
}

/* Array dos objetos */
let taskArray = []
let compTaskArray = []

/* Elementos da página */
let inputTask = document.querySelector(".input-task")
const addBtn = document.querySelector(".add-btn")
let taskList = document.querySelector(".task-list")
const checkBtn = document.querySelector(".task-checkbox")
let clearBtn = document.querySelector(".clear-btn")
let tasksQuant = document.querySelector(".tasks-quant")
const allTasks = document.querySelector(".all-type")
const activeTasks = document.querySelector(".active-type")
const compTasks = document.querySelector(".completed-type")
const body = document.querySelector("body")
const inputDate = document.querySelector(".input-date")
const inputTime = document.querySelector(".input-time")

/* objetos pra alterar variável em outros arquivos */
/* Serve pra dizer qual a página atual e carregar as tasks correspondetes */
export const currentPage = {
    page: "active"
}

/* Serve para armazenar localmente as tasks */
export const storageTasks = {
    localTasks: "",
    localCompTasks: ""
}

/* exportação de elementos */
export { body, taskItem, taskArray, inputTask, addBtn, taskList, checkBtn, clearBtn, tasksQuant, compTaskArray, compTaskItem, compTasks, allTasks, activeTasks, inputDate, inputTime }