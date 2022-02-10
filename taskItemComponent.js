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
    }

    connectedCallback() {
        this.deleteBtn.addEventListener("click", () => this.deleteTask());
    }

    deleteTask() {
        //console.log("this.parentNode", this.parentNode);
        this.parentNode.removeChild(this);
    }

    disconnectedCallback() {
        //this.shadowRoot.querySelector(".delete-btn").removeEventListener();
    }
}
