import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Page d'accueil",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "project", title: "Le projet" },
    { name: "howItWorks", title: "Observe / Snap / Share" },
    { name: "agung", title: "Mont Agung" },
  ],
  fields: [
    // — Hero
    defineField({
      name: "heroTitle",
      title: "Titre principal",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroTagline",
      title: "Tagline (texte en italique)",
      type: "localeText",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Image de fond (hero)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
      description: "Photo de paysage en pleine page. Format paysage recommandé.",
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Bouton principal — texte",
      type: "localeString",
      group: "hero",
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Bouton secondaire — texte",
      type: "localeString",
      group: "hero",
    }),

    // — Project
    defineField({
      name: "projectTitle",
      title: "Titre de section",
      type: "localeText",
      group: "project",
    }),
    defineField({
      name: "projectBody",
      title: "Texte du projet",
      type: "localeText",
      description:
        "Séparez les paragraphes par une ligne vide (touche Entrée deux fois).",
      group: "project",
    }),
    defineField({
      name: "projectImage",
      title: "Image du projet",
      type: "image",
      options: { hotspot: true },
      group: "project",
      description:
        "Cliquez sur la zone ci-dessous (ou glissez-y un fichier) pour téléverser une image illustrant le projet — travail de terrain, paysage, station d'observation. Elle s'affichera sous le texte. Format paysage recommandé, largeur idéale ≥ 1600 px. Astuce : après l'envoi, déplacez le point de recadrage sur la partie la plus importante de l'image. N'oubliez pas de cliquer sur « Publier » en haut à droite.",
    }),

    // — How it works
    defineField({
      name: "howItWorksImage",
      title: "Image (côté gauche)",
      type: "image",
      options: { hotspot: true },
      group: "howItWorks",
    }),
    defineField({
      name: "howItWorksSteps",
      title: "Étapes",
      type: "array",
      group: "howItWorks",
      validation: (r) => r.length(3).error("Il faut exactement 3 étapes."),
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Numéro", type: "string", validation: (r) => r.required() },
            { name: "title", title: "Titre", type: "localeString" },
            { name: "body", title: "Description", type: "localeText" },
          ],
          preview: {
            select: { title: "title.fr", subtitle: "number" },
            prepare: ({ title, subtitle }) => ({ title, subtitle: `Étape ${subtitle}` }),
          },
        },
      ],
    }),

    // — Mont Agung
    defineField({
      name: "agungTitle",
      title: "Titre",
      type: "localeString",
      group: "agung",
    }),
    defineField({
      name: "agungBody",
      title: "Texte",
      type: "localeText",
      group: "agung",
    }),
    defineField({
      name: "agungStatus",
      title: "Étiquette (badge)",
      type: "localeString",
      description: "Ex : « Stations à venir »",
      group: "agung",
    }),
  ],
  preview: {
    select: { title: "heroTitle" },
    prepare: ({ title }) => ({ title: title || "Page d'accueil" }),
  },
});
