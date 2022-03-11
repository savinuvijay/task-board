// let state = [
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

export class TaskBoardDataService {
    constructor(state) {
        this.state = state;
    }
    addSwimLane(id) {
        this.state.push({
            id: id,
            name: "New",
            tasks: [],
        });
        console.log("state: ", this.state);
    }

    addTask(parentSwimLane, task) {
        let parentSwimLaneState = this.state.find(
            (s) => s.id === parentSwimLane.id
        );
        parentSwimLaneState.tasks.push({
            id: task.id,
        });
        console.log("state: ", this.state);
    }

    dropTask(parentSwimLane, dropZone, task) {
        let parentSwimLaneState = this.state.find(
            (s) => s.id === parentSwimLane.id
        );
        let taskItem = parentSwimLaneState.tasks.find((t) => t.id === task.id);
        let dropZoneState = this.state.find((s) => s.id === dropZone.id);
        dropZoneState.tasks.push(taskItem);
        parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
            (t) => t.id !== task.id
        );
        console.log("state: ", this.state);
    }

    deleteTask(parentSwimLane, task) {
        let parentSwimLaneState = this.state.find(
            (s) => s.id === parentSwimLane.id
        );
        parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
            (t) => t.id !== task.id
        );
        console.log("state: ", this.state);
    }
}
