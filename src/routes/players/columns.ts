import type { ColumnDef } from '@tanstack/table-core';

export type Player = {
  name: string;
  team: string;
  active: boolean;
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
    accessorKey: 'active',
    header: 'Active'
  }
];
