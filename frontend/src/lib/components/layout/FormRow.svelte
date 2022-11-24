<script lang="ts">
	export let tailwindClass: string | undefined = undefined;
</script>

<div class={`flex flex-row ${tailwindClass ?? ''}`}>
	<slot />
</div>
