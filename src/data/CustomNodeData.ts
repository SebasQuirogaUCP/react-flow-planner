import { Entity } from "./Entity";

export type CustomNodeData = Entity & {
    description: string,
    pomodoroTime: string;
    completed?: boolean,
    onSelectNode: (customNode: CustomNodeData) => void
    onRemoveNode: (customNode: CustomNodeData) => void

}