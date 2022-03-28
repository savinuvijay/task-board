import { TaskItem } from "./components/taskItemComponent/taskItemComponent.js";
import { SwimLane } from "./components/swimLaneComponent/swimLaneComponent.js";
import { TaskBoardDataService } from "./services/taskBoardDataService.js";

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
}
