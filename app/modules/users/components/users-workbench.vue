<template>
  <div class="grid gap-5 lg:grid-cols-2">
    <UCard>
      <template #header>
        <h3 class="font-semibold">TanStack Table</h3>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <th
                v-for="header in headerGroup.headers"
                :key="header.id"
                class="border-b border-(--ui-border) px-2 py-2 text-left"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in table.getRowModel().rows" :key="row.id">
              <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="border-b border-(--ui-border) px-2 py-2"
              >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="font-semibold">ECharts</h3>
      </template>

      <ClientOnly>
        <div ref="chartContainer" class="h-72 w-full">
          <VChart v-if="chartReady" class="h-full w-full" :option="chartOption" autoresize />
        </div>
      </ClientOnly>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="font-semibold">Tiptap</h3>
      </template>

      <div class="space-y-3">
        <div class="flex gap-2">
          <UButton size="xs" variant="outline" @click="editor?.chain().focus().toggleBold().run()">
            Bold
          </UButton>
          <UButton size="xs" variant="outline" @click="editor?.chain().focus().toggleItalic().run()">
            Italic
          </UButton>
        </div>
        <EditorContent
          :editor="editor"
          class="min-h-28 rounded-md border border-(--ui-border) px-3 py-2"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="font-semibold">Vue Draggable Plus + VueUse</h3>
      </template>

      <div class="mb-3 text-xs text-(--ui-text-muted)">
        {{ nowLabel }}
      </div>

      <VueDraggable v-model="draggableUsers" class="space-y-2">
        <div
          v-for="user in draggableUsers"
          :key="user.id"
          class="drag-item cursor-grab rounded-md border border-(--ui-border) px-3 py-2 active:cursor-grabbing"
        >
          {{ user.name }} — {{ user.role }}
        </div>
      </VueDraggable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useElementSize, useNow } from "@vueuse/core";
import { FlexRender, createColumnHelper, getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import type { EChartsOption } from "echarts";
import { BarChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { use } from "echarts/core";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { VueDraggable } from "vue-draggable-plus";
import VChart from "vue-echarts";
import { formatDate } from "~/core/utils/date.util";
import type { User } from "../types";

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const props = defineProps<{
  users: User[];
}>();

const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
  }),
];

const table = useVueTable({
  get data() {
    return props.users;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});

const chartOption = computed<EChartsOption>(() => {
  const roleTotals = props.users.reduce(
    (acc, user) => {
      acc[user.role] += 1;
      return acc;
    },
    { admin: 0, member: 0 },
  );

  return {
    tooltip: { trigger: "axis" },
    legend: { show: true },
    xAxis: {
      type: "category",
      data: ["admin", "member"],
    },
    yAxis: { type: "value", minInterval: 1 },
    series: [
      {
        type: "bar",
        name: "Users",
        data: [roleTotals.admin, roleTotals.member],
      },
    ],
  };
});

const chartContainer = ref<HTMLElement | null>(null);
const { width: chartWidth, height: chartHeight } = useElementSize(chartContainer);
const chartReady = computed(() => chartWidth.value > 0 && chartHeight.value > 0);

const editor = useEditor({
  extensions: [StarterKit],
  content: "<p>Use este editor para notas rápidas da equipe.</p>",
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

const draggableUsers = ref<User[]>([...props.users]);
watch(
  () => props.users,
  (nextUsers) => {
    draggableUsers.value = [...nextUsers];
  },
  { deep: true },
);

const now = useNow({ interval: 1000 });
const nowLabel = computed(() => `Atualizado: ${formatDate(now.value, "DD/MM/YYYY HH:mm:ss")}`);
</script>
