import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photographie",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      initialValue: "pending",
      options: {
        list: [
          { value: "pending", title: "En attente de validation" },
          { value: "approved", title: "Approuvée — publiée" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "station",
      title: "Station",
      type: "reference",
      to: [{ type: "station" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: false },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "takenAt",
      title: "Date de prise de vue",
      type: "datetime",
      description: "Issue des métadonnées EXIF si disponibles, sinon date du dépôt.",
    }),
    defineField({
      name: "uploadedAt",
      title: "Date de dépôt",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "exif",
      title: "Métadonnées EXIF (analyse scientifique)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "dateTimeOriginal", title: "Date originale", type: "string" },
        { name: "latitude", title: "Latitude", type: "number" },
        { name: "longitude", title: "Longitude", type: "number" },
        { name: "make", title: "Marque appareil", type: "string" },
        { name: "model", title: "Modèle appareil", type: "string" },
      ],
    }),
  ],
  orderings: [
    {
      title: "Plus récentes",
      name: "takenAtDesc",
      by: [{ field: "takenAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      stationName: "station.name",
      takenAt: "takenAt",
      media: "image",
      status: "status",
    },
    prepare({ stationName, takenAt, media, status }) {
      const date = takenAt
        ? new Date(takenAt).toLocaleDateString("fr-FR")
        : "Date inconnue";
      const badge = status === "approved" ? "✓" : "⏳";
      return {
        title: `${badge} ${stationName ?? "Photographie"}`,
        subtitle: date,
        media,
      };
    },
  },
});
