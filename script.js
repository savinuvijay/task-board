import { TaskItem } from "./taskItemComponent.js";
import { SwimLane } from "./swimLaneComponent.js";
import { TaskBoardDataService } from "./taskBoardDataService.js";

window.customElements.define("task-item", TaskItem);
window.customElements.define("swim-lane", SwimLane);

let taskBoardDataService = new TaskBoardDataService([]);

// let state = [];

let addSwimLaneButton = document.querySelector(".add-swim-lane-btn");
let listContainer = document.querySelector(".swim-lanes");

let swimLaneIdCount = 0;
addSwimLaneButton.addEventListener("click", (e) => {
    addSwimLane(e);
});

function addSwimLane(e) {
    e.stopPropagation();
    let swimLane = document.createElement("swim-lane");
    swimLane.id = swimLaneIdCount++;

    // //--------------------------
    // state.push({
    //     id: swimLane.id,
    //     name: "New",
    //     tasks: [],
    // });
    // console.log(state);
    // //--------------------------
    taskBoardDataService.addSwimLane(swimLane.id);

    swimLane.addEventListener("taskadd", (e) => {
        onTaskAdd(e);
    });

    swimLane.addEventListener("taskdrop", (e) => {
        onTaskDrop(e);
    });

    swimLane.addEventListener("taskdelete", (e) => {
        onTaskDelete(e);
    });
    listContainer.appendChild(swimLane);
}

function onTaskAdd(e) {
    if (e.detail.parent?.parentNode) {
        // //--------------------------
        // let parentSwimLane = e.detail.parent.parentNode.host;
        // let task = e.detail.task;
        // let parentSwimLaneState = state.find((s) => s.id === parentSwimLane.id);
        // parentSwimLaneState.tasks.push({
        //     id: task.id,
        // });
        // //--------------------------
        taskBoardDataService.addTask(parentSwimLane, task);
    }
    console.log(state);
}

function onTaskDrop(e) {
    // //--------------------------
    // let parentSwimLane = e.detail.parent.parentNode.host;
    // let dropZone = e.detail.dropZone;
    // let task = e.detail.task;
    // let parentSwimLaneState = state.find((s) => s.id === parentSwimLane.id);
    // let taskItem = parentSwimLaneState.tasks.find((t) => t.id === task.id);
    // let dropZoneState = state.find((s) => s.id === dropZone.id);
    // dropZoneState.tasks.push(taskItem);
    // parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
    //     (t) => t.id !== task.id
    // );
    // console.log(state);
    // //--------------------------
    taskBoardDataService.dropTask(parentSwimLane, dropZone, task);
}

function onTaskDelete(e) {
    // //--------------------------
    // let parentSwimLane = e.detail.parent.parentNode.host;
    // let task = e.detail.task;
    // let parentSwimLaneState = state.find((s) => s.id === parentSwimLane.id);
    // parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
    //     (t) => t.id !== task.id
    // );
    // console.log(state);
    // //--------------------------
    taskBoardDataService.deleteTask(parentSwimLane, task);
}
