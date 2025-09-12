<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
  import { Button } from '$lib/components/ui/button/index.js';

  let {
    variant = 'ghost',
    name,
    ...restProps
  }: ComponentProps<typeof Button> & { name: string } = $props();
</script>

<Button {variant} class="flex size-full justify-start" {...restProps}>
  {name}
  <ArrowUpDownIcon class="ml-2" />
</Button>
