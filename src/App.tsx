import { Title } from "@mantine/core";
import { Fragment } from "react";
import ReactFlow, { NodeTypes, useNodesState, type Node } from "reactflow";
import "reactflow/dist/style.css";
import { BubbleNode } from "./components/BubbleNode";
import { RectangleNode } from "./components/RectangleNode";
import { Bubble } from "./data/Bubble";
import { Rectangle } from "./data/Rectangle";

const nodeTypes: NodeTypes = {
  bubbleNode: BubbleNode,
  rectangleNode: RectangleNode,
};

const initialNodes: Node<Bubble | Rectangle>[] = [
  {
    id: "node-1",
    position: { x: 10, y: 10 },
    data: { id: "123", title: "2024", color: "yellow", bubbleSize: "md" },
    type: "bubbleNode",
  },
  {
    id: "node-2",
    position: { x: 0, y: 0 },
    data: {
      id: "124",
      title: "My Year Purposes",
      radius: 10,
      color: "lightblue",
    },
    type: "rectangleNode",
  },
];

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setReactFlowNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <Fragment>
      <Title>Activity Planner</Title>
      <div style={{ width: 1000, height: 800 }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          fitView
        />
      </div>
    </Fragment>
  );
}
