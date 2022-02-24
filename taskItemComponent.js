const taskItemTemplate = document.createElement("template");
taskItemTemplate.innerHTML = `
    <link rel="stylesheet" href="taskItemStyle.css" />
    <div class="task-item" draggable="true">
        <div class="task-title">
            <input class="title-input" type="text" value="New"/>
            <button class="title-ok">ok</button>
            <span class="title-display" >New</span>
        </div>
        <textarea class="task-details"></textarea>
        <button class="delete-btn">Delete</button>
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
        this.titleOk = this.taskTitle.querySelector(".title-ok");
        this.titleDisplay = this.taskTitle.querySelector(".title-display");

        this.titleInput.style.display = "none";
        this.titleOk.style.display = "none";
        this.titleDisplay.style.display = "inline";

        this.deleteBtn = this.taskItem.querySelector(".delete-btn");

        this.taskDeleteEvent = new CustomEvent("taskdelete", {});
    }

    connectedCallback() {
        this.titleDisplay.addEventListener("click", (e) => this.editTitle(e));
        this.titleOk.addEventListener("click", (e) => this.saveTitle(e));
        this.deleteBtn.addEventListener("click", (e) => this.deleteTask(e));
    }

    deleteTask(e) {
        //console.log("this.parentNode", this.parentNode);
        this.parentNode.removeChild(this);
        // this.details.parent = this;
        // this.details.dropZone = null;
        // this.details.task = e;
        this.dispatchEvent(this.taskDeleteEvent);
    }

    editTitle(e) {
        e.stopPropagation();

        this.titleInput.style.display = "inline";
        this.titleOk.style.display = "inline";
        this.titleDisplay.style.display = "none";
    }

    saveTitle(e) {
        e.stopPropagation();

        this.titleDisplay.innerHTML = this.titleInput.value;

        this.titleInput.style.display = "none";
        this.titleOk.style.display = "none";
        this.titleDisplay.style.display = "inline";
    }

    disconnectedCallback() {
        //this.shadowRoot.querySelector(".delete-btn").removeEventListener();
    }
}
