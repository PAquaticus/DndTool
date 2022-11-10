<script lang="ts">
	import DamageTypeSelector from '$lib/components/inputComponents/DamageTypeSelector.svelte';
	import EditorRowInput from '../../components/EditorRowInput.svelte';

	const character: any = {};
</script>

<section class="px-16 py-8 flex flex-row justify-center">
	<div>
		<h1>Character Editor</h1>
		<div class="flex flex-row">
			<div class="flex flex-col mr-4">
				<EditorRowInput name="Name">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Portrait">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Source">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Level">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Hit Points">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Hit Points Dice">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Armor class">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Initiaitve Modifier">
					<input type="text" id="Name" bind:value={character.name} minlength="2" required />
				</EditorRowInput>

				<table>
					<tr>
						<th />
						<th>STR</th>
						<th>DEX</th>
						<th>CON</th>
						<th>INT</th>
						<th>WIS</th>
						<th>CHR</th>
					</tr>
					<tr
						><td>Skills</td>
						<td><input type="text" /></td>
						<td><input type="text" /></td>
						<td><input type="text" /></td>
						<td><input type="text" /></td>
						<td><input type="text" /></td>
						<td><input type="text" /></td>
					</tr>
					<tr
						><td>Saves</td>
						<td><input inputmode="numeric" placeholder="-2" type="text" /></td>
						<td><input placeholder="-1" type="text" /></td>
						<td><input placeholder="0" type="text" /></td>
						<td><input placeholder="1" type="text" /></td>
						<td><input placeholder="2" type="text" /></td>
						<td><input placeholder="3" type="text" /></td>
					</tr>
				</table>
			</div>

			<DamageTypeSelector value={''} />

			saves skills speed vulnerabilits resistances dmg immunities cond immunities action bonus
			action reaction legendary action mythic action

			<div class="flex flex-col ml-4">
				<EditorRowInput name="castingTime">
					<input
						type="text"
						id="castingTime"
						bind:value={character.castingTime}
						minlength="2"
						required
					/>
				</EditorRowInput>

				<EditorRowInput name="Range">
					<input type="text" id="range" bind:value={character.range} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Components">
					<input
						type="text"
						id="components"
						bind:value={character.components}
						minlength="2"
						required
					/>
				</EditorRowInput>

				<EditorRowInput name="Duration">
					<input type="text" id="duration" bind:value={character.duration} minlength="2" required />
				</EditorRowInput>
			</div>
		</div>
	</div>
</section>
