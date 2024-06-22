import { Avatar, Text } from "@mantine/core";
import { NodeProps } from "reactflow";
import { Bubble } from "../data/Bubble";

export const BubbleNode = ({ data }: NodeProps<Bubble>) => {
  return (
    <>
      <Avatar size={data.bubbleSize} color={data.color}>
        <Text fw={200} size="xs">
          {data?.title}
        </Text>
      </Avatar>
    </>
  );
};
