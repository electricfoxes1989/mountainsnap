/**
 * ⚠️ PRODUCTION MIGRATION — DO NOT RUN WITHOUT ANNA'S SIGN-OFF.
 *
 * Converts the live French single-language content in bol319qw into
 * trilingual { fr, en, id } locale objects, keeping the current French values
 * as `fr` (fetched live at run time) and adding the EN + ID translations
 * authored for the Indonesia build (2026-07-20). Also stamps
 * region: "mercantour" on existing stations.
 *
 * The frontend on the `indonesia-trilingual` branch works BEFORE and AFTER
 * this migration (GROQ falls back to plain strings), so the safe order is:
 *   1. review branch → 2. run this with --dry-run → 3. run with --yes →
 *   4. merge + deploy branch.
 *
 * Run: node scripts/migrate-trilingual.mjs --dry-run   (prints patches)
 *      node scripts/migrate-trilingual.mjs --yes       (writes to production)
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

if (env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "bol319qw") {
  console.error(
    `Refusing to run: expected project bol319qw, got ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}`
  );
  process.exit(1);
}

const dry = process.argv.includes("--dry-run");
const yes = process.argv.includes("--yes");
if (!dry && !yes) {
  console.error("Pass --dry-run to preview, or --yes to write to PRODUCTION (bol319qw).");
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-05-08",
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// EN + ID translations of the French source copy (authored 2026-07-20).
const EN_ID = {
  homePage: {
    heroTagline: {
      en: "Snap, share, understand: your photographs reveal how mountains change and expose hidden risks — from the Mercantour National Park to Mount Agung.",
      id: "Snap, share, understand: foto-foto Anda mengungkap bagaimana pegunungan berubah dan menyingkap risiko tersembunyi — dari Taman Nasional Mercantour hingga Gunung Agung.",
    },
    heroCtaPrimary: { en: "View the stations", id: "Lihat stasiun" },
    heroCtaSecondary: { en: "Discover the project", id: "Kenali proyek ini" },
    projectTitle: {
      en: "MountainSnap, a citizen-science project at the heart of research on natural hazards and landscapes.",
      id: "MountainSnap, proyek sains warga yang berada di jantung penelitian tentang bahaya alam dan bentang alam.",
    },
    projectBody: {
      en: `MountainSnap is a citizen-science project inspired by CoastSnap, designed to better understand how mountain environments evolve and how natural hazards develop over time.

On one hand, it scientifically documents landscape transformations through standardised observations collected directly by visitors. By photographing the same points at different moments, participants help build detailed time series that track erosion, sediment deposits, slope instability and seasonal variations.

On the other hand, MountainSnap raises awareness in the field by actively engaging hikers and local communities. By observing and documenting real environments, everyone develops a finer understanding of natural processes and the risks associated with them.`,
      id: `MountainSnap adalah proyek sains warga yang terinspirasi oleh CoastSnap, dirancang untuk lebih memahami bagaimana lingkungan pegunungan berevolusi dan bagaimana bahaya alam berkembang dari waktu ke waktu.

Di satu sisi, proyek ini mendokumentasikan transformasi bentang alam secara ilmiah melalui pengamatan terstandar yang dikumpulkan langsung oleh para pengunjung. Dengan memotret titik yang sama pada waktu yang berbeda, para peserta membantu membangun rangkaian data waktu yang terperinci untuk memantau erosi, endapan sedimen, ketidakstabilan lereng, dan variasi musiman.

Di sisi lain, MountainSnap meningkatkan kesadaran di lapangan dengan melibatkan para pendaki dan masyarakat setempat secara aktif. Dengan mengamati dan mendokumentasikan lingkungan nyata, setiap orang mengembangkan pemahaman yang lebih mendalam tentang proses alam dan risiko yang menyertainya.`,
    },
    stepBodies: {
      step1: {
        en: "Explore mountain landscapes and deepen your understanding of geomorphological processes and natural hazards.",
        id: "Jelajahi bentang alam pegunungan dan perdalam pemahaman Anda tentang proses geomorfologi dan bahaya alam.",
      },
      step2: {
        en: "Place your phone on the dedicated cradle to capture exactly the same framing on every visit.",
        id: "Letakkan ponsel Anda pada dudukan yang tersedia untuk menangkap bingkai yang persis sama pada setiap kunjungan.",
      },
      step3: {
        en: "Upload the photograph to the platform, contribute to the community and stay informed about how the landscape is changing.",
        id: "Unggah foto ke platform, berkontribusilah kepada komunitas, dan tetap dapatkan informasi tentang perubahan bentang alam.",
      },
    },
    agungTitle: { en: "Mount Agung — Bali", id: "Gunung Agung — Bali" },
    agungBody: {
      en: "The programme will soon extend to the slopes of Mount Agung, an active volcano in Bali. New stations will be installed in collaboration with local communities to document volcanic hazards and landscape transformations.",
      id: "Program ini akan segera diperluas ke lereng Gunung Agung, gunung berapi aktif di Bali. Stasiun-stasiun baru akan dipasang bekerja sama dengan masyarakat setempat untuk mendokumentasikan bahaya vulkanik dan transformasi bentang alam.",
    },
    agungStatus: { en: "Stations coming soon", id: "Stasiun segera hadir" },
  },
  siteSettings: {
    siteDescription: {
      en: "Participatory research into the evolution of mountain landscapes and their associated natural hazards — from the Mercantour to Mount Agung.",
      id: "Penelitian partisipatif tentang evolusi bentang alam pegunungan dan bahaya alam terkait — dari Mercantour hingga Gunung Agung.",
    },
    navLabels: {
      Mercantour: { en: "Mercantour", id: "Mercantour" },
      Agung: { en: "Agung", id: "Agung" },
      Ressources: { en: "Resources", id: "Sumber Daya" },
    },
    footerScienceTitle: { en: "Scientific framework", id: "Kerangka ilmiah" },
    footerOpenDataTitle: { en: "Open data", id: "Data terbuka" },
    footerOpenDataText: {
      en: "Submitted photographs are public and downloadable, in the spirit of citizen science.",
      id: "Foto yang diunggah bersifat publik dan dapat diunduh, sesuai dengan semangat sains warga.",
    },
    footerTagline: {
      en: "Mercantour, Alpes-Maritimes · Mount Agung, Bali",
      id: "Mercantour, Alpes-Maritimes · Gunung Agung, Bali",
    },
    contactRole: { en: "scientific coordinator", id: "koordinator ilmiah" },
  },
};

// Wrap a live value into { fr, en, id }. Already-migrated objects pass through
// (their fr is kept), so the script is safe to re-run.
function tri(current, translations) {
  if (current == null && !translations) return undefined;
  if (typeof current === "object" && current !== null && !Array.isArray(current)) {
    return { ...translations, ...current };
  }
  return { fr: current ?? undefined, ...translations };
}

async function main() {
  const [home, settings, stations] = await Promise.all([
    client.getDocument("homePage"),
    client.getDocument("siteSettings"),
    client.fetch('*[_type == "station"]{_id, name, region, bearing, description, pedagogicalText}'),
  ]);

  const H = EN_ID.homePage;
  const homePatch = {
    heroTagline: tri(home.heroTagline, H.heroTagline),
    heroCtaPrimary: tri(home.heroCtaPrimary, H.heroCtaPrimary),
    heroCtaSecondary: tri(home.heroCtaSecondary, H.heroCtaSecondary),
    projectTitle: tri(home.projectTitle, H.projectTitle),
    projectBody: tri(home.projectBody, H.projectBody),
    howItWorksSteps: (home.howItWorksSteps ?? []).map((step) => ({
      ...step,
      title: tri(step.title, { en: undefined, id: undefined }),
      body: tri(step.body, H.stepBodies[step._key] ?? {}),
    })),
    agungTitle: tri(home.agungTitle, H.agungTitle),
    agungBody: tri(home.agungBody, H.agungBody),
    agungStatus: tri(home.agungStatus, H.agungStatus),
  };

  const S = EN_ID.siteSettings;
  const settingsPatch = {
    siteDescription: tri(settings.siteDescription, S.siteDescription),
    navLinks: (settings.navLinks ?? []).map((link) => {
      const label = typeof link.label === "string" ? link.label : link.label?.fr;
      return { ...link, label: tri(link.label, S.navLabels[label] ?? {}) };
    }),
    footerScienceTitle: tri(settings.footerScienceTitle, S.footerScienceTitle),
    footerOpenDataTitle: tri(settings.footerOpenDataTitle, S.footerOpenDataTitle),
    footerOpenDataText: tri(settings.footerOpenDataText, S.footerOpenDataText),
    footerTagline: tri(settings.footerTagline, S.footerTagline),
    contactRole: tri(settings.contactRole, S.contactRole),
  };

  const stationPatches = stations.map((s) => {
    const patch = { region: s.region ?? "mercantour" };
    for (const f of ["bearing", "description", "pedagogicalText"]) {
      if (typeof s[f] === "string") patch[f] = { fr: s[f] };
    }
    return { _id: s._id, name: s.name, patch };
  });

  if (dry) {
    console.log(JSON.stringify({ homePatch, settingsPatch, stationPatches }, null, 2));
    console.log("\n--dry-run only: nothing written.");
    return;
  }

  await client.patch("homePage").set(homePatch).commit();
  console.log("✔ homePage → { fr, en, id }");
  await client.patch("siteSettings").set(settingsPatch).commit();
  console.log("✔ siteSettings → { fr, en, id }");
  for (const { _id, name, patch } of stationPatches) {
    await client.patch(_id).set(patch).commit();
    console.log(`✔ station ${name} → region + locale fields`);
  }
  console.log("Done. Verify /fr, /en and /id, then merge the branch.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
