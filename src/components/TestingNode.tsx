import { Handle, NodeProps, NodeResizer, Position } from "reactflow";
import { CustomNode } from "../data/CustomNode";

export function TestingNode({ data }: NodeProps<CustomNode>) {
  return (
    <>
      <NodeResizer minWidth={50} minHeight={50} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.description}</div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "space-evenly",
          left: 0,
        }}
      >
        <Handle
          style={{ position: "relative", left: 0, transform: "none" }}
          id="a"
          type="source"
          position={Position.Bottom}
        />
        <Handle
          style={{ position: "relative", left: 0, transform: "none" }}
          id="b"
          type="source"
          position={Position.Bottom}
        />
      </div>
    </>
  );
}
// https://reactflow.dev/examples/overview
