import { Avatar, Text } from "@mantine/core";
import { NodeProps } from "reactflow";
import { CustomNode } from "../data/CustomNode";

export const BubbleNode = ({ data }: NodeProps<CustomNode>) => {
  return (
    <>
      <Avatar size={"lg"} color={data.color}>
        <Text fw={200} size="xs">
          {data.description}
        </Text>
      </Avatar>
    </>
  );
};
