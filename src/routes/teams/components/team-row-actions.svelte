<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { Team } from '$lib/types/entities';
  import Ellipsis from 'lucide-svelte/icons/ellipsis';

  let { team, id }: { team: Team; id: string } = $props();
</script>

<Button variant="ghost" size="icon" class="relative size-8 p-0">
  <span class="sr-only">Open menu</span>
  <Ellipsis />
</Button>
