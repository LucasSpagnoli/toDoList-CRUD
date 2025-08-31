/* Elementos */
import { inputTask, addBtn, clearBtn, taskArray, compTasks, allTasks, activeTasks, taskList } from "./var.js"

import { addTask, renderActiveTasks, renderCompTasks, renderAllTasks, deleteTask, completeTask, loadTasks, saveTasks } from "./functions.js"

/* input e btn style */
inputTask.addEventListener("focus", () => {
    addBtn.innerText = "+"
    addBtn.style.display = "block"
})

inputTask.addEventListener("blur", () => {
    setTimeout(() => {
        if (addBtn.matches(":focus")) {
        } else {
            addBtn.innerText = ""
            setTimeout(() => {
                addBtn.style.display = "none"
            }, 200);
        }
    }, 50)
})

addBtn.addEventListener("blur", () => {
    addBtn.innerText = ""
    setTimeout(() => {
        addBtn.style.display = "none"
    }, 200);
})

taskList.addEventListener("mouseover", (checkTask)=>{
    const checkBtn = checkTask.target.closest(".task-checkbox")
    let texto = document.getElementById(`a${checkBtn.dataset.compId}`)
    texto.style.transition = "all 0.2s ease";
    texto.style.textDecoration = "line-through";
})

taskList.addEventListener("mouseout", (checkTask)=>{
    const checkBtn = checkTask.target.closest(".task-checkbox")
    let texto = document.getElementById(`a${checkBtn.dataset.compId}`)
    texto.style.textDecoration = "none";
})

/* Load tasks */
window.addEventListener("load", ()=>{
    loadTasks()
})

/* New Task */
inputTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask()
    }
})

addBtn.addEventListener("click", () => {
    addTask()
    addBtn.innerText = ""
    setTimeout(() => {
        addBtn.style.display = "none"
    }, 200);
}) 

/* Clear tasks */
clearBtn.addEventListener("click", () => {
    taskArray.splice(0, taskArray.length)
    saveTasks()
    renderActiveTasks()
})

/* Active Tasks */
activeTasks.addEventListener("click", ()=>{
    renderActiveTasks()
})

/* Completed Tasks */
compTasks.addEventListener("click", () => {
    renderCompTasks()
})

/* All Tasks */
allTasks.addEventListener("click", () =>{
    renderAllTasks()
})

/* Delete Task */
taskList.addEventListener("click", (delBtn)=>{
    const deleteButton = delBtn.target.closest(".del-task-btn")
    const item = document.getElementById(`b${deleteButton.dataset.delId}`)
    if (deleteButton){
        item.style.animation = "delTask 0.2s"
        setTimeout(() => {
                deleteTask(deleteButton.dataset.delId)
            }, 100);
    }
})

/* Complete Task */
taskList.addEventListener("click", (compBtn)=>{
    const completeButton = compBtn.target.closest(".task-checkbox")
    const item = document.getElementById(`b${completeButton.dataset.compId}`)
    if (completeButton){
        item.style.animation = "completeTask 0.2s"
        setTimeout(() => {
                completeTask(completeButton.dataset.compId)
            }, 100);
    }
})