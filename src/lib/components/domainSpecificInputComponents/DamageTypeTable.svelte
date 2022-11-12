<script lang="ts">
  import { GameMechanicsApi, type APIReferenceList, type DamageType } from '$lib/services/dnd5eApi';
  import type { DamageTableRowentry } from '$lib/types/DamageTableRowEntry';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  export let entries: DamageTableRowentry[] = [];
  let damageTypeReferenceList: undefined | APIReferenceList = undefined;

  onMount(async () => {
    const gameMechanicsApi = new GameMechanicsApi({});
    damageTypeReferenceList = await gameMechanicsApi.apiDamageTypesGet();
  });

  $: onClick = (index: number) => {
    entries = entries.slice(0, index).concat(entries.slice(index + 1));
  };
</script>

<div class="w-full py-2 px-4">
  <table class="border-solid border-black ">
    <tr>
      <th align="left" class="w-64 data-column">Effect</th>
      <th align="left" class="w-64 data-column">Damage Type</th>
      <th align="left" class="w-24" />
    </tr>
    {#each entries as entry, idx}
      <tr>
        <td class="w-64 td-1">{entry.damageEffect.toLocaleLowerCase()}</td>
        <td class="w-64 td-1">{entry.damageType.toLocaleLowerCase()}</td>
        <td class="w-16 td-1 text-center"
          ><button on:click={() => onClick(idx)}
            ><Icon class="text-xl" icon="mdi:trash" />
          </button></td>
      </tr>
    {/each}
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

  td::first-letter {
    text-transform: capitalize;
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
