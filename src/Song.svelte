<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import WaveSurfer from "wavesurfer.js";
  import PlayStop from "./bits/PlayStop.svelte";
  import { type Song as ISong, formatTime } from "./songs";
  import { playing, position as topPos, selected } from "./store";
  import * as cache from "./cache";

  export let song: ISong;

  let position: number | undefined = undefined;

  const dispatch = createEventDispatcher();

  let wavesurfer: WaveSurfer | null = null;

  $: play = $playing === song.id;

  let listenForOthers = false;

  async function surf() {
    wavesurfer = WaveSurfer.create({
      container: `#waveform-${song.id}`,
      waveColor: "white",
      progressColor: "grey",
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      fillParent: true,
      height: 42,
    });

    wavesurfer.on("interaction", interaction);

    wavesurfer.on("audioprocess", (a) => updatePos(a, false));

    wavesurfer.on("finish", () => {
      playing.set(null);
    });

    const blob = await cache.getBlob(song.id);
    // Load audio from URL
    wavesurfer.loadBlob(blob);

    wavesurfer.setMuted(true);

    if (play) {
      wavesurfer.setTime($topPos / 1000);
      wavesurfer.play();
    }

    listenForOthers = true;
  }

  function updatePos(a: number, forceTopPos: boolean) {
    const pos = Math.floor(a) * 1000;
    if (forceTopPos || pos !== position) {
      position = pos;
      topPos.set(pos);
    }
  }

  $: {
    if (listenForOthers) {
      if (play) {
        if (wavesurfer) wavesurfer.play();
      } else {
        if (wavesurfer) wavesurfer.pause();
      }
    }
  }

  function interaction(ts: number) {
    if (!play) return;
    updatePos(ts, true);
    dispatch("interaction", { ts });
  }

  onMount(surf);

  onDestroy(() => {
    wavesurfer.destroy();
  });

  function playstop() {
    if (!wavesurfer) return;
    if (!play) {
      wavesurfer.play();
      selected.set(song);
      updatePos(wavesurfer.getCurrentTime(), true);
    } else wavesurfer.pause();
    playing.set(play ? null : song.id);
  }

  function link() {
    window.open(`https://ord.io/${song.num}`, "_blank");
  }

  $: timeString =
    position !== undefined
      ? `${formatTime(position)} / ${formatTime(song.ms)}`
      : `${formatTime(song.ms)}`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="song">
  <div class="top">
    <div class="top-left">
      <div class="name">{song.name}</div>
    </div>
    <div class="top-right">
      <div class="time">{timeString}</div>
      <div class="mime">{song.mime}</div>
      <div class="num" on:click={link}>{`#${song.num}`}</div>
    </div>
  </div>
  <div class="wrap">
    <PlayStop playing={play} on:click={playstop} />
    <div id={`waveform-${song.id}`} class="waveform" />
  </div>
</div>

<style>
  .song {
    margin: 0 2rem;
    /* width: 100%; */
    max-width: 69rem;
  }
  @media only screen and (max-width: 768px) {
    .song {
      margin: 0 1rem;
    }
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
  .top-left {
    display: flex;
    align-items: center;
  }
  .top-right {
    display: flex;
    align-items: center;
  }
  .num {
    margin-left: 1.2rem;
    font-size: 1rem;
    margin-right: 0.2rem;
    cursor: pointer;
  }
  .num:hover {
    text-decoration: underline;
  }
  .mime {
    margin-left: 1.2rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
  .wrap {
    border-radius: 4rem;
    border: 2px solid white;
    height: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 4px 0 10px;
  }
  .waveform {
    width: 100%;
  }
</style>
