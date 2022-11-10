<script lang="ts">
	import CheckboxInput from '$lib/components/inputComponents/CheckboxInput.svelte';
	import DamageTypeTable from '$lib/components/inputComponents/DamageTypeSelector.svelte';
	import TextInput from '$lib/components/inputComponents/TextInput.svelte';
	import FormRow from '$lib/components/layout/FormRow.svelte';
	import EditorRowInput from '../../components/EditorRowInput.svelte';

	const character: any = {};

	const formRowTailwindClass = 'w-full my-4';
</script>

<section class="px-16 py-8 flex flex-row justify-center">
	<div>
		<h1>Character Editor</h1>
		<div class="flex flex-row">
			<div class="flex flex-col mr-4">
				<FormRow tailwindClass={formRowTailwindClass}>
					<TextInput tailwindClass="w-80 mr-8" id={'name'} label="Name" value={character.name} />
					<TextInput
						tailwindClass="w-52 mr-8"
						id={'portraitUrl'}
						label="Portrait-Url"
						value={character.portrait}
					/>
					<TextInput tailwindClass="w-12" id={'cr'} label="CR" value={character.challangeRating} />
				</FormRow>

				<FormRow tailwindClass={formRowTailwindClass}>
					<TextInput
						tailwindClass="w-32 mr-4"
						id="hitDice"
						label="Hit Dice"
						placeholder="1d12"
						value={character.hitDiceQuantity}
					/>

					<TextInput
						tailwindClass="w-16 mr-4"
						id="armorClass"
						label="AC"
						placeholder="14"
						value={character.armorClass}
					/>
					<TextInput
						tailwindClass="w-16 mr-4"
						id="initiative"
						label="Initiative"
						placeholder="1"
						value={character.armorClass}
					/>
					<TextInput
						tailwindClass="w-16 mr-2"
						id="speed"
						label="Speed"
						placeholder="30"
						value={character.speed}
					/>
				</FormRow>

				<div class="w-160">
					<table>
						<tr>
							<th class="w-20" />
							<th>STR</th>
							<th>DEX</th>
							<th>CON</th>
							<th>INT</th>
							<th>WIS</th>
							<th>CHR</th>
						</tr>
						<tr>
							<td class="font-bold">Skills</td>
							<td><input placeholder="10" type="text" /></td>
							<td><input placeholder="10" type="text" /></td>
							<td><input placeholder="10" type="text" /></td>
							<td><input placeholder="10" type="text" /></td>
							<td><input placeholder="10" type="text" /></td>
							<td><input placeholder="10" type="text" /></td>
						</tr>
						<tr
							><td class="font-bold">Saves</td>
							<td><input inputmode="numeric" placeholder="-2" type="text" /></td>
							<td><input placeholder="-1" type="text" /></td>
							<td><input placeholder="0" type="text" /></td>
							<td><input placeholder="1" type="text" /></td>
							<td><input placeholder="2" type="text" /></td>
							<td><input placeholder="3" type="text" /></td>
						</tr>
					</table>
				</div>

				<DamageTypeTable value={''} />

				"dmg cond immunities" action bonus action reaction legendary action mythic action

				<EditorRowInput name="Source">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>
			</div>
		</div>
	</div>
</section>
