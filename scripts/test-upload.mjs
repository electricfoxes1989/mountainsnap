import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.trim().startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Minimal valid 1x1 red JPEG
const jpegBase64 =
  "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAAv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AvwA//9k=";
const buffer = Buffer.from(jpegBase64, "base64");

console.log("1. Uploading test asset…");
const asset = await client.assets.upload("image", buffer, {
  filename: "test-upload.jpg",
});
console.log("   asset _id:", asset._id);

console.log("2. Creating photo document for station-1…");
const now = new Date().toISOString();
const doc = await client.create({
  _type: "photo",
  station: { _type: "reference", _ref: "station-1" },
  image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  takenAt: now,
  uploadedAt: now,
});
console.log("   photo _id:", doc._id);

console.log("3. Querying photos for station-1…");
const photos = await client.fetch(
  `*[_type=="photo" && station._ref=="station-1"]{_id, takenAt}`
);
console.log("   found:", photos.length, "photo(s)");

console.log("4. Cleaning up test photo + asset…");
await client.delete(doc._id);
await client.delete(asset._id);
console.log("   cleaned up.");

console.log("\n✅ Upload pipeline works end-to-end.");
