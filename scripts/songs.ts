import type { Inscription } from "./pull";
import * as fs from "fs";
import type { Song } from "../src/songs";
import { getAudioDurationInSeconds } from "get-audio-duration";
import got from "got";

const FILE = "audio.json";
// const FILE = "audio-test.json";

function itosong(i: Inscription): Song {
  return {
    name: "",
    id: i.id,
    num: i.number,
    mime: i.mime_type,
    size: i.content_length,
    block: i.genesis_block_height,
    ms: 0,
  };
}

async function go() {
  try {
    let rawdata = fs.readFileSync(FILE, "utf-8");
    let audios: Inscription[] = JSON.parse(rawdata);
    let songs = audios.map(itosong);
    songs.sort((a, b) => Math.abs(a.num) - Math.abs(b.num));
    const final: Song[] = [];
    for (let i = 0; i < songs.length; i++) {
      const sg = songs[i];
      console.log("#", sg.num);
      const ts = await getMillis(sg);
      if (ts) {
        final.push({ ...sg, ms: ts });
      } else {
        console.log("skip #", sg.num);
      }
    }
    // const v = makeVarString(final);
    fs.writeFileSync("songs.json", JSON.stringify(final));
  } catch (e) {
    console.error(e);
  }
}
go();

const nopes: { [k: string]: boolean } = {};

async function getMillis(s: Song): Promise<number> {
  let path = "https://ordin-delta.vercel.app/content";
  let fullpath = `${path}/${s.id}`;
  // let fullpath = "songz/steph.wav";
  const localpath = `songz/${s.id}`;
  try {
    await streamFileToLocal(fullpath, localpath);
    const secs = await getAudioDurationInSeconds(localpath);
    console.log("=>", secs);
    fs.unlinkSync(localpath);
    return Math.floor(secs * 1000);
  } catch (e) {
    console.log(e);
    nopes[s.id] = true;
    fs.unlinkSync(localpath);
    return 0;
  }
}

function streamFileToLocal(fullpath: string, localpath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let fileWriterStream = fs.createWriteStream(localpath);
    const downloadStream = got.stream(fullpath);
    downloadStream.on("error", (error) => {
      reject();
    });
    fileWriterStream.on("error", () => {
      reject();
    });
    fileWriterStream.on("finish", () => {
      resolve();
    });
    downloadStream.pipe(fileWriterStream);
  });
}

function makeVarString(songs: Song[]) {
  let s = "export const songs = [";
  for (let song of songs) {
    s += JSON.stringify(song);
    s += ",";
  }
  s = s.substring(0, s.length - 1);
  s += "]";
  return s;
}
