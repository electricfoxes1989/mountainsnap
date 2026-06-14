import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Pied de page" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    // — Général
    defineField({
      name: "siteName",
      title: "Nom du site",
      type: "string",
      description: "Affiché dans l'en-tête et le pied de page.",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Description (pied de page)",
      type: "text",
      rows: 3,
      description: "Court paragraphe affiché sous le logo dans le pied de page.",
      group: "general",
    }),

    // — Navigation
    defineField({
      name: "navLinks",
      title: "Liens de navigation",
      type: "array",
      group: "navigation",
      description:
        "Liens affichés dans l'en-tête. Utilisez « /#ancre » pour pointer vers une section de la page d'accueil.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Texte",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "href",
              title: "Lien",
              type: "string",
              description: "Ex : /#mercantour, /#agung, /#ressources",
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),

    // — Pied de page
    defineField({
      name: "footerScienceTitle",
      title: "Bloc 1 — Titre",
      type: "string",
      group: "footer",
      initialValue: "Cadre scientifique",
    }),
    defineField({
      name: "footerScienceLines",
      title: "Bloc 1 — Lignes",
      type: "array",
      of: [{ type: "string" }],
      group: "footer",
      description: "Une ligne par institution / laboratoire.",
    }),
    defineField({
      name: "footerOpenDataTitle",
      title: "Bloc 2 — Titre",
      type: "string",
      group: "footer",
      initialValue: "Données ouvertes",
    }),
    defineField({
      name: "footerOpenDataText",
      title: "Bloc 2 — Texte",
      type: "text",
      rows: 3,
      group: "footer",
    }),
    defineField({
      name: "footerTagline",
      title: "Mention basse (sous le copyright)",
      type: "string",
      group: "footer",
      description: "Ex : « Mercantour, Alpes-Maritimes · Mont Agung, Bali »",
    }),

    // — Contact
    defineField({ name: "contactName", title: "Nom", type: "string", group: "contact" }),
    defineField({ name: "contactRole", title: "Fonction", type: "string", group: "contact" }),
    defineField({ name: "contactEmail", title: "E-mail", type: "string", group: "contact" }),
    defineField({
      name: "contactAffiliation",
      title: "Affiliation",
      type: "text",
      rows: 2,
      group: "contact",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Réglages du site" }),
  },
});
