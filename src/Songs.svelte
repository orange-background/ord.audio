<script lang="ts">
  import Song from "./Song.svelte";
  import songs from "../scripts/songs.json";
  import VirtualList from "svelte-tiny-virtual-list";
  import { HEADER_HEIGHT } from "./grid";
  import Player from "./Player.svelte";
  import { scrollToIndex } from "./store";
  import { onMount } from "svelte";

  onMount(() => {
    if (window.location.hash) {
      const str = window.location.hash.slice(1);
      const num = parseInt(str);
      if (num) {
        const idx = songs.findIndex((s) => s.num === num);
        if (idx > -1) {
          const song = songs[idx];
          scrollToIndex.set(idx);
        }
      }
    }
  });

  let player;
</script>

<Player bind:this={player} />

<VirtualList
  width="100%"
  height={window.innerHeight - HEADER_HEIGHT - 12}
  itemCount={songs.length}
  itemSize={90}
  overscanCount={3}
  scrollToIndex={$scrollToIndex}
  scrollToAlignment="start"
>
  <div slot="item" let:index let:style {style}>
    <Song song={songs[index]} on:interaction={player.interaction} />
  </div>
</VirtualList>
