const swimLaneTemplate = document.createElement("template");
swimLaneTemplate.innerHTML = `
    <link rel="stylesheet" href="swimLaneStyle.css" />
    <div class="swim-lane-container">
      <div class="swim-lane-title">
        <input class="title-input" hidden type="text" value="New"/>
        <button class="title-ok" hidden>ok</button>
        <span class="title-display" >New</span>
      </div>
      <div class=tasks></div>
      <button class="add-task-btn">+</button>
    </div>
`;

export class SwimLane extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(swimLaneTemplate.content.cloneNode(true));

        this.swimLane = this.shadowRoot.querySelector(".swim-lane-container");

        this.swimLaneTitle = this.swimLane.querySelector(".swim-lane-title");
        this.titleInput = this.swimLaneTitle.querySelector(".title-input");
        this.titleOk = this.swimLaneTitle.querySelector(".title-ok");
        this.titleDisplay = this.swimLaneTitle.querySelector(".title-display");

        this.tasks = this.swimLane.querySelector(".tasks");
        this.addTaskBtn = this.swimLane.querySelector(".add-task-btn");

        this.details = { parent: null, dropZone: null, task: null };

        this.taskDropEvent = new CustomEvent("taskdrop", {
            detail: this.details,
        });

        this.taskAddEvent = new CustomEvent("taskadd", {
            detail: this.details,
        });

        this.taskDeleteEvent = new CustomEvent("taskdelete", {
            detail: this.details,
        });
    }

    connectedCallback() {
        this.addTaskBtn.addEventListener("click", (e) => this.addTask(e));
        this.titleDisplay.addEventListener("click", (e) => this.editTitle(e));
        this.titleOk.addEventListener("click", (e) => this.saveTitle(e));
        this.swimLane.addEventListener("dragover", (e) => this.setDropZone(e));
        this.swimLane.addEventListener("dragend", (e) => this.dropTask(e));
    }

    addTask(e) {
        e.stopPropagation();
        let taskItem = document.createElement("task-item");

        SwimLane.taskIdCount = SwimLane.taskIdCount ?? 0;
        taskItem.id = SwimLane.taskIdCount++;

        this.tasks.appendChild(taskItem);
        this.details.parent = this.tasks.parentNode;
        this.details.dropZone = null;
        this.details.task = taskItem;
        this.dispatchEvent(this.taskAddEvent);

        taskItem.addEventListener("taskdelete", (e) => {
            this.details = e.detail;
            this.dispatchEvent(this.taskDeleteEvent);
        });
    }

    editTitle(e) {
        e.stopPropagation();

        this.titleInput.hidden = false;
        this.titleOk.hidden = false;
        this.titleDisplay.hidden = true;
    }

    saveTitle(e) {
        e.stopPropagation();

        this.titleDisplay.innerHTML = this.titleInput.value;

        this.titleInput.hidden = true;
        this.titleOk.hidden = true;
        this.titleDisplay.hidden = false;
    }

    setDropZone(e) {
        e.stopPropagation();
        SwimLane.dropZone = e.target;
        //console.log(e.target.parentNode.host);
    }

    dropTask(e) {
        e.stopPropagation();
        let dropZone = SwimLane.dropZone;
        let task = e.target;
        let parentTasks = e.target.parentNode;
        //this.details.parent = parentTasks.parentNode;
        this.details.dropZone = dropZone;
        this.details.task = task;
        if (dropZone.className === "swim-lane-container") {
            let dropZoneTasks = dropZone.querySelector(".tasks");
            parentTasks.removeChild(task);
            dropZoneTasks.appendChild(task);
            this.dispatchEvent(this.taskDropEvent);
        }
    }

    disconnectedCallback() {
        this.addTaskBtn.removeEventListener();
        this.titleDisplay.removeEventListener();
        this.titleOk.removeEventListener();
        this.swimLane.removeEventListener();
        this.swimLane.removeEventListener();
    }
}
