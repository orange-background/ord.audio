<script lang="ts">
  import Grid from "./Grid.svelte";
  import Body from "./Body.svelte";

  let ready = false;
</script>

<main>
  <Grid on:done={() => (ready = true)} />
  <Body {ready} />
</main>

<style>
  main {
    position: relative;
    overflow: hidden;
  }
</style>
