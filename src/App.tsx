import {
  AppShell,
  Burger,
  Button,
  ColorInput,
  Divider,
  Group,
  NativeSelect,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import ReactFlow, { NodeTypes, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { BubbleNode } from "./components/BubbleNode";
import { RectangleNode } from "./components/RectangleNode";
import { TestingNode } from "./components/TestingNode";
import { Minutes } from "./data/Minutes";
import { BuildInitialNode } from "./services/utils";

const nodeTypes: NodeTypes = {
  bubble: BubbleNode,
  rectangle: RectangleNode,
  testing: TestingNode,
};

export function App() {
  const [nodes, setReactFlowNodes, onNodesChange] = useNodesState(
    BuildInitialNode()
  );

  const [opened, { toggle }] = useDisclosure();

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

        <AppShell.Navbar p="md">
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

          <ColorInput
            label={"Node color"}
            styles={{
              label: { fontSize: 13, fontWeight: 350 },
              input: { borderRadius: "10px" },
            }}
            {...form.getInputProps("color")}
          />

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
                  id: "node-3",
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
          <div style={{ width: 1000, height: 800 }}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              fitView
            />
          </div>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
