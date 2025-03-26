<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type SortingState,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type FilterFn,
  } from '@tanstack/table-core';
  import * as Table from '$lib/components/ui/table';
  import { createSvelteTable } from '$lib/components/ui/data-table';
  import * as DataTable from '$lib/components/datatable/index';
  import { rankItem } from '@tanstack/match-sorter-utils';
  import Button from '$lib/components/ui/button/button.svelte';
  import { getCreateTeamToggle } from '../+page.svelte';
    import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  };

  let { columns, data }: DataTableProps<TData, TValue> = $props();
  let sorting = $state<SortingState>([]);
  let globalFilter = $state('');
  const fuzzyFilter: FilterFn<TData> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({ itemRank });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    // @ts-expect-error Custom filter function.
    globalFilterFn: 'fuzzy',
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onGlobalFilterChange: (updater) => {
      if (typeof updater === 'function') {
        globalFilter = updater(globalFilter);
      } else {
        globalFilter = updater;
      }
    },
    state: {
      get globalFilter() {
        return globalFilter;
      },
      get sorting() {
        return sorting;
      },
    },
  });
  let toggle = getCreateTeamToggle();
</script>

<section>
  <div class="flex items-center justify-between py-2">
    <DataTable.GlobalFilter {table} />
    <Button class="py-4" variant="outline" onclick={() => (toggle.toggle = !toggle.toggle)}>Create Team</Button>
  </div>
  <ScrollArea class="h-[1000px] rounded border">
    <DataTable.Datatable {table} {columns} />
  </ScrollArea>
</section>
