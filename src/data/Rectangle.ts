import { MantineColor } from "@mantine/core"
import { Entity } from "./Entity"

export type Rectangle = Entity & {
    radius: number,
    title: string,
    color: MantineColor | string
}