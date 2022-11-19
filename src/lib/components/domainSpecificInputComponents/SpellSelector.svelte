<script lang="ts">
  import type { APIReferenceList } from '$lib/services/dnd5eApi/api';
  import * as dndApi from '$lib/services/dnd5eApi/api';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import FormItem from '../genericInputComponents/FormItem.svelte';
  import FormRow from '../layout/FormRow.svelte';
  import Table from '../genericInputComponents/Table.svelte';
  import TextInput from '../genericInputComponents/TextInput.svelte';
  export let value: string | undefined;
  export let id: string;
  export let label: string;
  export let tailwindClass: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;

  let response: APIReferenceList | undefined;
  let selectedSpell: string | undefined;
  let selectedSpellMultiplicity: number | undefined;
  let spell: dndApi.Spell | undefined = undefined;

  let entries: dndApi.Spell[] = [];

  onMount(async () => {
    const instance = new dndApi.SpellsApi({});
    response = await instance.apiSpellsGet();
  });

  $: onClick = () => {
    if (selectedSpell === undefined) {
      return;
    }
    loadSpell(selectedSpell).then((res) => {
      entries = entries.concat(res);
    });
    selectedSpell = undefined;
    selectedSpellMultiplicity = undefined;
    spell = undefined;
    document.getElementById('spellSelect')?.focus();
  };

  const loadSpell = async (spellIndex: string) => {
    const instance = new dndApi.SpellsApi({});
    return instance.apiSpellsIndexGet(spellIndex);
  };
</script>

<FormRow tailwindClass="mb-2">
  <FormItem {id} {label} tailwindClass="mr-4">
    <select
      id="spellSelect"
      {placeholder}
      bind:value={selectedSpell}
      on:change={async () => {
        spell = undefined;
        if (selectedSpell === undefined) {
          return;
        }
        spell = await loadSpell(selectedSpell);
      }}>
      <option value={undefined} />
      {#each response?.results ?? [] as effect}
        <option value={effect.index}>{effect.name}</option>
      {/each}
    </select>
  </FormItem>
  <FormItem id="spellMultiplicity" label="Category" tailwindClass="mr-4">
    <select
      id="spellMultiplicitySelect"
      placeholder="X times / Day "
      bind:value={selectedSpellMultiplicity}>
      <option value={undefined} />
      <option value={1}>At will</option>
      <option value={2}>Spellslot based</option>
      <option value={3}>X Times / Day</option>
    </select>
  </FormItem>
</FormRow>

<FormRow tailwindClass="mb-2">
  <FormItem id="spellDescriptionArea" label="Description" tailwindClass="mr-4 w-full">
    <textarea class="h-32" disabled={spell === undefined} value={spell?.desc ?? ''} />
  </FormItem>
</FormRow>

<FormRow tailwindClass="mb-2">
  <TextInput
    id="spellShortDescriptionArea"
    label="Short description"
    tailwindClass="mr-4 w-full"
    value=""
    placeholder="Short description" />
</FormRow>

<FormRow tailwindClass="mb-8">
  <button class="btn btn-base bg-surface-500 text-surface-100" on:click={onClick}
    ><Icon class="text-xl" icon="ic:baseline-plus" /> Add Spell</button>
</FormRow>

<Table
  data={entries}
  columns={[
    {
      headerName: 'Spell Name',
      tailwindClass: 'w-2/5 data-column',
      valueFormatter: (data) => data.name ?? ''
    },

    {
      headerName: 'Level',
      tailwindClass: 'w-1/5 data-column',
      valueFormatter: (data) => `${data.level ?? ''}`
    }
  ]} />

<style>
  .addSpellRowButton {
    padding-top: 2.25rem;
  }
</style>
