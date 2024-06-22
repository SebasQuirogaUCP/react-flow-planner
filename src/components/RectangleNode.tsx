import { Card } from "@mantine/core";
import { NodeProps } from "reactflow";
import { Rectangle } from "../data/Rectangle";

export const RectangleNode = ({ data }: NodeProps<Rectangle>) => {
  return (
    <>
      <Card
        styles={{
          root: { borderRadius: data.radius, backgroundColor: data.color },
        }}
      >
        {data.title}
      </Card>
    </>
  );
};
