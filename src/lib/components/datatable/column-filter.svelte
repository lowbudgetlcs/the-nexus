<script lang="ts" generics="TData">
  import type { Table } from '@tanstack/table-core';
  import { Input } from '$lib/components/ui/input';

  let { table, column }: { table: Table<TData>; column: string } = $props();
</script>

<div class="flex items-center py-4">
  <Input
    placeholder="Filter teams..."
    value={(table.getColumn(column)?.getFilterValue() as string) ?? ''}
    onchange={(e) => {
      table.getColumn(column)?.setFilterValue(e.currentTarget.value);
    }}
    oninput={(e) => {
      table.getColumn(column)?.setFilterValue(e.currentTarget.value);
    }}
    class="max-w-sm"
  />
</div>
