import { ActionIcon, Card, Group, Indicator, Text } from "@mantine/core";
import { IconPlayerPlay, IconSettings, IconTrash } from "@tabler/icons-react";
import { Handle, NodeProps, Position } from "reactflow";
import { CustomNodeData } from "../../data/CustomNodeData";

export const RectangleNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <>
      <Indicator
        color="transparent"
        label={
          <>
            <IconSettings
              size={8}
              color="gray"
              onClick={() => alert("Settings")}
            />
            <IconTrash
              size={8}
              color="red"
              onClick={() => data.onRemoveNode(data)}
            />
          </>
        }
      >
        <Card p={6} onClick={() => data.onSelectNode(data)}>
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
      </Indicator>
    </>
  );
};
