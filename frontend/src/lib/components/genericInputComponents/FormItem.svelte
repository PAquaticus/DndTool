<script lang="ts">
  export let id: string;
  export let label: string;
  export let tailwindClass: string | undefined = undefined;
</script>

<div class={tailwindClass}>
  <label for={id}>
    <span> {label} </span>
    <slot />
  </label>
</div>
