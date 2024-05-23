// export let ROOT = '/content'
export let ROOT = "https://ordin-delta.vercel.app/content";
// "https://ordin-delta.vercel.app/content/d73c317d0ad0c0bc5244cf945651c9bc4ed44ea3fad76ab30f49a07e90e704a3i0";

export interface Song {
  id: string;
  name: string;
  mime: string;
  num: number;
  size: number;
  block: number;
  ms: number;
}

export function formatTime(ms: number) {
  const time = Math.round(ms / 1000);
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const secString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${secString}`;
}

export const songs: Song[] = [
  {
    name: "Eye on You",
    id: "d73c317d0ad0c0bc5244cf945651c9bc4ed44ea3fad76ab30f49a07e90e704a3i0",
    mime: "audio/mpeg",
    num: 892541,
    ms: 0,
    size: 0,
    block: 0,
  },
  {
    name: "Rain Life",
    id: "e8f6a8e3bef4df11318a8b504f3634fd9e41e475b993ea7017273e1a4a4afe1ei0",
    mime: "audio/mpeg",
    num: 831391,
    ms: 0,
    size: 0,
    block: 0,
  },
  {
    name: "forwarded",
    id: "c8edf45cbe6e46b52e04a91b3e3e24758cc6b274303d3e2735b3747b6cb2940ei0",
    mime: "audio/mpeg",
    num: 867339,
    ms: 0,
    size: 0,
    block: 0,
  },
  {
    name: "Wave Song",
    id: "0ee3c6f5229135ba483d7812cb2ec46ef10d329f31c243323947beb38b54ac33i0",
    mime: "audio/wav",
    num: 900909,
    ms: 0,
    size: 0,
    block: 0,
  },
  {
    name: "Gravity",
    id: "1d4d7aaebd875116b5cca84852bac16a0e0f2060c3a2703425150e479e060c65i0",
    mime: "audio/ogg",
    num: 906697,
    ms: 0,
    size: 0,
    block: 0,
  },
];

/*

MUSIC

folk
hiphop
alt
jam
diy
edm
song
rock

SOUNDS

noise
skit
ai
sfx
rando
beats
weird
sample
loop
fart

VOICE

message
history
speech
talk

*/
