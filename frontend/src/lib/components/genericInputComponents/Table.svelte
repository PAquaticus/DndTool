<script lang="ts">
  type T = $$Generic;
  import Icon from '@iconify/svelte';

  export let data: T[];
  export let columns: {
    headerName: string;
    tailwindClass: string;
    valueFormatter: (data: T) => string;
  }[];

  $: onClick = (index: number) => {
    data = data.slice(0, index).concat(data.slice(index + 1));
  };
</script>

<div class="w-full ">
  <table class="w-full border-solid border-black ">
    <tr>
      {#each columns as col}
        <th align="left" class={col.tailwindClass}>{col.headerName}</th>
      {/each}
      <th align="left" class="w-1/5" />
    </tr>
    {#each data as entry, idx}
      <tr>
        {#each columns as col}
          <td class={col.tailwindClass}>{col.valueFormatter(entry)}</td>
        {/each}

        <td class="w-1/5 td-1 text-center"
          ><button on:click={() => onClick(idx)}
            ><Icon class="text-xl" icon="mdi:trash" />
          </button></td>
      </tr>

    {/each}
  </table>
</div>

<style>
  th {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 1rem;
    background-color: rgb(var(--color-surface-200));
    border-bottom: 1px rgb(var(--color-surface-300)) solid;
  }

  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 1rem;
    border-bottom: 1px rgb(var(--color-surface-300)) solid;
  }

  td::first-letter {
    text-transform: capitalize;
  }

  .td-1 {
    background-color: rgb(var(--color-surface-50));
  }

  .td-1 {
    background-color: rgb(var(--color-surface-100));
  }

  .data-column:hover {
    background-color: rgb(var(--color-primary-100));
  }
</style>
