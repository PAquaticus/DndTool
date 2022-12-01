<script lang="ts">
  import TextInput from '$lib/components/genericInputComponents/TextInput.svelte';
  import FormRow from '$lib/components/layout/FormRow.svelte';
  import EditorRowInput from '../../components/EditorRowInput.svelte';
  import AbilityTable from '$lib/components/domainSpecificInputComponents/AbilityTable.svelte';
  import DamageTypeRow from '../components/DamageTypeRow.svelte';
  import DiceAverageDisplay from '$lib/components/domainSpecificInputComponents/DiceAverageDisplay.svelte';
  import SpellSelector from '$lib/components/domainSpecificInputComponents/SpellSelector.svelte';
    import FormItem from '$lib/components/genericInputComponents/FormItem.svelte';
    import Icon from '@iconify/svelte';
    import Table from '$lib/components/genericInputComponents/Table.svelte';

  const character: any = {};

  type Action = {name: string | undefined, description: string | undefined};
  const newAction: Action = {
    name: undefined,
    description: undefined
  }
  let actions: Action[] = [];


  type Ability = {name: string | undefined, description: string | undefined}
  const newAbility:  Ability = {
    name: undefined,
    description: undefined
  }
  let abilities: Ability[] = []

  const formRowTailwindClass = 'w-full my-4';
</script>

<section class="px-16 py-8 flex flex-row justify-center">
  <div>
    <h1>Character Editor</h1>
    <div class="flex flex-row">
      <div class="flex flex-col mr-4">
        <h2>Stats</h2>
        <FormRow tailwindClass={formRowTailwindClass}>
          <TextInput tailwindClass="w-80 mr-8" id={'name'} label="Name" value={character.name} />
          <TextInput
            tailwindClass="w-52 mr-8"
            id={'portraitUrl'}
            label="Portrait-Url"
            value={character.portrait} />
          <TextInput tailwindClass="w-12" id={'cr'} label="CR" value={character.challangeRating} />
        </FormRow>

        <FormRow tailwindClass={formRowTailwindClass}>
          <TextInput
            tailwindClass="w-32"
            id="hitDice"
            label="Hit Point Roll"
            placeholder="1d12 + 20"
            bind:value={character.hitDiceQuantity} />

          <DiceAverageDisplay
            id="hitPointAvg"
            label="Average"
            tailwindClass="w-16 mr-4"
            diceInput={character.hitDiceQuantity} />

          <TextInput
            tailwindClass="w-16 mr-4"
            id="armorClass"
            label="AC"
            placeholder="14"
            value={character.armorClass} />
          <TextInput
            tailwindClass="w-16 mr-4"
            id="initiative"
            label="Initiative"
            placeholder="1"
            value={character.armorClass} />
          <TextInput
            tailwindClass="w-16 mr-2"
            id="speed"
            label="Speed"
            placeholder="30"
            value={character.speed} />
        </FormRow>

        <h2>Abilities</h2>
        <div class="w-160">
          <AbilityTable />
        </div>

        <h2>Damage Type Effects</h2>
        <DamageTypeRow {formRowTailwindClass} />

        <h2>Special Abilities</h2>



        <FormRow tailwindClass={formRowTailwindClass}>
          <TextInput
            tailwindClass="mr-4 w-full"
            id="specialAbilityName"
            label="Ability Name"
            placeholder="Multi attack"
            value={newAbility.name} />
        </FormRow>


        <FormRow >
          <FormItem id="specialAbilityDescription" label="Description" tailwindClass="mr-4 w-full">
              <textarea value={newAbility.description ?? ''} class="h-16" placeholder="Makes two greatsword attacks or two slam attacks."  />
           </FormItem>
        </FormRow>

        <FormRow tailwindClass="mb-8">
          <button class="btn btn-base bg-surface-500 text-surface-100" on:click={() => {}}
            ><Icon class="text-xl" icon="ic:baseline-plus" />Add Ability</button>
        </FormRow>

      <Table
        data={abilities}
        columns={[
          {
            headerName: 'Ability Name',
            tailwindClass: 'w-4/5 data-column',
            valueFormatter: (data) => data.name ?? ''
          } 
        ]} />

        <h2>Actions</h2>

        <FormRow tailwindClass={formRowTailwindClass}>
          <TextInput
            tailwindClass="mr-4 w-full"
            id="actionName"
            label="Action Name"
            placeholder="Dagger"
            value={newAction.name} />
        </FormRow>


        <FormRow >
          <FormItem id="actionDescription" label="Description" tailwindClass="mr-4 w-full">
              <textarea class="h-16" placeholder="Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage." value={newAction.description ?? ''} />
           </FormItem>
        </FormRow>

        <FormRow tailwindClass="mb-8">
          <button class="btn btn-base bg-surface-500 text-surface-100" on:click={() => {}}
            ><Icon class="text-xl" icon="ic:baseline-plus" />Add Action</button>
        </FormRow>


      <Table
        data={actions}
        columns={[
          {
            headerName: 'Action Name',
            tailwindClass: 'w-4/5 data-column',
            valueFormatter: (data) => data.name ?? ''
          } 
        ]} />


        <h2>Spells</h2>
        <FormRow tailwindClass={formRowTailwindClass}>
          <TextInput
            tailwindClass="w-16 mr-4"
            id="spellSaveDc"
            label="DC"
            placeholder="15"
            value={character.dc} />
          <TextInput
            tailwindClass="w-16 mr-2"
            id="spellAttackModifier"
            label="Modifier"
            placeholder="4"
            value={character.spellAttackModifier} />
        </FormRow>
        <SpellSelector
          tailwindClass={formRowTailwindClass}
          id="spellSelect"
          label="Spell"
          placeholder="Wish"
          bind:value={character.spell} />

        <EditorRowInput name="Source">
          <input type="text" id="Name" bind:value={character.name} minlength="2" required />
        </EditorRowInput>
      </div>
    </div>
  </div>
</section>

<style>
  h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
</style>
