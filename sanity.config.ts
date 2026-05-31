"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schema";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "mountainsnap",
  title: "MountainSnap",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  // Prevent the homePage singleton from being duplicated or deleted via the Studio
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === "homePage"
        ? prev.filter(
            ({ action }) =>
              action !== "duplicate" && action !== "delete" && action !== "unpublish"
          )
        : prev,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((t) => t.templateId !== "homePage")
        : prev,
  },
});
