<script>
  import Play from "./icons/Play.svelte";
  import Stop from "./icons/Stop.svelte";

  export let playing = false;
</script>

<button on:click>
  {#if playing}
    <Stop />
  {:else}
    <Play />
  {/if}
</button>

<style>
  button {
    outline: 0;
    border: none;
    width: 37px;
    height: 37px;
    padding-inline: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
    align-items: center;
  }
</style>
