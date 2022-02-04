const swimLaneTemplate = document.createElement("template");
swimLaneTemplate.innerHTML = `
    <link rel="stylesheet" href="swimLaneStyle.css" />
    <div class="swim-lane">
      <div class="swim-lane-title">
        <input class="swim-lane-title-input" hidden type="text" value="New"/>
        <button class="swim-lane-title-ok" hidden>ok</button>
        <span class="swim-lane-title-display" >New</span>
      </div>
      <div class=tasks></div>
      <button class="add-task-btn">New +</button>
    </div>
`;

export class SwimLane extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(swimLaneTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector(".add-task-btn")
            .addEventListener("click", () => this.addTask());
    }

    addTask() {
        console.log("this.parentNode", this.parentNode);
        //this.parentNode.removeChild(this);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector(".add-task-btn").removeEventListener();
    }
}
