import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

// Load .env.local manually (no dotenv dependency)
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

const stations = [
  {
    _id: "station-1",
    _type: "station",
    number: 1,
    name: "Col de la Cayolle",
    slug: { _type: "slug", current: "1" },
    location: "Vallée du Var",
    altitude: "2 326 m",
    bearing: "Nord-Est",
    description:
      "Point d'observation orienté vers le massif du Pelat. Vue dégagée sur les versants nord et les premières pelouses alpines, sensibles aux variations climatiques saisonnières.",
    pedagogicalText:
      "Ce poste documente l'évolution du couvert neigeux et la recolonisation végétale des pelouses d'altitude, indicateurs sensibles du réchauffement.",
  },
  {
    _id: "station-2",
    _type: "station",
    number: 2,
    name: "Lac d'Allos",
    slug: { _type: "slug", current: "2" },
    location: "Vallée du Verdon",
    altitude: "2 230 m",
    bearing: "Sud-Ouest",
    description:
      "Cadre lacustre au pied du Mont Pelat. Le poste capture l'évolution du couvert végétal et l'enneigement résiduel sur les versants visibles depuis la rive ouest.",
    pedagogicalText:
      "L'enneigement résiduel et le niveau du lac renseignent sur les régimes hydrologiques et la fonte saisonnière du plus grand lac naturel d'altitude d'Europe.",
  },
  {
    _id: "station-3",
    _type: "station",
    number: 3,
    name: "Vallée des Merveilles",
    slug: { _type: "slug", current: "3" },
    location: "Massif du Mercantour",
    altitude: "2 100 m",
    bearing: "Est",
    description:
      "Site emblématique du parc, environné de gravures rupestres. Le point fixe documente la dynamique des éboulis, des névés et de la végétation rupicole.",
    pedagogicalText:
      "Les éboulis et névés observés ici témoignent des processus d'érosion périglaciaire et de l'instabilité des versants en haute montagne.",
  },
];

const tx = client.transaction();
for (const s of stations) tx.createOrReplace(s);
const res = await tx.commit();
console.log("Seeded stations:", res.results.map((r) => r.id).join(", "));
