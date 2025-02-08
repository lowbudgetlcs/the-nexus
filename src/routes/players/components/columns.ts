import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './create-player-actions.svelte';
import DataTableSortButton from '$lib/components/datatable/sort-button.svelte';
import type { ColumnDef } from '@tanstack/table-core';
import type { Player } from '$lib/types/entities';

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
    accessorKey: 'team',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Team',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    accessorKey: 'division',
    header: 'Division',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { player: row.original });
    },
  },
];
