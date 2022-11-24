<script lang="ts">
  import {
    calculateDiceAverage,
    parseDiceAverageFromString
  } from '$lib/functions/calculateDiceAverage';
  import FormItem from '../genericInputComponents/FormItem.svelte';

  export let id: string;
  export let label: string;
  export let tailwindClass: string | undefined = undefined;
  export let diceInput: string | undefined = undefined;

  $: diceAverage = parseDiceAverageFromString(diceInput);
</script>

<FormItem {id} {label} tailwindClass={tailwindClass ?? ''}>
  <input type="text" disabled value={diceAverage} class="font-bold" />
</FormItem>
