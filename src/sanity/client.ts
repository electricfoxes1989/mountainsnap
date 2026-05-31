import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Read-only client — uses the public CDN, no token needed for public datasets.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Write client — server-only, uses the Editor token for uploads + mutations.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
