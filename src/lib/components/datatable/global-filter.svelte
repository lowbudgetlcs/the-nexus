<script lang="ts" generics="TData">
  import type { Table } from '@tanstack/table-core';
  import { Input } from '$lib/components/ui/input';

  let { table }: { table: Table<TData> } = $props();
</script>

<div class="flex items-center">
  <Input
    placeholder="Filter..."
    value={table.getState().globalFilter}
    onchange={(e) => {
      table.setGlobalFilter(e.currentTarget.value);
    }}
    oninput={(e) => {
      table.setGlobalFilter(e.currentTarget.value);
    }}
    class="max-w-sm"
  />
</div>
