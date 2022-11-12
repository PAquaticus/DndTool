<script lang="ts">
  import DamageTypeTable from '$lib/components/domainSpecificInputComponents/DamageTypeTable.svelte';
  import Icon from '@iconify/svelte';
  import DamageEffectSelectInput from '$lib/components/domainSpecificInputComponents/DamageEffectSelectInput.svelte';
  import DamageTypeSelectInput from '$lib/components/domainSpecificInputComponents/DamageTypeSelectInput.svelte';
  import FormRow from '$lib/components/layout/FormRow.svelte';
  import type { DamageTableRowentry } from '$lib/types/DamageTableRowEntry';

  export let formRowTailwindClass: string;

  let newDamageEffect: string | undefined = undefined;
  let newDamageType: string | undefined = undefined;

  let entries: DamageTableRowentry[] = [];

  $: onClick = () => {
    if (newDamageEffect === undefined || newDamageType === undefined) {
      return;
    }
    entries = entries.concat({ damageEffect: newDamageEffect, damageType: newDamageType });
    newDamageEffect = undefined;
    newDamageType = undefined;
    document.getElementById('damageEffect')?.focus();
  };
</script>

<FormRow tailwindClass={formRowTailwindClass}>
  <DamageEffectSelectInput
    tailwindClass="w-64 ml-4 mr-4"
    id="damageEffect"
    label="Damage Effect"
    placeholder="Resistance"
    bind:value={newDamageEffect} />

  <DamageTypeSelectInput
    tailwindClass="w-64 ml-4 mr-4"
    id="damageType"
    label="Damage Type"
    placeholder="Acid"
    bind:value={newDamageType} />
  <div class="pt-8">
    <button on:click={onClick}><Icon class="text-xl" icon="ic:baseline-plus" /> </button>
  </div>
</FormRow>

<DamageTypeTable bind:entries />
