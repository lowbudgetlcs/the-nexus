import { renderComponent } from '$lib/components/ui/data-table';
import PlayerRowActions from './player-row-actions.svelte';
import DataTableSortButton from '$lib/components/datatable/sort-button.svelte';
import type { ColumnDef } from '@tanstack/table-core';
import type { Player } from '$lib/types/models';

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Name',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    id: 'team',
    accessorFn: row => row.team ?? '',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Team',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    id: 'division',
    accessorFn: row => row.division ?? '',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Division',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(PlayerRowActions, { player: row.original });
    },
  },
];
