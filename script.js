import { TaskItem } from "./taskItemComponent.js";
import { SwimLane } from "./swimLaneComponent.js";
import { TaskBoardDataService } from "./taskBoardDataService.js";

window.customElements.define("task-item", TaskItem);
window.customElements.define("swim-lane", SwimLane);

TaskBoardDataService.initilalizeState([]);

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

    listContainer.appendChild(swimLane);

    TaskBoardDataService.addSwimLane(swimLane.id);

    // swimLane.addEventListener("taskadd", (e) => {
    //     onTaskAdd(e);
    // });

    // swimLane.addEventListener("taskdrop", (e) => {
    //     onTaskDrop(e);
    // });

    // swimLane.addEventListener("taskdelete", (e) => {
    //     onTaskDelete(e);
    // });
}

// function onTaskAdd(e) {
//     if (e.detail.parent?.parentNode) {
//         let parentSwimLane = e.detail.parent.parentNode.host;
//         let task = e.detail.task;
//         TaskBoardDataService.addTask(parentSwimLane, task);
//     }
// }

// function onTaskDrop(e) {
//     let parentSwimLane = e.detail.parent.parentNode.host;
//     let dropZone = e.detail.dropZone;
//     let task = e.detail.task;
//     TaskBoardDataService.dropTask(parentSwimLane, dropZone, task);
// }

// function onTaskDelete(e) {
//     let parentSwimLane = e.detail.parent.parentNode.host;
//     let task = e.detail.task;
//     TaskBoardDataService.deleteTask(parentSwimLane, task);
// }
