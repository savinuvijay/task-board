const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="taskItemStyle.css" />
    <div class="task-item" draggable="true">
        <button class="delete-btn">Delete -</button>
    </div>
`;

export class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector(".delete-btn")
            .addEventListener("click", () => this.deleteTask());
    }

    deleteTask() {
        console.log("this.parentNode", this.parentNode);
        this.parentNode.removeChild(this);
    }

    disconnectedCallback() {
        //this.shadowRoot.querySelector(".delete-btn").removeEventListener();
    }
}
