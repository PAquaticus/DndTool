<script lang="ts">
	export let name: string;
</script>

<div class="editor-row">
	<label for={name}>
		<span>{name}</span>
		<slot />
	</label>
</div>

<style>
	.editor-row {
		margin-top: 2rem;
		width: 40rem;
	}
</style>
