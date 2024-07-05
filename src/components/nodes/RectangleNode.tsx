import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { Handle, NodeProps, Position } from "reactflow";
import { CustomNode } from "../../data/CustomNode";

export const RectangleNode = ({ data }: NodeProps<CustomNode>) => {
  return (
    <>
      <Card
        styles={{
          root: { borderRadius: "5px", backgroundColor: data.color },
        }}
        p={6}
      >
        <Text fw={200} styles={{ root: { fontSize: 15 } }}>
          {data.description}
        </Text>

        <Group grow justify="flex-end">
          <Text fw={200} styles={{ root: { fontSize: 8 } }}>
            {data.pomodoroTime}
          </Text>
          {data.id !== "root" && (
            <ActionIcon variant="gradient" size={8} color="green">
              <IconPlayerPlay size={8} />
            </ActionIcon>
          )}
        </Group>
      </Card>

      {data.id !== "root" && <Handle position={Position.Top} type="target" />}

      <Handle position={Position.Bottom} type="source" />
    </>
  );
};
