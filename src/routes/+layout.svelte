<script lang="ts">
  import '../app.css';
  import { Button } from '$lib/components/ui/button';
  import { NavigationMenu } from 'bits-ui';
  import { Separator } from '$lib/components/ui/separator';
  const { data, children } = $props();
</script>

{#if data.render}
  <NavigationMenu.Root class="relative flex max-w-max flex-1 items-center justify-center">
    <NavigationMenu.List class="group flex flex-1 list-none items-center justify-center space-x-1">
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/"
          class="inlfine-flex w-maw group h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          ><span class="-z-10 text-2xl font-bold first-letter:text-5xl">The Nexus</span
          ></NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/players"
          class="inlfine-flex w-maw group h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Players</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/teams"
          class="inlfine-flex w-maw group h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Teams</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/divisions"
          class="inlfine-flex w-maw group h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Divisions</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          href="/hash"
          class="inlfine-flex w-maw group h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
          >Hash</NavigationMenu.Link
        >
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <form method="POST" action="/?/logout">
          <Button variant="ghost" type="submit">Logout</Button>
        </form>
      </NavigationMenu.Item>
      <NavigationMenu.Indicator />
    </NavigationMenu.List>
    <NavigationMenu.Viewport />
  </NavigationMenu.Root>
  <Separator class="z-10" />
{/if}
{@render children()}
