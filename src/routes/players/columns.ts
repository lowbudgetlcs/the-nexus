import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './data-table-actions.svelte';
import type { ColumnDef } from '@tanstack/table-core';

export type Player = {
  name: string;
  team: string;
};

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'team',
    header: 'Team'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { name: row.original.name });
    }
  }
];
