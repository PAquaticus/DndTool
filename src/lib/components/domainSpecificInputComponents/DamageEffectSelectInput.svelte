<script lang="ts">
  import FormItem from '../genericInputComponents/FormItem.svelte';
  import { DamageEffects } from './damageEffects';
  export let value: string | undefined;
  $: console.log(value);

  export let id: string;
  export let label: string;
  export let tailwindClass: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
</script>

<FormItem {tailwindClass} {id} {label}>
  <select {id} {placeholder} bind:value>
    <option value={undefined} />
    {#each Object.entries(DamageEffects) as effect}
      <option value={effect[0]}>{effect[1]}</option>
    {/each}
  </select>
</FormItem>
