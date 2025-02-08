<script lang="ts" generics="TData">
  import { Button } from '$lib/components/ui/button';
  import type { Table } from '@tanstack/table-core';
  let { table }: { table: Table<TData> } = $props();
</script>

<div class="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    onclick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    onclick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>
