import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partenaire",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortName",
      title: "Nom court (affiché)",
      type: "string",
      description: "Apparaît dans le bandeau des partenaires sur la page d'accueil.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo (optionnel)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "url",
      title: "Site web (optionnel)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus petit = à gauche.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "shortName", subtitle: "name", media: "logo" },
  },
});
