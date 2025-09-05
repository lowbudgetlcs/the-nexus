<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <div class="flex flex-col gap-4 p-4">
    {#each Array.from({ length: 24 }) as _, index (index)}
      <div class="aspect-video h-12 w-full rounded-lg bg-muted/50"></div>
    {/each}
  </div>
</section>
