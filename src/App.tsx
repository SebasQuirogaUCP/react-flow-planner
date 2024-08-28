import { AppShell, Burger } from "@mantine/core";
import {
  useDisclosure,
  useResizeObserver,
  useViewportSize,
} from "@mantine/hooks";
import { useCallback } from "react";
import ReactFlow, {
  type Node,
  Connection,
  Edge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { NodeCreationForm } from "./components/NodeCreationForm";
import { AppNodeTypes } from "./data/AppNodeTypes";
import { CustomNodeData } from "./data/CustomNodeData";
import { NodeForm } from "./data/NodeForm";
import { GenerateId } from "./services/utils";

export function App() {
  const [refResizeObserver, resizeObserver] = useResizeObserver();

  const { width } = useViewportSize();

  const [edges, setReactFlowEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setReactFlowNodes, onNodesChange] = useNodesState([]);

  const [opened, { toggle }] = useDisclosure();

  const onConnect = useCallback(
    ({ source, target }: Connection) => {
      if (!source || !target) return;

      const edge: Edge = {
        id: `edge-${source}-to-${target}-${GenerateId()}`,
        source,
        target,
      };

      setReactFlowEdges([...edges, edge]);
    },
    [edges, setReactFlowEdges]
  );

  const setNodes = useCallback(
    (nodes: Node<CustomNodeData, string | undefined>[]) => {
      setReactFlowNodes(nodes);
    },
    [setReactFlowNodes]
  );

  const onRemoveNode = useCallback(
    (customNode: CustomNodeData) => {
      console.info(customNode.id);
      console.info("beforeUpdate: ", nodes);
      const newNodes = nodes.filter((node) => node.id !== customNode.id);
      console.log("newNodes: ", newNodes);
      setNodes(newNodes);
    },

    [nodes, setNodes]
  );

  const handleCreateNode = useCallback(
    ({ description, hours, minutes, type }: NodeForm) => {
      const nodeId = `node-${GenerateId()}`;
      setNodes([
        ...nodes,
        {
          id: nodeId,
          position: { x: 0, y: 0 },
          data: {
            id: nodeId,
            description,
            pomodoroTime: `${hours}:${minutes}`,
            onSelectNode: (customNode: CustomNodeData) => {
              console.info(customNode);
            },
            onRemoveNode,
          },
          type,
        },
      ]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [nodes, onRemoveNode, setNodes]
  );
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>BeatTask Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md" ref={refResizeObserver}>
          <NodeCreationForm createNode={handleCreateNode} />
        </AppShell.Navbar>

        <AppShell.Main>
          <div
            style={{
              width: width - resizeObserver.width - 100,
              height: 800,
            }}
          >
            <ReactFlow
              nodes={nodes}
              nodeTypes={AppNodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              edges={edges}
              onConnect={onConnect}
            />
          </div>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
