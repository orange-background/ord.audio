import got from "got";
import * as fs from "fs";

const root = "https://api.hiro.so/ordinals/v1/inscriptions";

const mimes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/flac"];

const filename = "audio.json";

/* 

curl -L 'https://api.hiro.so/ordinals/v1/inscriptions?mime_type=application/wasm' -H 'Accept: application/json'

*/

export interface Inscription {
  id: string;
  number: number;
  address: string;
  genesis_address: string;
  genesis_block_height: number;
  genesis_block_hash: string;
  genesis_tx_id: string;
  genesis_fee: string;
  genesis_timestamp: number;
  tx_id: string;
  location: string;
  output: string;
  value: string;
  offset: string;
  sat_ordinal: string;
  sat_rarity: string;
  sat_coinbase_height: number;
  mime_type: string;
  content_type: string;
  content_length: number;
  timestamp: number;
}

interface GetResult {
  limit: number;
  offset: number;
  total: number;
  results: Inscription[];
}

const already: { [k: string]: boolean } = {};

async function getInscriptions(mime): Promise<Inscription[]> {
  console.log("=> getInscriptions", mime);
  let offset = 0;
  const limit = 60;
  let results: Inscription[] = [];
  while (true) {
    const data: GetResult = await got
      .get(`${root}?mime_type=${mime}&limit=${limit}&offset=${offset}`)
      .json();
    for (var result of data.results) {
      if (!already[result.id]) {
        results.push(result);
        already[result.id] = true;
      }
    }
    if (data.offset >= data.total) {
      break;
    }
    offset += limit;
  }
  return results;
}

async function getAllAudios(): Promise<Inscription[]> {
  let res: Inscription[] = [];
  for (let mime of mimes) {
    const ins = await getInscriptions(mime);
    res = [...res, ...ins];
  }
  return res;
}

async function pull() {
  const res = await getAllAudios();
  console.log("=> TOTAL ", res.length);
  const data = JSON.stringify(res, null, 2);
  fs.writeFileSync(filename, data);
}

pull();
