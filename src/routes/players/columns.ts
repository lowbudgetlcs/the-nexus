import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './data-table-actions.svelte';
import DataTableTeamButton from './data-table-team-button.svelte';
import type { ColumnDef } from '@tanstack/table-core';

export type Player = {
  name: string;
  team: string | null;
};

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'team',
    header: ({ column }) => {
      return renderComponent(DataTableTeamButton, {
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { name: row.original.name });
    },
  },
];
