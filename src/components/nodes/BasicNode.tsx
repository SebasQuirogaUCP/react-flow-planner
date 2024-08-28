import { ActionIcon } from "@mantine/core";
import { Icon123, IconPlayerPlay, IconTrash } from "@tabler/icons-react";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";
import { CustomNodeData } from "../../data/CustomNodeData";

export const BasicNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <>
      <NodeToolbar isVisible align="start">
        <ActionIcon size={"xs"} variant="subtle">
          <IconPlayerPlay />
        </ActionIcon>
        <ActionIcon size={"xs"} variant="subtle">
          <IconTrash />
        </ActionIcon>
        <ActionIcon size={"xs"} variant="subtle">
          <Icon123 />
        </ActionIcon>
      </NodeToolbar>
      <div
        style={{
          // background: "linear-gradient(135deg, #ff99cc, #99ccff)",
          background: "linear-gradient(135deg, #40c057bd, #228be69e)",
          borderRadius: "8px",
          padding: "10px",
          fontFamily: "Arial, sans-serif",
          color: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          minWidth: "150px",
          // border: "1px solid black",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1px",
            left: "1px",
            right: "1px",
            bottom: "1px",
            borderRadius: "7px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            pointerEvents: "none",
          }}
        />
        <Handle type="target" position={Position.Top} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            {data.description}
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
};

// https://reactflow.dev/examples/overview
