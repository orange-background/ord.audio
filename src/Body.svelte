<script lang="ts">
  import SongHeader from "./SongHeader.svelte";
  import Songs from "./Songs.svelte";
  import MediaQuery from "./MediaQuery.svelte";
  import { heightcss, widthcss } from "./consts";
  import Header from "./Header.svelte";

  export let ready;
</script>

<main>
  <MediaQuery query="(min-width: 768px)" let:render>
    {#if render}
      <div class="sidebar" style={widthcss}>
        <Header {ready} />
        {#if ready}
          <div class="side-main">playlists coming soon...</div>
        {/if}
      </div>
    {/if}
  </MediaQuery>

  <div class="body">
    <MediaQuery query="(max-width: 768px)" let:render>
      {#if render}<Header {ready} />{/if}
    </MediaQuery>
    <header class="song-header" style={heightcss}>
      <SongHeader />
    </header>
    <MediaQuery query="(max-width: 768px)" let:render>
      {#if render}<div class="line" />{/if}
    </MediaQuery>
    <!-- <div style={widthcss} class="sidebar" /> -->
    <div class="main-section">
      {#if ready}
        <Songs />
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    z-index: 100;
  }
  .body {
    width: 100%;
  }
  .main-section {
    margin-top: 12px;
  }
  .song-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 4px;
  }
  .side-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.5rem;
  }
  .line {
    background: white;
    height: 2px;
    width: 99%;
  }
</style>
