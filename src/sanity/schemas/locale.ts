import { defineField, defineType } from "sanity";

// Champs trilingues — chaque champ localisé stocke { fr, en, id }.
// Le site retombe sur le français quand une traduction manque.

export const localeString = defineType({
  name: "localeString",
  title: "Texte localisé (ligne)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "id", title: "Bahasa Indonesia", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Texte localisé (paragraphe)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "text", rows: 6 }),
    defineField({ name: "en", title: "English", type: "text", rows: 6 }),
    defineField({ name: "id", title: "Bahasa Indonesia", type: "text", rows: 6 }),
  ],
});
