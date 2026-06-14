// Seeds the `siteSettings` singleton.
// - Pulls contact* fields out of the existing homePage doc (if present)
// - Seeds nav + footer + general defaults from the current site values
//
// Usage:
//   node scripts/seed-site-settings.mjs            # dry run (prints, writes nothing)
//   node scripts/seed-site-settings.mjs --write    # actually writes to Sanity
//
// Idempotent: uses createIfNotExists, so it will NOT overwrite an existing
// siteSettings document. Delete it in the Studio first if you want a reseed.

import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const WRITE = process.argv.includes("--write");

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

const home = await client.fetch(`*[_type == "homePage"][0]{
  contactName, contactRole, contactEmail, contactAffiliation
}`);

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Mountainsnap",
  siteDescription:
    "Une recherche participative sur l’évolution des paysages de montagne et les risques naturels associés — du Mercantour au Mont Agung.",
  navLinks: [
    { _key: "nav1", label: "Mercantour", href: "/#mercantour" },
    { _key: "nav2", label: "Agung", href: "/#agung" },
    { _key: "nav3", label: "Ressources", href: "/#ressources" },
  ],
  footerScienceTitle: "Cadre scientifique",
  footerScienceLines: [
    "Université Paris 1 Panthéon-Sorbonne",
    "Laboratoire de Géographie Physique (UMR 8591)",
    "Parc national du Mercantour · CNRS",
  ],
  footerOpenDataTitle: "Données ouvertes",
  footerOpenDataText:
    "Les photographies déposées sont publiques et téléchargeables, dans l’esprit de la science participative.",
  footerTagline: "Mercantour, Alpes-Maritimes · Mont Agung, Bali",
  // Contact — migrated from homePage if it exists, else sensible defaults
  contactName: home?.contactName ?? "Anna Minnema",
  contactRole: home?.contactRole ?? "coordinatrice scientifique",
  contactEmail: home?.contactEmail ?? "Anna.minnema@univ-paris1.fr",
  contactAffiliation:
    home?.contactAffiliation ??
    "Université Paris 1 Panthéon-Sorbonne · Laboratoire de Géographie Physique",
};

const existing = await client.fetch(`*[_id == "siteSettings"][0]{ _id }`);

console.log("— Source contact (from homePage):", home ?? "(no homePage doc)");
console.log("— siteSettings document to seed:");
console.log(JSON.stringify(siteSettings, null, 2));

if (existing) {
  console.log(
    "\nℹ️  A siteSettings document already exists — createIfNotExists will leave it untouched."
  );
}

if (!WRITE) {
  console.log("\n🟡 DRY RUN — nothing written. Re-run with --write to apply.");
  process.exit(0);
}

await client.createIfNotExists(siteSettings);
console.log("\n✅ siteSettings seeded.");
