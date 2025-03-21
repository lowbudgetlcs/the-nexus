<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type FilterFn,
  } from '@tanstack/table-core';
  import * as Table from '$lib/components/ui/table';
  import { createSvelteTable } from '$lib/components/ui/data-table';
  import * as DataTable from '$lib/components/datatable/index';
  import CreateTeamDialog from './create-team-dialog.svelte';
  import { rankItem } from '@tanstack/match-sorter-utils';
  import Button from '$lib/components/ui/button/button.svelte';
  import { getCreateTeamToggle } from '../+page.svelte';

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  };

  let { columns, data }: DataTableProps<TData, TValue> = $props();
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
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
    getPaginationRowModel: getPaginationRowModel(),
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
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        pagination = updater(pagination);
      } else {
        pagination = updater;
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
      get pagination() {
        return pagination;
      },
      get sorting() {
        return sorting;
      },
    },
  });
  let toggle = getCreateTeamToggle();
</script>

<section>
  <div class="flex items-center justify-between py-4">
    <DataTable.GlobalFilter {table} />
    <Button variant="outline" onclick={() => (toggle.toggle = !toggle.toggle)}>Create Team</Button>
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <DataTable.Header {table} />
      <DataTable.Body {table} {columns} />
    </Table.Root>
  </div>
  <div class="flex flex-row justify-between">
    <DataTable.PageButtons {table} />
  </div>
</section>
