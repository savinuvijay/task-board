import { TaskItem } from "./taskItemComponent.js";
import { SwimLane } from "./swimLaneComponent.js";

window.customElements.define("task-item", TaskItem);
window.customElements.define("swim-lane", SwimLane);

let swimLaneIdCount = 0;
let state = [];
// let lists1 = [
//     {
//         id: 0,
//         name: "New",
//         editing: true,
//         items: [
//             {
//                 id: 2,
//                 name: "Itme 1",
//                 desctiption: "abc",
//             },
//         ],
//     },
//     {
//         id: 1,
//         name: "Active",
//         editing: true,
//         items: [
//             {
//                 id: 3,
//                 name: "Itme 2",
//                 desctiption: "def",
//             },
//         ],
//     },
// ];

let addSwimLaneButton = document.querySelector(".add-swim-lane-btn");
let listContainer = document.querySelector(".swim-lanes");
addSwimLaneButton.addEventListener("click", (e) => {
    addSwimLane(e);
});

function addSwimLane(e) {
    e.stopPropagation();
    let swimLane = document.createElement("swim-lane");
    swimLane.id = swimLaneIdCount++;
    state.push({
        id: swimLane.id,
        name: "New",
        tasks: [],
    });

    console.log(state);
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
        let parentSwimLane = e.detail.parent.parentNode.host;
        let task = e.detail.task;
        let parentSwimLaneState = state.find((s) => s.id === parentSwimLane.id);
        parentSwimLaneState.tasks.push({
            id: task.id,
        });
    }
    console.log(state);
}

function onTaskDrop(e) {
    let parentSwimLane = e.detail.parent.parentNode.host;
    let dropZone = e.detail.dropZone;
    let task = e.detail.task;
    let parentSwimLaneState = state.find((s) => s.id === parentSwimLane.id);
    let taskItem = parentSwimLaneState.tasks.find((t) => t.id === task.id);
    let dropZoneState = state.find((s) => s.id === dropZone.id);
    dropZoneState.tasks.push(taskItem);
    parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
        (t) => t.id !== task.id
    );
    console.log(state);
}

function onTaskDelete(e) {
    let parentSwimLane = e.detail.parent.parentNode.host;
    let task = e.detail.task;
    let parentSwimLaneState = state.find((s) => s.id === parentSwimLane.id);
    parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
        (t) => t.id !== task.id
    );
    console.log(state);
}
