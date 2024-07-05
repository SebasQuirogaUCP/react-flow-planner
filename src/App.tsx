import { generateColorsMap } from "@mantine/colors-generator";
import {
  AppShell,
  Burger,
  Button,
  ColorInput,
  Divider,
  Group,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useDisclosure,
  useResizeObserver,
  useViewportSize,
} from "@mantine/hooks";
import { useEffect, useState } from "react";
import ReactFlow, {
  Connection,
  Edge,
  NodeTypes,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { BubbleNode } from "./components/nodes/BubbleNode";
import { RectangleNode } from "./components/nodes/RectangleNode";
import { TestingNode } from "./components/nodes/TestingNode";
import { Minutes } from "./data/Minutes";
import { BuildInitialNode, GenerateId } from "./services/utils";

const nodeTypes: NodeTypes = {
  bubble: BubbleNode,
  rectangle: RectangleNode,
  testing: TestingNode,
};

export function App() {
  const [refResizeObserver, resizeObserver] = useResizeObserver();

  const { width } = useViewportSize();

  const [nodes, setReactFlowNodes, onNodesChange] = useNodesState(
    BuildInitialNode()
  );

  const [edges, setReactFlowEdges, onEdgesChange] = useEdgesState([]);

  const [opened, { toggle }] = useDisclosure();

  const [swatches, setSwatches] =
    useState<ReturnType<typeof generateColorsMap>>();

  console.log("swatches: ", swatches);

  const form = useForm<{
    description: string;
    hours: string;
    minutes: string;
    color: string;
    type: "testing" | "rectangle" | "test";
  }>({
    initialValues: {
      color: "#90ee8f",
      description: "",
      hours: "0",
      minutes: "20",
      type: "rectangle",
    },
  });

  useEffect(() => {
    setSwatches(generateColorsMap(form.values["color"]));
  }, [form.values]);

  const onConnect = ({ source, target }: Connection) => {
    if (!source || !target) return;

    const edge: Edge = {
      id: `edge-${source}-to-${target}-${GenerateId()}`,
      source,
      target,
    };

    setReactFlowEdges([...edges, edge]);
  };

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
          <Text fw={400}>Tasks</Text>

          <Textarea
            label={"Description"}
            maxLength={50}
            required
            styles={{
              label: { fontSize: 13, fontWeight: 350 },
              input: { borderRadius: "10px" },
              section: { fontSize: "5px" },
            }}
            placeholder={"Max 50 characters"}
            {...form.getInputProps("description")}
          />

          <Group grow>
            <NativeSelect
              label="Hours"
              data={["0", "1", "2"]}
              styles={{
                label: { fontSize: 13, fontWeight: 350 },
                input: { borderRadius: "10px" },
              }}
              {...form.getInputProps("hours")}
            />
            <NativeSelect
              label="Minutes"
              data={Minutes}
              styles={{
                label: { fontSize: 13, fontWeight: 350 },
                input: { borderRadius: "10px" },
              }}
              {...form.getInputProps("minutes")}
            />
          </Group>

          <Divider my={"xs"} label="Customize Options" />

          <NativeSelect
            label="Node Type"
            data={["rectangle", "bubble", "test"]}
            styles={{
              label: { fontSize: 13, fontWeight: 350 },
              input: { borderRadius: "10px" },
            }}
            {...form.getInputProps("type")}
          />

          <Stack>
            <ColorInput
              label={"Node color"}
              styles={{
                label: { fontSize: 13, fontWeight: 350 },
                input: { borderRadius: "10px" },
                swatch: {
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70% ",
                },
                swatches: {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
              format="hex"
              swatchesPerRow={15}
              swatches={swatches?.colors.slice(0, 5)}
              {...form.getInputProps("color")}
            />
          </Stack>

          <Button
            variant="gradient"
            mt={"md"}
            styles={{
              label: { fontSize: 13 },
              root: { borderRadius: "10px" },
            }}
            onClick={() => {
              setReactFlowNodes([
                ...nodes,
                {
                  id: `node-${GenerateId()}`,
                  position: { x: 0, y: 0 },
                  data: {
                    id: "node-3",
                    color: form.values["color"],
                    description: form.values["description"],
                    pomodoroTime: `${form.values["hours"]}:${form.values["minutes"]}`,
                  },
                  type: form.values["type"],
                },
              ]);
            }}
          >
            Create Task
          </Button>
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
              nodeTypes={nodeTypes}
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
