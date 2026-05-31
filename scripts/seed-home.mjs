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

// — Home page singleton
const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroTitle: "MountainSnap",
  heroTagline:
    "Snap, share, understand : vos photographies révèlent comment les montagnes changent et exposent les risques cachés — du Parc national du Mercantour au Mont Agung.",
  heroCtaPrimary: "Voir les stations",
  heroCtaSecondary: "Découvrir le projet",
  projectTitle:
    "MountainSnap, un projet de science participative au cœur de la recherche sur les risques naturels et les paysages.",
  projectBody: [
    "MountainSnap est un projet de science participative inspiré de CoastSnap, conçu pour mieux comprendre comment les environnements de montagne évoluent et comment les risques naturels se développent dans le temps.",
    "D'une part, il documente scientifiquement les transformations des paysages à partir d'observations standardisées collectées directement par les visiteurs. En photographiant les mêmes points à différents moments, les participants contribuent à construire des séries temporelles détaillées qui suivent l'érosion, les dépôts sédimentaires, l'instabilité des versants et les variations saisonnières.",
    "D'autre part, MountainSnap sensibilise sur le terrain en engageant activement randonneurs et communautés locales. En observant et en documentant des environnements réels, chacun développe une compréhension plus fine des processus naturels et des risques associés.",
  ].join("\n\n"),
  howItWorksSteps: [
    {
      _key: "step1",
      number: "1",
      title: "OBSERVE",
      body: "Explorez les paysages de montagne et approfondissez votre compréhension des processus géomorphologiques et des risques naturels.",
    },
    {
      _key: "step2",
      number: "2",
      title: "SNAP",
      body: "Posez votre téléphone sur le support dédié pour capturer exactement le même cadrage à chaque visite.",
    },
    {
      _key: "step3",
      number: "3",
      title: "SHARE !",
      body: "Déposez la photographie sur la plateforme, contribuez à la communauté et restez informé des évolutions du paysage.",
    },
  ],
  agungTitle: "Mont Agung — Bali",
  agungBody:
    "Le programme s'étendra prochainement aux pentes du Mont Agung, volcan actif de Bali. De nouvelles stations seront installées en collaboration avec les communautés locales pour documenter les risques volcaniques et les transformations du paysage.",
  agungStatus: "Stations à venir",
  contactName: "Anna Minnema",
  contactRole: "coordinatrice scientifique",
  contactEmail: "Anna.minnema@univ-paris1.fr",
  contactAffiliation:
    "Université Paris 1 Panthéon-Sorbonne · Laboratoire de Géographie Physique",
};

// — Publications
const publications = [
  {
    _id: "publication-1",
    _type: "publication",
    title:
      "Minnema A. et al. (à paraître) — Photographie répétée et dynamique des paysages alpins.",
    order: 10,
  },
  {
    _id: "publication-2",
    _type: "publication",
    title:
      "Coulthard T. et al. — CoastSnap as a methodological reference for citizen sensing.",
    order: 20,
  },
  {
    _id: "publication-3",
    _type: "publication",
    title: "Mercantour Research Programme — Annual report (2026).",
    order: 30,
  },
];

// — Partners
const partners = [
  { _id: "partner-1", _type: "partner", name: "Parc national du Mercantour", shortName: "Mercantour", order: 10 },
  { _id: "partner-2", _type: "partner", name: "Laboratoire de Géographie Physique (UMR 8591)", shortName: "LGP", order: 20 },
  { _id: "partner-3", _type: "partner", name: "Face aux Risques, Agissons", shortName: "FARA", order: 30 },
  { _id: "partner-4", _type: "partner", name: "CNRS", shortName: "CNRS", order: 40 },
  { _id: "partner-5", _type: "partner", name: "France 2030", shortName: "France 2030", order: 50 },
];

const tx = client.transaction();
tx.createOrReplace(homePage);
for (const p of publications) tx.createOrReplace(p);
for (const p of partners) tx.createOrReplace(p);

const res = await tx.commit();
console.log(
  "Seeded:",
  res.results.map((r) => r.id).join(", ")
);
