<script lang="ts">
  import '../app.css';
  import { Button } from '$lib/components/ui/button';
  import { NavigationMenu } from 'bits-ui';
  import { Separator } from '$lib/components/ui/separator';
  import { Toaster } from '$lib/components/ui/sonner';
  const { data, children } = $props();
  import { ModeWatcher } from 'mode-watcher';
  import Sun from 'svelte-radix/Sun.svelte';
  import Moon from 'svelte-radix/Moon.svelte';
  import { toggleMode } from 'mode-watcher';
</script>

{#if data.render}
  <NavigationMenu.Root class="relative flex max-w-max flex-1 items-center justify-center">
    <NavigationMenu.List class="group flex flex-1 list-none items-center justify-center space-x-1">
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/"
          class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          ><span class="text-2xl font-bold first-letter:text-2xl">The Nexus</span
          ></NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/players"
          class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Players</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/teams"
          class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Teams</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/divisions"
          class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Divisions</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/hash"
          class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Hash</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <form method="POST" action="/?/logout">
          <Button variant="ghost" type="submit">Logout</Button>
        </form>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <Button onclick={toggleMode} variant="ghost" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </NavigationMenu.Item>
      <NavigationMenu.Indicator />
    </NavigationMenu.List>
    <NavigationMenu.Viewport />
  </NavigationMenu.Root>
  <Separator class="z-10" />
{/if}
{@render children()}
{#if data.render}
  <Toaster />
  <ModeWatcher />
{/if}
