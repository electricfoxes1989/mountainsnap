import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      // Singleton: home page
      S.listItem()
        .title("Page d'accueil")
        .id("homePage")
        .child(
          S.editor()
            .id("homePage")
            .schemaType("homePage")
            .documentId("homePage")
        ),

      S.divider(),

      // Stations — ordered by number
      S.listItem()
        .title("Stations")
        .schemaType("station")
        .child(
          S.documentTypeList("station")
            .title("Stations")
            .defaultOrdering([{ field: "number", direction: "asc" }])
        ),

      // Photos: pending queue + full archive
      S.listItem()
        .title("⏳ Photos en attente de validation")
        .icon(() => "⏳")
        .schemaType("photo")
        .child(
          S.documentTypeList("photo")
            .title("En attente de validation")
            .filter('_type == "photo" && status == "pending"')
            .defaultOrdering([{ field: "uploadedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Photographies (toutes)")
        .schemaType("photo")
        .child(
          S.documentTypeList("photo")
            .title("Photographies")
            .defaultOrdering([{ field: "uploadedAt", direction: "desc" }])
        ),

      S.divider(),

      // Publications
      S.listItem()
        .title("Publications")
        .schemaType("publication")
        .child(
          S.documentTypeList("publication")
            .title("Publications")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // Partners
      S.listItem()
        .title("Partenaires")
        .schemaType("partner")
        .child(
          S.documentTypeList("partner")
            .title("Partenaires")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);
