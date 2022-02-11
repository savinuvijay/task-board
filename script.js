import { TaskItem } from "./taskItemComponent.js";
import { SwimLane } from "./swimLaneComponent.js";

window.customElements.define("task-item", TaskItem);
window.customElements.define("swim-lane", SwimLane);

// let uniqueIdCount = 0;
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

let addListButton = document.querySelector(".add-swim-lane-btn");
let listContainer = document.querySelector(".swim-lanes");
addListButton.addEventListener("click", (e) => {
    e.stopPropagation();
    let list = document.createElement("swim-lane");
    list.addEventListener("taskdrop", function (e) {
        console.log("listend to task drop event");
        console.log(e.detail);
    });
    list.addEventListener("taskadd", function (e) {
        console.log("listend to task add event");
        console.log(e.detail);
    });
    listContainer.appendChild(list);
});
