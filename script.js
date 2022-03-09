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
    e.stopPropagation();
    let swimLane = document.createElement("swim-lane");
    swimLane.id = swimLaneIdCount++;
    state.push({
        id: swimLane.id,
        name: "New",
        tasks: [],
    });
    console.log(state);
    swimLane.addEventListener("taskdrop", (e) => {
        //console.log("listend to task drop event");
        //console.log(e.detail);
        let parentSwimLane = e.detail.parent.parentNode.host;
        let dropZone = e.detail.dropZone;
        let task = e.detail.task;
        //console.log("Parent", parentSwimLane, parentSwimLane.id);
        //console.log("dropZone", dropZone, dropZone.id);
        //console.log("task", task, task.id);
        let parentSwimLaneState = state.find((s) => s.id === parentSwimLane.id);
        let taskItem = parentSwimLaneState.tasks.find((t) => t.id === task.id);
        let dropZoneState = state.find((s) => s.id === dropZone.id);
        dropZoneState.tasks.push(taskItem);
        parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
            (t) => t.id !== task.id
        );
        console.log(state);
    });
    swimLane.addEventListener("taskadd", (e) => {
        //console.log("listend to task add event");
        //console.log(e.detail);
        if (e.detail.parent?.parentNode) {
            let parentSwimLane = e.detail.parent.parentNode.host;
            let task = e.detail.task;
            //console.log("Parent", parentSwimLane);
            //console.log("task", task);

            let parentSwimLaneState = state.find(
                (s) => s.id === parentSwimLane.id
            );
            parentSwimLaneState.tasks.push({
                id: task.id,
            });
        }
        console.log(state);
    });

    swimLane.addEventListener("taskdelete", (e) => {
        console.log("listend to task delete event");
        console.log(e.detail);
    });
    listContainer.appendChild(swimLane);
});
