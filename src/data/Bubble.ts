import { MantineColor, MantineSize } from "@mantine/core";
import { Entity } from "./Entity";

export type Bubble = Entity & {
    title: string,
    id: string,
    color: MantineColor | string
    bubbleSize: MantineSize | number
}