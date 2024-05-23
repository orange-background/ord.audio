import localforage from "localforage";

const cache = localforage.createInstance({
  name: "cache",
});

export let ROOT = "https://ordin-delta.vercel.app/content";

export async function getBlob(id: string) {
  try {
    const c = await cache.getItem<Blob>(id);
    if (c) return c;
    console.log("fetch =>", id);
    const r = await fetch(`${ROOT}/${id}`);
    const b = await r.blob();
    await cache.setItem<Blob>(id, b);
    return b;
  } catch (e) {
    console.log("getBlob failed:", e);
  }
}
