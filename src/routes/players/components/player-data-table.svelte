<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
  } from '@tanstack/table-core';
  import * as Table from '$lib/components/ui/table';
  import { createSvelteTable } from '$lib/components/ui/data-table';
  import * as DataTable from '$lib/components/datatable/index';
  import CreatePlayerDialog from './create-player/dialog.svelte';

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  };

  let { columns, data }: DataTableProps<TData, TValue> = $props();
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let globalFilter = $state('');

  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
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
</script>

<section>
  <DataTable.GlobalFilter {table} />
  <div class="rounded-md border">
    <Table.Root>
      <DataTable.Header {table} />
      <DataTable.Body {table} {columns} />
    </Table.Root>
  </div>
  <div class="flex flex-row justify-between">
    <div class="flex items-center py-4">
      <CreatePlayerDialog />
    </div>
    <DataTable.PageButtons {table} />
  </div>
</section>
