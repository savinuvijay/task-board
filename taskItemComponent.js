const taskItemTemplate = document.createElement("template");
taskItemTemplate.innerHTML = `
    <link rel="stylesheet" href="taskItemStyle.css" />
    <script src="https://kit.fontawesome.com/f0cb7bd73f.js" crossorigin="anonymous"></script>
    <div class="task-item" draggable="true">
        <div class="task-title" style="background: white;">
            <input class="title-input" type="text" value="New"/>
            <span class="title-display" >New</span>
            <div class="delete-btn">X</div>
        </div>
        <textarea class="task-details"></textarea>
        <!--<button class="delete-btn">Delete</button>-->
    </div>
`;

export class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.editingTitle = false;
        this.shadowRoot.appendChild(taskItemTemplate.content.cloneNode(true));

        this.taskItem = this.shadowRoot.querySelector(".task-item");

        this.taskTitle = this.taskItem.querySelector(".task-title");
        this.titleInput = this.taskTitle.querySelector(".title-input");
        this.titleDisplay = this.taskTitle.querySelector(".title-display");

        this.titleInput.style.display = "none";
        this.titleDisplay.style.display = "inline";

        this.deleteBtn = this.taskItem.querySelector(".delete-btn");

        this.taskDeleteEvent = new CustomEvent("taskdelete", {});
    }

    connectedCallback() {
        let mouseDownEl;

        this.taskItem.onmousedown = (evt) => {
            mouseDownEl = evt.target;
            console.log("click", mouseDownEl);
            if (!mouseDownEl.matches(".title-input") && this.editingTitle) {
                this.saveTitle(evt);
            }
        };

        this.taskItem.ondragstart = (evt) => {
            if (!mouseDownEl.matches(".task-title")) {
                evt.preventDefault();
            }
        };

        this.titleDisplay.addEventListener("click", (e) => this.editTitle(e));
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

    disconnectedCallback() {
        //this.shadowRoot.querySelector(".delete-btn").removeEventListener();
    }
}
