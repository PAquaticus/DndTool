<script lang="ts">
  import type { APIReferenceList } from '$lib/services/dnd5eApi/api';
  import * as dndApi from '$lib/services/dnd5eApi/api';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import FormItem from '../genericInputComponents/FormItem.svelte';
  import FormRow from '../layout/FormRow.svelte';
  export let value: string | undefined;
  export let id: string;
  export let label: string;
  export let tailwindClass: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;

  let response: APIReferenceList | undefined;
  let selectedSpell: string | undefined;

  let entries: any[] = [];

  onMount(async () => {
    const instance = new dndApi.SpellsApi({});
    response = await instance.apiSpellsGet();
  });

  $: onClick = () => {
    if (selectedSpell === undefined) {
      return;
    }
    entries = entries.concat(selectedSpell);
    selectedSpell = undefined;
    document.getElementById('spellSelect')?.focus();
  };
</script>

<FormRow {tailwindClass}>
  <FormItem {id} {label} tailwindClass="mr-4">
    <select id="spellSelect" {placeholder} bind:value={selectedSpell}>
      <option value={undefined} />
      {#each response?.results ?? [] as effect}
        <option value={effect.index}>{effect.name}</option>
      {/each}
    </select>
  </FormItem>

  <div class="addSpellRowButton">
    <button on:click={onClick}><Icon class="text-xl" icon="ic:baseline-plus" /> </button>
  </div>
</FormRow>

<style>
  .addSpellRowButton {
    padding-top: 2.25rem;
  }
</style>
