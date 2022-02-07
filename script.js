import { TaskItem } from "./taskItemComponent.js";
import { SwimLane } from "./swimLaneComponent.js";

window.customElements.define("task-item", TaskItem);
window.customElements.define("swim-lane", SwimLane);

// let uniqueIdCount = 0;
// let lists1 = [
//     {
//         id: 0,
//         name: "New",
//         editing: true,
//         items: [
//             {
//                 id: 2,
//                 name: "Itme 1",
//                 desctiption: "abc",
//             },
//         ],
//     },
//     {
//         id: 1,
//         name: "Active",
//         editing: true,
//         items: [
//             {
//                 id: 3,
//                 name: "Itme 2",
//                 desctiption: "def",
//             },
//         ],
//     },
// ];

let dropZone = null;

let addListButton = document.querySelector(".add-list-btn");
let listContainer = document.querySelector(".lists");
addListButton.addEventListener("click", (e) => {
    console.log(e);
    let list = document.createElement("swim-lane");
    // let list = document.createElement("div");
    // list.className = "list";

    // let items = document.createElement("div");
    // items.className = "items";

    // let listTitle = getListTitle();

    // listTitle.addEventListener("click", (e) => {
    //     e.stopPropagation();
    //     let listTitleInput = listTitle.querySelector(".list-title-input");
    //     let listTitleOk = listTitle.querySelector(".list-title-ok");
    //     let listTitleDisplay = listTitle.querySelector(".list-title-display");
    //     console.log("e.target", e.target.className);
    //     if (listTitleInput.hidden) {
    //         console.log("editing");
    //         listTitleInput.hidden = false;
    //         listTitleOk.hidden = false;
    //         listTitleDisplay.hidden = true;
    //     } else {
    //         console.log("display");
    //         if (e.target.className !== "list-title-input") {
    //             listTitleInput.hidden = true;
    //             listTitleOk.hidden = true;
    //             console.log(listTitleInput.value);
    //             listTitleDisplay.hidden = false;
    //             listTitleDisplay.innerHTML = listTitleInput.value;
    //             console.log(listTitleDisplay.innerHTML);
    //         }
    //     }
    // });

    // let addItemBtn = document.createElement("button");
    // addItemBtn.className = "add-item-btn";
    // addItemBtn.innerHTML = "New +";

    // addItemBtn.addEventListener("click", (e) => {
    //     console.log(e);
    //     let item = document.createElement("task-item");
    //     // item.className = "list-item";
    //     // item.draggable = true;
    //     // let deleteBtn = document.createElement("button");
    //     // deleteBtn.className = "delete-btn";
    //     // deleteBtn.innerHTML = "Delete -";
    //     // deleteBtn.addEventListener("click", (e) => {
    //     //     console.log(e.path[1]);
    //     //     items.removeChild(e.path[1]);
    //     // });
    //     // item.appendChild(deleteBtn);
    //     items.appendChild(item);
    // });

    // list.appendChild(listTitle);
    // list.appendChild(items);
    // list.appendChild(addItemBtn);
    let swimLane = list.shadowRoot.querySelector(".swim-lane");

    swimLane.addEventListener("dragover", function (e) {
        e.stopPropagation();
        // console.log(e, this);
        dropZone = e.target;
        if (e.target.shadowRoot) {
            //dropZone = e.target.shadowRoot.querySelector(".swim-lane");
        }
    });

    swimLane.addEventListener("dragend", function (e) {
        e.stopPropagation();
        // let DragParent = e.target.shadowRoot.querySelector(".swim-lane");
        // console.log("DragParent", DragParent);
        let item = e.target;
        // console.log("item", e.target);
        // console.log("dropZone", dropZone);
        // console.log("e.target.parentNode", e.target.parentNode);
        let oldItems = e.target.parentNode;
        if (dropZone.className === "swim-lane") {
            let newItems = dropZone.querySelector(".tasks");
            console.log(newItems);
            oldItems.removeChild(item);
            console.log(oldItems);
            newItems.appendChild(item);
        }
    });

    listContainer.appendChild(list);
    //console.log(this);
});

function getListTitle() {
    let listTitle = document.createElement("div");
    listTitle.className = "list-title";

    let listTitleInput = document.createElement("input");
    listTitleInput.className = "list-title-input";
    listTitleInput.type = "text";
    listTitleInput.value = "untitled";

    let listTitleOk = document.createElement("button");
    listTitleOk.className = "list-title-ok";
    listTitleOk.innerHTML = "Ok";

    let listTitleDisplay = document.createElement("span");
    listTitleDisplay.className = "list-title-display";
    listTitleDisplay.innerHTML = "";
    listTitleDisplay.hidden = true;

    listTitle.appendChild(listTitleInput);
    listTitle.appendChild(listTitleOk);
    listTitle.appendChild(listTitleDisplay);

    return listTitle;
}

// let listTitles = document.querySelectorAll(".list-title");

// let lists = document.querySelectorAll(".list");
// lists.forEach((list) => {
//     let addItemBtn = list.querySelector(".add-item-btn");
//     let items = list.querySelector(".items");
//     console.log(addItemBtn);
//     addItemBtn.addEventListener("click", (e) => {
//         console.log(e);
//         let item = document.createElement("div");
//         item.className = "list-item";
//         item.draggable = true;
//         let deleteBtn = document.createElement("button");
//         deleteBtn.className = "delete-btn";
//         deleteBtn.innerHTML = "Delete -";
//         deleteBtn.addEventListener("click", (e) => {
//             console.log(e.path[1]);
//             items.removeChild(e.path[1]);
//         });
//         item.appendChild(deleteBtn);
//         items.appendChild(item);
//     });
// });

// listTitles.forEach((listTitle) => {
//     let titleInput = listTitle.querySelector(".list-title-input");
//     let titleDisplay = listTitle.querySelector(".list-title-display");
//     let titleOk = listTitle.querySelector(".list-title-ok");
//     listTitle.addEventListener("click", (e) => {
//         e.stopPropagation();
//         console.log("e.target", e.target.className);
//         if (titleInput.hidden) {
//             console.log("editing");
//             titleInput.hidden = false;
//             titleOk.hidden = false;
//             titleDisplay.hidden = true;
//         } else {
//             console.log("display");
//             if (e.target.className !== "list-title-input") {
//                 titleInput.hidden = true;
//                 titleOk.hidden = true;
//                 console.log(titleInput.value);
//                 titleDisplay.hidden = false;
//                 titleDisplay.innerHTML = titleInput.value;
//                 console.log(titleDisplay.innerHTML);
//             }
//         }
//         //console.log("e.editing", e.editing);
//     });
// });
