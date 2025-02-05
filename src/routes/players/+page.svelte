<script lang="ts">
    import type { Player } from './columns';
  import PlayerTable from './player-table.svelte';

  const players: Player[] = [
    {
      name: 'ruuffian#FUNZ',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Xellius#N B',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Zebra#N B',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Unkindness#N B',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Seir#qiiqo',
      team: 'Naughty Bois',
      active: true
    }
  ];
</script>

<section class="flex w-full items-center justify-center">
  <PlayerTable {players} />
</section>
