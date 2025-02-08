<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
  import { Button } from '$lib/components/ui/button';

  let {
    column,
    variant = 'ghost',
    ...restProps
  }: ComponentProps<typeof Button> & { column: string } = $props();
</script>

<Button {variant} {...restProps}>
  {column}
  <ArrowUpDown class="ml-2" />
</Button>
