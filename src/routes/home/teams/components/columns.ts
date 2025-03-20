import { renderComponent } from '$lib/components/ui/data-table';
import TeamRowActions from './team-row-actions.svelte';
import DataTableSortButton from '$lib/components/datatable/sort-button.svelte';
import type { ColumnDef } from '@tanstack/table-core';
import type { Team } from '$lib/types/models';

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Name',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
    // @ts-expect-error Custom filter function
    filterFn: 'fuzzy',
  },
  {
    accessorKey: 'division',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Division',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
    // @ts-expect-error Custom filter function
    filterFn: 'fuzzy',
  },
  {
    accessorKey: 'playerCount',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Player Count',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(TeamRowActions, { team: row.original });
    },
  },
];
