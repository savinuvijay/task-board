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
    static state = [];
    static initilalizeState(state) {
        this.state = state;
    }
    static addSwimLane(id) {
        this.state.push({
            id: id,
            name: "New",
            tasks: [],
        });
        console.log("state: ", this.state);
    }

    static addTask(parentSwimLane, task) {
        let parentSwimLaneState = this.getSwimLaneStateById(parentSwimLane.id);

        parentSwimLaneState.tasks.push({
            id: task.id,
        });
        console.log("state: ", this.state);
    }

    static dropTask(parentSwimLane, dropZone, task) {
        let parentSwimLaneState = this.getSwimLaneStateById(parentSwimLane.id);
        let dropZoneState = this.getSwimLaneStateById(dropZone.id);

        let taskItem = parentSwimLaneState.tasks.find((t) => t.id === task.id);
        dropZoneState.tasks.push(taskItem);

        parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
            (t) => t.id !== task.id
        );
        console.log("state: ", this.state);
    }

    static deleteTask(parentSwimLane, task) {
        let parentSwimLaneState = this.getSwimLaneStateById(parentSwimLane.id);

        parentSwimLaneState.tasks = parentSwimLaneState.tasks.filter(
            (t) => t.id !== task.id
        );
        console.log("state: ", this.state);
    }

    static getSwimLaneStateById(id) {
        return this.state.find((s) => s.id === id);
    }
}
