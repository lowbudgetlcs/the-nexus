<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import type { Player } from './+page.svelte';

  let { players }: { players: Player[] } = $props();
</script>

<Table.Root class="mt-8">
  <Table.Caption>{players.length} players loaded.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Active?</Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Team</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each players as player}
      <Table.Row>
        <Table.Cell>{player.active ? 'yes' : 'no'}</Table.Cell>
        <Table.Cell class="font-medium">{player.name}</Table.Cell>
        <Table.Cell>{player.team}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
