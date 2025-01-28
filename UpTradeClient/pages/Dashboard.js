import { Container, Grid, SimpleGrid, Skeleton } from "@mantine/core";
import StartCard from "../components/StatCard";

export default function Dashboard() {
  const PRIMARY_COL_HEIGHT = "300px";
  const SECONDARY_COL_HEIGHT =
    "calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2";

  const loading = false;

  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Skeleton
          height={PRIMARY_COL_HEIGHT}
          radius="md"
          animate={false}
          visible={loading}
        >
          <StartCard title="Total Sales" value="$1,200" diff={-5} />
        </Skeleton>

        <Grid gutter="md">
          <Grid.Col>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
              visible={loading}
            >
              <StartCard title="Total Sales" value="$1,200" diff={-5} />
            </Skeleton>
          </Grid.Col>

          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
              visible={loading}
            >
              <StartCard title="Total Sales" value="$1,200" diff={-5} />
            </Skeleton>
          </Grid.Col>

          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
              visible={loading}
            >
              <StartCard title="Total Sales" value="$1,200" diff={-5} />
            </Skeleton>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </div>
  );
}
