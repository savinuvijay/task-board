import { TaskBoardDataService } from "../../services/taskBoardDataService.js";

const taskItemTemplate = document.createElement("template");
taskItemTemplate.innerHTML = `
    <style>
        @import url( './components/taskItemComponent/taskItemStyle.css' )
    </style>
    <div class="task-item" draggable="true">
        <div class="task-title">
            <input class="title-input" type="text" value="New"/>
            <span class="title-display" >New</span>
            <div class="delete-btn">X</div>
        </div>
        <textarea class="task-details"></textarea>
    </div>
    `;

export class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(taskItemTemplate.content.cloneNode(true));

        this.taskItem = this.shadowRoot.querySelector(".task-item");

        this.taskTitle = this.taskItem.querySelector(".task-title");
        this.titleInput = this.taskTitle.querySelector(".title-input");
        this.titleDisplay = this.taskTitle.querySelector(".title-display");

        this.titleInput.style.display = "none";
        this.titleDisplay.style.display = "inline";

        this.deleteBtn = this.taskItem.querySelector(".delete-btn");

        this.editingTitle = false;
        this.mouseDownEl = null;
    }

    connectedCallback() {
        this.taskItem.addEventListener("mousedown", (e) => this.taskClicked(e));
        this.taskItem.addEventListener("dragstart", (e) => this.taskDragged(e));
        this.titleDisplay.addEventListener("click", (e) => this.editTitle(e));
        this.deleteBtn.addEventListener("click", (e) => this.deleteTask(e));
    }

    deleteTask(e) {
        e.stopPropagation();
        let task = this;
        if (task.parentNode) {
            let parentSwimLane = task.parentNode.parentNode.parentNode.host;
            TaskBoardDataService.deleteTask(parentSwimLane, task);
            task.parentNode.removeChild(task);
        }
    }

    //#region Rename Task

    taskClicked(e) {
        this.mouseDownEl = e.target;
        if (!this.mouseDownEl.matches(".title-input") && this.editingTitle) {
            this.saveTitle(e);
        }
    }

    taskDragged(e) {
        if (!this.mouseDownEl.matches(".task-title")) {
            e.preventDefault();
        }
    }

    editTitle(e) {
        e.stopPropagation();
        this.editingTitle = true;
        this.titleInput.style.display = "inline";
        this.titleDisplay.style.display = "none";
    }

    saveTitle(e) {
        e.stopPropagation();
        this.editingTitle = false;
        this.titleDisplay.innerHTML = this.titleInput.value;

        this.titleInput.style.display = "none";
        this.titleDisplay.style.display = "inline";
    }

    //#endregion Rename Task

    disconnectedCallback() {
        //console.log("disconnectedCallback", this.shadowRoot);
    }
}
