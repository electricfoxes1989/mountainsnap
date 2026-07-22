import type { SchemaTypeDefinition } from "sanity";
import { localeString, localeText } from "./schemas/locale";
import { siteSettings } from "./schemas/siteSettings";
import { station } from "./schemas/station";
import { photo } from "./schemas/photo";
import { homePage } from "./schemas/homePage";
import { publication } from "./schemas/publication";
import { partner } from "./schemas/partner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, siteSettings, homePage, station, photo, publication, partner],
};
