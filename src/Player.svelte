<script lang="ts">
  import { position, playing, selected } from "./store";
  import WaveSurfer from "wavesurfer.js";
  import * as cache from "./cache";

  let wavesurfer: WaveSurfer | null = null;

  export const interaction = function (a) {
    if (wavesurfer) {
      wavesurfer.setTime(a.detail.ts);
    }
  };

  $: {
    if ($playing) {
      if ($playing === $selected.id) {
        surf($playing);
      }
    } else {
      if (wavesurfer) {
        wavesurfer.pause();
      }
    }
  }

  async function surf(song_id: string) {
    if (wavesurfer) wavesurfer.destroy();

    wavesurfer = WaveSurfer.create({
      container: `#no-waveform`,
      height: 0,
    });

    wavesurfer.on("ready", function () {});

    wavesurfer.on("finish", function () {
      // playing.set(null);
    });

    const blob = await cache.getBlob(song_id);

    // Load audio from URL
    wavesurfer.loadBlob(blob);

    if ($position) {
      const pos = Math.floor($position) / 1000;
      // console.log($position, pos);
      wavesurfer.setTime(pos);
    }

    wavesurfer.play();
  }
</script>

<div id="no-waveform" style="width:0px;height:0px" />
