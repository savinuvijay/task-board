import { TaskItem } from "./taskItemComponent.js";
import { SwimLane } from "./swimLaneComponent.js";

window.customElements.define("task-item", TaskItem);
window.customElements.define("swim-lane", SwimLane);

let swimLaneIdCount = 0;
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
    swimLane.addEventListener("taskdrop", function (e) {
        console.log("listend to task drop event");
        console.log(e.detail);
        console.log("Parent", e.detail.parent.parentNode.host);
        console.log("dropZone", e.detail.dropZone.parentNode.host);
        console.log("task", e.detail.task);
    });
    swimLane.addEventListener("taskadd", function (e) {
        console.log("listend to task add event");
        console.log(e.detail);
        console.log("Parent", e.detail.parent.parentNode.host);
        //console.log("dropZone", e.detail.dropZone.parentNode.host);
        console.log("task", e.detail.task);
    });
    listContainer.appendChild(swimLane);
});
