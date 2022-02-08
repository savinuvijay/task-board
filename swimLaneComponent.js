const swimLaneTemplate = document.createElement("template");
swimLaneTemplate.innerHTML = `
    <link rel="stylesheet" href="swimLaneStyle.css" />
    <div class="swim-lane">
      <div class="swim-lane-title">
        <input class="title-input" hidden type="text" value="New"/>
        <button class="title-ok" hidden>ok</button>
        <span class="title-display" >New</span>
      </div>
      <div class=tasks></div>
      <button class="add-task-btn">New +</button>
    </div>
`;

export class SwimLane extends HTMLElement {
    constructor() {
        super();
        this.dropZone = null;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(swimLaneTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector(".add-task-btn")
            .addEventListener("click", () => this.addTask());
        this.shadowRoot
            .querySelector(".title-display")
            .addEventListener("click", (e) => {
                e.stopPropagation();
                let swimLaneTitle =
                    this.shadowRoot.querySelector(".swim-lane-title");
                console.log("swimLaneTitle", swimLaneTitle);
                let titleInput = swimLaneTitle.querySelector(".title-input");
                let titleOk = swimLaneTitle.querySelector(".title-ok");
                let titleDisplay =
                    swimLaneTitle.querySelector(".title-display");

                titleInput.hidden = false;
                titleOk.hidden = false;
                titleDisplay.hidden = true;
            });
        this.shadowRoot
            .querySelector(".title-ok")
            .addEventListener("click", (e) => {
                e.stopPropagation();
                let swimLaneTitle =
                    this.shadowRoot.querySelector(".swim-lane-title");
                console.log("swimLaneTitle", swimLaneTitle);
                let titleInput = swimLaneTitle.querySelector(".title-input");
                let titleOk = swimLaneTitle.querySelector(".title-ok");
                let titleDisplay =
                    swimLaneTitle.querySelector(".title-display");

                titleDisplay.innerHTML = titleInput.value;

                titleInput.hidden = true;
                titleOk.hidden = true;
                titleDisplay.hidden = false;
            });
        this.shadowRoot
            .querySelector(".swim-lane")
            .addEventListener("dragover", function (e) {
                e.stopPropagation();
                SwimLane.dropZone = e.target;
            });
        this.shadowRoot
            .querySelector(".swim-lane")
            .addEventListener("dragend", function (e) {
                e.stopPropagation();
                let dropZone = SwimLane.dropZone;
                let item = e.target;
                let oldItems = e.target.parentNode;
                if (dropZone.className === "swim-lane") {
                    let newItems = dropZone.querySelector(".tasks");
                    oldItems.removeChild(item);
                    newItems.appendChild(item);
                }
            });
    }

    addTask() {
        console.log("this.parentNode", this.parentNode);
        let tasks = this.shadowRoot.querySelector(".tasks");
        let taskItem = document.createElement("task-item");
        tasks.appendChild(taskItem);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector(".add-task-btn").removeEventListener();
        this.shadowRoot.querySelector(".swim-lane").removeEventListener();
    }
}
