import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Référence (auteurs, année, titre)",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
      description:
        "Format conseillé : « Nom A. et al. (Année) — Titre de la publication. »",
    }),
    defineField({
      name: "url",
      title: "Lien (optionnel)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus petit = en haut de la liste.",
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
    select: { title: "title", order: "order" },
    prepare: ({ title, order }) => ({
      title: title?.slice(0, 80) ?? "Publication",
      subtitle: order != null ? `#${order}` : undefined,
    }),
  },
});
