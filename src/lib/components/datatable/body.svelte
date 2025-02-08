<script lang="ts" generics="TData, TValue">
  import type { ColumnDef, Table as TableT } from '@tanstack/table-core';
  import * as Table from '$lib/components/ui/table';
  import { FlexRender } from '$lib/components/ui/data-table';

  let { table, columns }: { table: TableT<TData>; columns: ColumnDef<TData, TValue>[] } = $props();
</script>

<Table.Body>
  {#each table.getRowModel().rows as row (row.id)}
    <Table.Row data-state={row.getIsSelected() && 'selected'}>
      {#each row.getVisibleCells() as cell (cell.id)}
        <Table.Cell>
          <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
        </Table.Cell>
      {/each}
    </Table.Row>
  {:else}
    <Table.Row>
      <Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
    </Table.Row>
  {/each}
</Table.Body>
