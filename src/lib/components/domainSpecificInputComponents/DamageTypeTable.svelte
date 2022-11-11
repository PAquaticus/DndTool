<script lang="ts">
  import { GameMechanicsApi, type APIReferenceList, type DamageType } from '$lib/services/dnd5eApi';
  import { DataTable } from '@brainandbones/skeleton';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { DamageEffects } from './damageEffects';

  export let value: string;
  let damageTypeReferenceList: undefined | APIReferenceList = undefined;

  onMount(async () => {
    const gameMechanicsApi = new GameMechanicsApi({});
    damageTypeReferenceList = await gameMechanicsApi.apiDamageTypesGet();
  });

  const damageTypes: DataTable['$$prop_def'] = {
    search: undefined,
    sort: 'position',
    headings: ['', 'Damage Type', 'Effect'],
    source: [{ remove: '<button class="btn">remove</button>', type: 'Acid', effect: 'reistance' }]
  };

  let newTypeValue: string | undefined = undefined;
  let newTypeEffect: string | undefined = undefined;

  const onSort = () => {};
  const onSelect = () => {};
</script>

<div class="w-full py-2 px-4">
  <table class="border-solid border-black ">
    <tr>
      <th align="left" class="w-64 data-column">Effect</th>
      <th align="left" class="w-64 data-column">Damage Type</th>
      <th align="left" class="w-24" />
    </tr>
    <tr>
      <td class="w-64 td-1">Effect</td>
      <td class="w-64 td-1">Damage Type</td>
      <td class="w-16 td-1 text-center"
        ><button><Icon class="text-xl" icon="mdi:trash" /> </button></td>
    </tr>
  </table>
</div>

<style>
  th {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 1rem;
    background-color: rgb(var(--color-surface-200));
    border-bottom: 1px rgb(var(--color-surface-300)) solid;
  }

  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 1rem;
    border-bottom: 1px rgb(var(--color-surface-300)) solid;
  }

  .td-1 {
    background-color: rgb(var(--color-surface-50));
  }

  .td-1 {
    background-color: rgb(var(--color-surface-100));
  }

  .data-column:hover {
    background-color: rgb(var(--color-primary-100));
  }
</style>
