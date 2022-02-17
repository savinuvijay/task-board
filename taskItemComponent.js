const taskItemTemplate = document.createElement("template");
taskItemTemplate.innerHTML = `
    <link rel="stylesheet" href="taskItemStyle.css" />
    <div class="task-item" draggable="true">
        <button class="delete-btn">Delete -</button>
    </div>
`;

export class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(taskItemTemplate.content.cloneNode(true));
        this.deleteBtn = this.shadowRoot.querySelector(".delete-btn");

        this.taskDeleteEvent = new CustomEvent("taskdelete", {});
    }

    connectedCallback() {
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

    disconnectedCallback() {
        //this.shadowRoot.querySelector(".delete-btn").removeEventListener();
    }
}
