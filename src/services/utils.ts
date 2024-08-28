import { customAlphabet } from "nanoid";
import { type Node } from "reactflow";
import { CustomNodeData } from "../data/CustomNodeData";

export const FromIntegerDayToDay = (integerDay: number) => {
    switch (integerDay) {
        case 0: {
            return "Sunday";
        }
        case 1: {
            return "Monday";
        }
        case 2: {
            return "Tuesday";
        }
        case 3: {
            return "Wednesday";
        }
        case 4: {
            return "Thursday";
        }
        case 5: {
            return "Friday";
        }
        case 6: {
            return "Saturday";
        }
        case 7: {
            return "Sunday";
        }
        default: {
            return "";
        }
    }
};

export const BuildInitialNode = () => {
    const initialNode: Node<CustomNodeData>[] = [
        {
            id: "root",
            position: { x: 600, y: 0 },
            data: {
                id: "root",
                description: FromIntegerDayToDay(new Date().getDay()),
                color: "lightgreen",
                completed: false,
                pomodoroTime: "",
            },
            type: "rectangle",
        },
    ];

    return initialNode;
};

export const GenerateId = (): string => {
    const nanoId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)
    return nanoId()
}