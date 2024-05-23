<script lang="ts">
  import { position, selected } from "./store";
  import { formatTime } from "./songs";
  import songs from "../scripts/songs.json";
</script>

{#if $selected}
  <div class="left">
    <div class="num marg">
      {`#${$selected.num}`}
    </div>
    <!-- <div class="name">
      {$selected.name || "Unnamed"}
    </div> -->
    <div class="time-wrap">
      <div class="time-pos">
        {formatTime($position)}
      </div>
      <div class="time-slash">/</div>
      <div class="time-ms">
        {formatTime($selected.ms)}
      </div>
    </div>
  </div>
{:else}
  <div />
{/if}

<div class="right">
  <div class="count marg">
    {`Total: ${songs.length}`}
  </div>
</div>

<style>
  .left {
    display: flex;
    align-items: center;
  }
  /* .name {
    font-size: 1.2rem;
    margin: 0 2rem;
    display: flex;
    align-items: flex-end;
  } */
  .time-wrap {
    background: #ccc;
    border-radius: 0.25rem;
    width: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Orbitron;
    font-weight: 700;
    font-size: 1.1rem;
    color: black;
  }
  .time-pos {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.2rem;
  }
  .time-slash {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.6rem;
  }
  .time-ms {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.2rem;
  }
  .num {
    font-size: 1.2rem;
  }
  .marg {
    margin: 0 2rem;
  }
  @media only screen and (max-width: 768px) {
    .marg {
      margin: 0 1rem;
    }
  }
</style>
