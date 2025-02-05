import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
} from "@tabler/icons-react";

import { Group, Paper, Text } from "@mantine/core";

import classes from "../styles/StatCard.module.css";

// Need props: title, value, diff
export default function StartCard(props) {
  const DiffIcon = props.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

  return (
    <Paper shadow="md" radius="md" withBorder p="lg" key={props.title}>
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {props.title}
        </Text>
        <IconCoin className={classes.icon} size={22} stroke={1.5} />
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text className={classes.value}>{props.value}</Text>
        <Text
          c={props.diff > 0 ? "teal" : "red"}
          fz="sm"
          fw={500}
          className={classes.diff}
        >
          <span>{props.diff}%</span>
          <DiffIcon size={16} stroke={1.5} />
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Paper>
  );
}
