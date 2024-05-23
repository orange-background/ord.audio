<script>
  import { fade } from "svelte/transition";
  import Logo from "./bits/Logo.svelte";
  import { heightcss, widthcss } from "./consts";
  import songs from "../scripts/songs.json";
  import { scrollToIndex } from "./store";
  import { selected, playing } from "./store";

  export let ready = false;

  let diceFlip = false;

  function pickRandom() {
    const randomIdx = Math.floor(Math.random() * songs.length);
    const random = songs[randomIdx].num;
    window.location.href = `/#${random}`;
    scrollToIndex.set(randomIdx);
    const song = songs[randomIdx];
    if (song) {
      playing.set(null);
      setTimeout(() => {
        selected.set(song);
        playing.set(song.id);
      }, 1000);
    }
  }

  function flipDice() {
    diceFlip = !diceFlip;
    setTimeout(() => {
      diceFlip = !diceFlip;
      pickRandom();
    }, 300);
  }
</script>

<header style={heightcss}>
  <div
    transition:fade={{ duration: 1 }}
    style={window.innerWidth > 768 ? widthcss : "width:100%;"}
    class="head-inside"
  >
    {#if ready}
      <div class="head-left">
        <div class="head-icon"><Logo /></div>
        <div class="head-name">ord.audio</div>
      </div>
      <div class="head-right">
        <img
          on:click={flipDice}
          on:keypress={flipDice}
          class="dice"
          src="/dice.svg"
          alt="dice"
          style={`transform:rotate(${diceFlip ? "0" : "180"}deg)`}
        />
      </div>
    {/if}
  </div>
</header>

<style>
  .head-inside {
    padding-top: 1px;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
  }
  .head-name {
    padding-top: 5px;
    font-weight: 700;
    font-size: 1.3rem;
    letter-spacing: 0.2rem;
  }
  .head-icon {
    display: flex;
    height: 100%;
    width: 4rem;
    align-items: center;
    justify-content: center;
  }
  .head-left {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .head-right {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0.6rem;
  }
  .dice {
    cursor: pointer;
    height: 2.2rem;
    width: 2.2rem;
  }
</style>
