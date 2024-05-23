import { writable } from "svelte/store";
import type { Song } from "./songs";
import type WaveSurfer from "wavesurfer.js";

// export const surfers = writable<{ [k: string]: WaveSurfer }>({});

export const playing = writable<string | null>(null);

export const position = writable<number>(0);

export const selected = writable<Song>();

export interface Context {
  interaction: (a: any) => void;
}

export const symbol = Symbol();

export const scrollToIndex = writable<number>(0);
