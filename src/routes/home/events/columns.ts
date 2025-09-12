import type { ColumnDef } from '@tanstack/table-core';
import { type Event } from '$lib/dennys';
import { renderComponent } from '$lib/components/ui/data-table';
import SortableHeader from './sortable-header.svelte';
import StatusIcon from './status-icon.svelte';


export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) =>
      renderComponent(SortableHeader, {
        onclick: column.getToggleSortingHandler(),
        name: "Name"
      }),
  },
  {
    id: 'group',
    accessorFn: row => row.group?.name,
    header: ({ column }) =>
      renderComponent(SortableHeader, {
        onclick: column.getToggleSortingHandler(),
        name: "Group"
      }),
  },
  {
    header: "Status",
    cell: ({ row }) => {
      return renderComponent(StatusIcon, { status: row.original.status });
    }
  },
];

