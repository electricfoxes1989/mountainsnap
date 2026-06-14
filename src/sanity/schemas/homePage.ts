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
      type: "text",
      rows: 3,
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
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Bouton secondaire — texte",
      type: "string",
      group: "hero",
    }),

    // — Project
    defineField({
      name: "projectTitle",
      title: "Titre de section",
      type: "text",
      rows: 3,
      group: "project",
    }),
    defineField({
      name: "projectBody",
      title: "Texte du projet",
      type: "text",
      rows: 12,
      description:
        "Séparez les paragraphes par une ligne vide (touche Entrée deux fois).",
      group: "project",
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
            { name: "title", title: "Titre", type: "string", validation: (r) => r.required() },
            { name: "body", title: "Description", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "number" },
            prepare: ({ title, subtitle }) => ({ title, subtitle: `Étape ${subtitle}` }),
          },
        },
      ],
    }),

    // — Mont Agung
    defineField({
      name: "agungTitle",
      title: "Titre",
      type: "string",
      group: "agung",
    }),
    defineField({
      name: "agungBody",
      title: "Texte",
      type: "text",
      rows: 6,
      group: "agung",
    }),
    defineField({
      name: "agungStatus",
      title: "Étiquette (badge)",
      type: "string",
      description: "Ex : « Stations à venir »",
      group: "agung",
    }),
  ],
  preview: {
    select: { title: "heroTitle" },
    prepare: ({ title }) => ({ title: title || "Page d'accueil" }),
  },
});
