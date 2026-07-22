// Trilingual UI strings — French (default) + English + Indonesian.
// Sanity content carries its own { fr, en, id } fields; this file only covers
// strings hardcoded in the frontend.

export const locales = ["fr", "en", "id"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "fr";

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

export type Region = "mercantour" | "agung";

type Dict = {
  // Metadata
  metaTitle: string;
  metaDescription: string;
  ogLocale: string;
  dateLocale: string;

  // Header / footer chrome
  homeAria: (siteName: string) => string;
  navAria: string;
  switcherAria: string;
  navFallback: { label: string; href: string }[];
  footerScienceTitle: string;
  footerOpenDataTitle: string;
  footerOpenDataText: string;
  footerDescription: string;
  footerTagline: string;

  // Regions
  regionName: (region: Region) => string;
  stationsBannerMercantour: string;
  stationsBannerAgung: string;

  // Home page
  partnersHeading: string;
  station: (n: number) => string;
  uploadCta: string;
  stationsEmpty: string;
  pedagogicalBanner: string;
  intlExtension: string;
  publicationsHeading: string;
  publicationsEmpty: string;
  contactHeading: string;
  projectImageAlt: string;
  howImageAlt: string;

  // Live stats
  statsDays: (n: number) => string;
  statsPhotos: (n: number) => string;
  statsStations: (n: number) => string;
  liveAria: string;

  // Station page
  stationBanner: (region: Region, n: number) => string;
  archiveBanner: (n: number) => string;
  back: string;
  altitudeLabel: string;
  bearingLabel: string;
  uploadHeading: string;
  uploadSub: string;
  previousPhotos: string;
  photoCount: (n: number) => string;
  otherStations: string;
  stationMetaDescription: (n: number, name: string) => string;
  breadcrumbHome: string;

  // Upload form
  formTitle: string;
  formStation: (n: string) => string;
  chooseGallery: string;
  takePhoto: string;
  previewAlt: string;
  chooseAnother: string;
  submitting: string;
  submit: string;
  moderationNote: string;
  successTitle: string;
  successBody: string;

  // Server action errors
  errNoFile: string;
  errNoStation: string;
  errTooBig: string;
  errBadFormat: string;
  errNotConfigured: string;
  errFailed: string;

  // Gallery
  galleryEmptyTitle: string;
  galleryEmptyBody: string;
  photoAlt: (date: string) => string;
  download: string;
  downloadAria: string;
};

export const dict: Record<Lang, Dict> = {
  fr: {
    metaTitle:
      "MountainSnap — Photographier l'évolution des paysages du Mercantour",
    metaDescription:
      "Un projet de recherche participative. Photographiez les paysages depuis des points d'observation fixes pour suivre leur évolution dans le temps — du Mercantour au Mont Agung.",
    ogLocale: "fr_FR",
    dateLocale: "fr-FR",

    homeAria: (siteName) => `Accueil ${siteName}`,
    navAria: "Navigation principale",
    switcherAria: "Changer de langue",
    navFallback: [
      { label: "Mercantour", href: "/#mercantour" },
      { label: "Agung", href: "/#agung" },
      { label: "Ressources", href: "/#ressources" },
    ],
    footerScienceTitle: "Cadre scientifique",
    footerOpenDataTitle: "Données ouvertes",
    footerOpenDataText:
      "Les photographies déposées sont publiques et téléchargeables, dans l'esprit de la science participative.",
    footerDescription:
      "Une recherche participative sur l'évolution des paysages de montagne et les risques naturels associés — du Mercantour au Mont Agung.",
    footerTagline: "Mercantour, Alpes-Maritimes · Mont Agung, Bali",

    regionName: (r) => (r === "agung" ? "Mont Agung" : "Mercantour"),
    stationsBannerMercantour: "STATIONS · PARC NATIONAL DU MERCANTOUR",
    stationsBannerAgung: "STATIONS · MONT AGUNG, BALI",

    partnersHeading: "Partenaires & soutiens",
    station: (n) => `Station n°${n}`,
    uploadCta: "PUBLIER",
    stationsEmpty: "Les stations seront bientôt disponibles.",
    pedagogicalBanner: "TEXTE PÉDAGOGIQUE — PHÉNOMÈNE OBSERVÉ",
    intlExtension: "Extension internationale",
    publicationsHeading: "Publications",
    publicationsEmpty: "Les publications seront annoncées au fur et à mesure.",
    contactHeading: "Contact",
    projectImageAlt: "Illustration du projet MountainSnap",
    howImageAlt: "Paysage de montagne capturé depuis un point d'observation",

    statsDays: (n) => (n === 1 ? "jour d'archive" : "jours d'archive"),
    statsPhotos: (n) =>
      n === 1 ? "photographie déposée" : "photographies déposées",
    statsStations: (n) => (n === 1 ? "station active" : "stations actives"),
    liveAria: "en direct",

    stationBanner: (region, n) =>
      `${region === "agung" ? "MONT AGUNG" : "MERCANTOUR"} · STATION N°${n}`,
    archiveBanner: (n) => `ARCHIVE · STATION N°${n}`,
    back: "← Retour",
    altitudeLabel: "Altitude",
    bearingLabel: "Orientation",
    uploadHeading: "Publier votre photographie",
    uploadSub: "Cadrez selon le repère du poste, puis déposez votre image.",
    previousPhotos: "Photographies précédentes",
    photoCount: (n) =>
      `${n} photographie${n > 1 ? "s" : ""} · ordre chronologique`,
    otherStations: "Autres stations",
    stationMetaDescription: (n, name) =>
      `Point d'observation n°${n} : ${name}. Photographiez le paysage depuis le repère fixe pour suivre son évolution.`,
    breadcrumbHome: "Accueil",

    formTitle: "Déposer une photographie",
    formStation: (n) => `Station ${n}`,
    chooseGallery: "Choisir depuis la galerie",
    takePhoto: "Prendre une photo",
    previewAlt: "Aperçu de votre photographie",
    chooseAnother: "Choisir une autre photo",
    submitting: "Envoi en cours…",
    submit: "PUBLIER",
    moderationNote:
      "Votre photographie sera validée par l'équipe scientifique avant publication · Aucune information personnelle requise.",
    successTitle: "Merci pour votre envoi !",
    successBody:
      "Elle sera publiée dans la galerie après validation par l'équipe scientifique.",

    errNoFile: "Aucune photographie sélectionnée.",
    errNoStation: "Station introuvable.",
    errTooBig: "La photographie dépasse 15 Mo.",
    errBadFormat: "Format non pris en charge.",
    errNotConfigured: "Service de dépôt non configuré.",
    errFailed: "Le dépôt a échoué. Merci de réessayer dans un instant.",

    galleryEmptyTitle: "Aucune photographie pour l'instant.",
    galleryEmptyBody: "Soyez la première personne à contribuer.",
    photoAlt: (date) => `Photographie déposée le ${date}`,
    download: "Télécharger ↓",
    downloadAria: "Télécharger cette photographie",
  },

  en: {
    metaTitle: "MountainSnap — Photographing changing mountain landscapes",
    metaDescription:
      "A participatory research project. Photograph landscapes from fixed observation points to track how they change over time — from the Mercantour to Mount Agung.",
    ogLocale: "en_US",
    dateLocale: "en-GB",

    homeAria: (siteName) => `${siteName} home`,
    navAria: "Main navigation",
    switcherAria: "Change language",
    navFallback: [
      { label: "Mercantour", href: "/#mercantour" },
      { label: "Agung", href: "/#agung" },
      { label: "Resources", href: "/#ressources" },
    ],
    footerScienceTitle: "Scientific framework",
    footerOpenDataTitle: "Open data",
    footerOpenDataText:
      "Submitted photographs are public and downloadable, in the spirit of citizen science.",
    footerDescription:
      "Participatory research into the evolution of mountain landscapes and their associated natural hazards — from the Mercantour to Mount Agung.",
    footerTagline: "Mercantour, Alpes-Maritimes · Mount Agung, Bali",

    regionName: (r) => (r === "agung" ? "Mount Agung" : "Mercantour"),
    stationsBannerMercantour: "STATIONS · MERCANTOUR NATIONAL PARK",
    stationsBannerAgung: "STATIONS · MOUNT AGUNG, BALI",

    partnersHeading: "Partners & supporters",
    station: (n) => `Station No. ${n}`,
    uploadCta: "UPLOAD",
    stationsEmpty: "Stations will be available soon.",
    pedagogicalBanner: "EDUCATIONAL NOTES — OBSERVED PHENOMENON",
    intlExtension: "International extension",
    publicationsHeading: "Publications",
    publicationsEmpty: "Publications will be announced as they become available.",
    contactHeading: "Contact",
    projectImageAlt: "Illustration of the MountainSnap project",
    howImageAlt: "Mountain landscape captured from an observation point",

    statsDays: (n) => (n === 1 ? "day of archive" : "days of archive"),
    statsPhotos: (n) => (n === 1 ? "photograph submitted" : "photographs submitted"),
    statsStations: (n) => (n === 1 ? "active station" : "active stations"),
    liveAria: "live",

    stationBanner: (region, n) =>
      `${region === "agung" ? "MOUNT AGUNG" : "MERCANTOUR"} · STATION NO. ${n}`,
    archiveBanner: (n) => `ARCHIVE · STATION NO. ${n}`,
    back: "← Back",
    altitudeLabel: "Altitude",
    bearingLabel: "Bearing",
    uploadHeading: "Submit your photograph",
    uploadSub: "Frame your shot using the station marker, then upload your image.",
    previousPhotos: "Previous photographs",
    photoCount: (n) =>
      `${n} photograph${n === 1 ? "" : "s"} · chronological order`,
    otherStations: "Other stations",
    stationMetaDescription: (n, name) =>
      `Observation point No. ${n}: ${name}. Photograph the landscape from the fixed marker to track how it changes over time.`,
    breadcrumbHome: "Home",

    formTitle: "Submit a photograph",
    formStation: (n) => `Station ${n}`,
    chooseGallery: "Choose from your gallery",
    takePhoto: "Take a photo",
    previewAlt: "Preview of your photograph",
    chooseAnother: "Choose another photo",
    submitting: "Uploading…",
    submit: "UPLOAD",
    moderationNote:
      "Your photograph will be reviewed by the scientific team before publication · No personal information required.",
    successTitle: "Thank you for your contribution!",
    successBody: "It will appear in the gallery once approved by the scientific team.",

    errNoFile: "No photograph selected.",
    errNoStation: "Station not found.",
    errTooBig: "The photograph exceeds 15 MB.",
    errBadFormat: "Unsupported format.",
    errNotConfigured: "Upload service not configured.",
    errFailed: "The upload failed. Please try again in a moment.",

    galleryEmptyTitle: "No photographs yet.",
    galleryEmptyBody: "Be the first to contribute.",
    photoAlt: (date) => `Photograph submitted on ${date}`,
    download: "Download ↓",
    downloadAria: "Download this photograph",
  },

  id: {
    metaTitle: "MountainSnap — Memotret perubahan bentang alam pegunungan",
    metaDescription:
      "Proyek penelitian partisipatif. Potret bentang alam dari titik pengamatan tetap untuk memantau perubahannya dari waktu ke waktu — dari Mercantour hingga Gunung Agung.",
    ogLocale: "id_ID",
    dateLocale: "id-ID",

    homeAria: (siteName) => `Beranda ${siteName}`,
    navAria: "Navigasi utama",
    switcherAria: "Ganti bahasa",
    navFallback: [
      { label: "Mercantour", href: "/#mercantour" },
      { label: "Agung", href: "/#agung" },
      { label: "Sumber Daya", href: "/#ressources" },
    ],
    footerScienceTitle: "Kerangka ilmiah",
    footerOpenDataTitle: "Data terbuka",
    footerOpenDataText:
      "Foto yang diunggah bersifat publik dan dapat diunduh, sesuai dengan semangat sains warga.",
    footerDescription:
      "Penelitian partisipatif tentang evolusi bentang alam pegunungan dan bahaya alam terkait — dari Mercantour hingga Gunung Agung.",
    footerTagline: "Mercantour, Alpes-Maritimes · Gunung Agung, Bali",

    regionName: (r) => (r === "agung" ? "Gunung Agung" : "Mercantour"),
    stationsBannerMercantour: "STASIUN · TAMAN NASIONAL MERCANTOUR",
    stationsBannerAgung: "STASIUN · GUNUNG AGUNG, BALI",

    partnersHeading: "Mitra & pendukung",
    station: (n) => `Stasiun No. ${n}`,
    uploadCta: "UNGGAH",
    stationsEmpty: "Stasiun akan segera tersedia.",
    pedagogicalBanner: "CATATAN EDUKATIF — FENOMENA YANG DIAMATI",
    intlExtension: "Perluasan internasional",
    publicationsHeading: "Publikasi",
    publicationsEmpty: "Publikasi akan diumumkan secara bertahap.",
    contactHeading: "Kontak",
    projectImageAlt: "Ilustrasi proyek MountainSnap",
    howImageAlt: "Bentang alam pegunungan yang diambil dari titik pengamatan",

    statsDays: () => "hari arsip",
    statsPhotos: () => "foto diunggah",
    statsStations: () => "stasiun aktif",
    liveAria: "langsung",

    stationBanner: (region, n) =>
      `${region === "agung" ? "GUNUNG AGUNG" : "MERCANTOUR"} · STASIUN NO. ${n}`,
    archiveBanner: (n) => `ARSIP · STASIUN NO. ${n}`,
    back: "← Kembali",
    altitudeLabel: "Ketinggian",
    bearingLabel: "Arah",
    uploadHeading: "Unggah foto Anda",
    uploadSub: "Bingkai foto sesuai penanda stasiun, lalu unggah gambar Anda.",
    previousPhotos: "Foto-foto sebelumnya",
    photoCount: (n) => `${n} foto · urutan kronologis`,
    otherStations: "Stasiun lainnya",
    stationMetaDescription: (n, name) =>
      `Titik pengamatan No. ${n}: ${name}. Potret bentang alam dari penanda tetap untuk memantau perubahannya dari waktu ke waktu.`,
    breadcrumbHome: "Beranda",

    formTitle: "Unggah foto",
    formStation: (n) => `Stasiun ${n}`,
    chooseGallery: "Pilih dari galeri",
    takePhoto: "Ambil foto",
    previewAlt: "Pratinjau foto Anda",
    chooseAnother: "Pilih foto lain",
    submitting: "Mengunggah…",
    submit: "UNGGAH",
    moderationNote:
      "Foto Anda akan ditinjau oleh tim ilmiah sebelum dipublikasikan · Tidak perlu informasi pribadi.",
    successTitle: "Terima kasih atas kontribusi Anda!",
    successBody: "Foto akan tampil di galeri setelah disetujui oleh tim ilmiah.",

    errNoFile: "Tidak ada foto yang dipilih.",
    errNoStation: "Stasiun tidak ditemukan.",
    errTooBig: "Ukuran foto melebihi 15 MB.",
    errBadFormat: "Format tidak didukung.",
    errNotConfigured: "Layanan unggah belum dikonfigurasi.",
    errFailed: "Unggahan gagal. Silakan coba lagi sebentar lagi.",

    galleryEmptyTitle: "Belum ada foto.",
    galleryEmptyBody: "Jadilah orang pertama yang berkontribusi.",
    photoAlt: (date) => `Foto diunggah pada ${date}`,
    download: "Unduh ↓",
    downloadAria: "Unduh foto ini",
  },
};
