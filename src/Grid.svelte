<script lang="ts">
  import { makeLines, totalLength } from "./grid";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let width = window.innerWidth;
  let height = window.innerHeight;
  $: mobile = width < 768 ? true : false;
  $: speed = mobile ? 58 : 125;

  $: lines = makeLines(0, mobile);
  $: total = totalLength(mobile);

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    total = totalLength(mobile);
    lines = makeLines(total + 1, mobile);
  }

  onMount(() => {
    requestAnimationFrame(loop);
    let l = 0;
    function loop() {
      if (l > total * 2) return;
      requestAnimationFrame(loop);
      lines = makeLines(l, mobile);
      l = l + speed;
      if (l > total) {
        dispatch("done");
      }
    }
  });
</script>

<svg {height} {width}>
  {#each lines as l}
    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
  {/each}
</svg>

<svelte:window on:resize={onResize} />

<style>
  svg {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 99;
  }
  line {
    stroke: white;
    stroke-width: 2px;
  }
</style>
