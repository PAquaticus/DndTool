<script lang="ts">
  import { GameMechanicsApi, type APIReferenceList } from '$lib/services/dnd5eApi';
  import { onMount } from 'svelte';
  import FormItem from '../genericInputComponents/FormItem.svelte';
  export let value: string | undefined;
  export let id: string;
  export let label: string;
  export let tailwindClass: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;

  let damageTypeReferenceList: APIReferenceList | undefined;
  onMount(async () => {
    const gameMechanicsApi = new GameMechanicsApi({});
    damageTypeReferenceList = await gameMechanicsApi.apiDamageTypesGet();
  });
</script>

<FormItem {tailwindClass} {id} {label}>
  <select {id} {placeholder} bind:value>
    <option value={undefined} />
    {#each damageTypeReferenceList?.results ?? [] as type}
      <option value={type.index}>{type.name}</option>
    {/each}
  </select>
</FormItem>
