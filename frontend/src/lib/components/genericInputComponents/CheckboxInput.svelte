<script lang="ts">
	export let value: string | undefined;
	export let id: string;
	export let label: string;
	export let tailwindClass: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
</script>

<div class={tailwindClass}>
	<label for={id}>
		<span> {label} </span>
		<input {placeholder} type="checkbox" {id} bind:value />
	</label>
</div>
