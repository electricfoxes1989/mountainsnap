import { defineField, defineType } from "sanity";

export const station = defineType({
  name: "station",
  title: "Station",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Numéro de station",
      type: "number",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Utilisé dans l'URL : /station/[slug]. Souvent le numéro.",
      options: { source: (doc) => String(doc.number ?? "") },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "region",
      title: "Région",
      type: "string",
      initialValue: "mercantour",
      options: {
        list: [
          { value: "mercantour", title: "Mercantour" },
          { value: "agung", title: "Mont Agung — Bali" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "Lieu", type: "string" }),
    defineField({ name: "altitude", title: "Altitude", type: "string" }),
    defineField({ name: "bearing", title: "Orientation", type: "localeString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "pedagogicalText",
      title: "Texte pédagogique (phénomène observé)",
      type: "localeText",
    }),
    defineField({
      name: "heroImage",
      title: "Image d'en-tête",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Numéro de station",
      name: "numberAsc",
      by: [{ field: "number", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "location", number: "number", media: "heroImage" },
    prepare({ title, subtitle, number, media }) {
      return {
        title: `${String(number ?? "?").padStart(2, "0")} · ${title ?? "Sans nom"}`,
        subtitle,
        media,
      };
    },
  },
});
