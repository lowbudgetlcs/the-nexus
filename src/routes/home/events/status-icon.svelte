<script lang="ts">
  import { Activity, Check, Pause, X, Loader } from '@lucide/svelte/icons';
  import { EventStatus } from '$lib/dennys';
  const GetIcon = (status: EventStatus) => {
    switch (status) {
      case EventStatus.COMPLETE:
        return Check;
      case EventStatus.ACTIVE:
        return Activity;
      case EventStatus.PAUSED:
        return Pause;
      case EventStatus.CANCELED:
        return X;
      case EventStatus.NOT_STARTED:
        return Loader;
    }
  };
  let { status }: { status: EventStatus } = $props();
</script>

{#snippet icon(status: EventStatus)}
  {@const Icon = GetIcon(status)}
  <div class="flex flex-1 flex-row gap-4">
    <Icon class="size-5" />
    {status}
  </div>
{/snippet}

{@render icon(status)}
