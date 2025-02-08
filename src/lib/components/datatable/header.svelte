<script lang="ts" generics="TData">
  import type { Table as TableT } from '@tanstack/table-core';
  import * as Table from '$lib/components/ui/table';
  import { FlexRender } from '$lib/components/ui/data-table';

  let { table }: { table: TableT<TData> } = $props();
</script>

<Table.Header>
  {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
    <Table.Row>
      {#each headerGroup.headers as header (header.id)}
        <Table.Head>
          {#if !header.isPlaceholder}
            <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
          {/if}
        </Table.Head>
      {/each}
    </Table.Row>
  {/each}
</Table.Header>
