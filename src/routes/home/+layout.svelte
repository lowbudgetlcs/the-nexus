<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner';
  import { Navbar } from '$lib/components';
  const { children } = $props();
</script>

<Toaster />
<Navbar />
{@render children()}
