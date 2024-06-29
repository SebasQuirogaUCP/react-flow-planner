import { MantineColor } from "@mantine/core";
import { Entity } from "./Entity";

export type CustomNode = Entity & {
    description: string,
    pomodoroTime: string;
    color: MantineColor | string
    completed?: boolean,
}