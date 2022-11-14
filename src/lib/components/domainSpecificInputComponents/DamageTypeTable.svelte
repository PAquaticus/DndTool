<script lang="ts">
  import type { DamageTableRowentry } from '$lib/types/DamageTableRowEntry';
  import Table from '../genericInputComponents/Table.svelte';

  export let entries: DamageTableRowentry[] = [];
</script>

<Table
  bind:data={entries}
  columns={[
    {
      headerName: 'Effect',
      tailwindClass: 'w-2/5 data-column',
      valueFormatter: (data) => data.damageEffect.toLocaleLowerCase()
    },
    {
      headerName: 'Damage Type',
      tailwindClass: 'w-2/5 data-column',
      valueFormatter: (data) => data.damageType.toLocaleLowerCase()
    }
  ]} />
