import type { SchemaTypeDefinition } from "sanity";
import { station } from "./schemas/station";
import { photo } from "./schemas/photo";
import { homePage } from "./schemas/homePage";
import { publication } from "./schemas/publication";
import { partner } from "./schemas/partner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, station, photo, publication, partner],
};
