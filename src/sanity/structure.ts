import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      // ⚙️ Réglages du site — global chrome (nav, footer, contact) + partners
      S.listItem()
        .title("Réglages du site")
        .icon(() => "⚙️")
        .child(
          S.list()
            .title("Réglages du site")
            .items([
              S.listItem()
                .title("Réglages généraux")
                .id("siteSettings")
                .child(
                  S.editor()
                    .id("siteSettings")
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                ),
              S.listItem()
                .title("Partenaires")
                .schemaType("partner")
                .child(
                  S.documentTypeList("partner")
                    .title("Partenaires")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),

      S.divider(),

      // 📄 Pages — editable site pages
      S.listItem()
        .title("Pages")
        .icon(() => "📄")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Page d'accueil")
                .id("homePage")
                .child(
                  S.editor()
                    .id("homePage")
                    .schemaType("homePage")
                    .documentId("homePage")
                ),
              S.listItem()
                .title("Stations")
                .schemaType("station")
                .child(
                  S.documentTypeList("station")
                    .title("Stations")
                    .defaultOrdering([{ field: "number", direction: "asc" }])
                ),
            ])
        ),

      S.divider(),

      // 🖼️ Photographies — moderation queue + archive
      S.listItem()
        .title("Photographies")
        .icon(() => "🖼️")
        .child(
          S.list()
            .title("Photographies")
            .items([
              S.listItem()
                .title("⏳ En attente de validation")
                .icon(() => "⏳")
                .schemaType("photo")
                .child(
                  S.documentTypeList("photo")
                    .title("En attente de validation")
                    .filter('_type == "photo" && status == "pending"')
                    .defaultOrdering([{ field: "uploadedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Toutes les photographies")
                .schemaType("photo")
                .child(
                  S.documentTypeList("photo")
                    .title("Photographies")
                    .defaultOrdering([{ field: "uploadedAt", direction: "desc" }])
                ),
            ])
        ),

      S.divider(),

      // 📚 Ressources
      S.listItem()
        .title("Publications")
        .icon(() => "📚")
        .schemaType("publication")
        .child(
          S.documentTypeList("publication")
            .title("Publications")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);
