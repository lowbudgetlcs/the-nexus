import { renderComponent } from '$lib/components/ui/data-table';
import TeamRowActions from './team-row-actions.svelte';
import DataTableSortButton from '$lib/components/datatable/sort-button.svelte';
import type { ColumnDef } from '@tanstack/table-core';
import type { Team } from '$lib/types/entities';

export const columns: ColumnDef<Team>[] = [
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
    accessorKey: 'division',
    header: ({ column }) => {
      return renderComponent(DataTableSortButton, {
        column: 'Division',
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    accessorKey: 'playerCount',
    header: 'Player Count',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(TeamRowActions, { team: row.original, id: row.id });
    },
  },
];
