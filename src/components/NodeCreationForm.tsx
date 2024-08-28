import { Button, Group, NativeSelect, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Minutes } from "../data/Minutes";
import { NodeForm } from "../data/NodeForm";

type Props = {
  createNode: ({ description, hours, minutes, type }: NodeForm) => void;
};

export const NodeCreationForm = ({ createNode }: Props) => {
  const form = useForm<NodeForm>({
    initialValues: {
      description: "",
      hours: "0",
      minutes: "20",
      type: "basicNode",
    },
  });

  return (
    <>
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

      <Button
        variant="gradient"
        gradient={{
          from: "blue",
          to: "green",
          deg: 90,
        }}
        mt={"md"}
        styles={{
          label: { fontSize: 13 },
          root: { borderRadius: "10px" },
        }}
        onClick={() => createNode({ ...form.values })}
      >
        Create Node
      </Button>
    </>
  );
};
