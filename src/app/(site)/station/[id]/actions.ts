"use server";

import { revalidatePath } from "next/cache";
import exifr from "exifr";
import { writeClient } from "@/sanity/client";

export type UploadResult =
  | { ok: true }
  | { ok: false; error: string };

const MAX_BYTES = 15 * 1024 * 1024; // 15 MB
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export async function uploadPhoto(
  _prev: UploadResult | null,
  formData: FormData
): Promise<UploadResult> {
  const file = formData.get("photo");
  const stationId = formData.get("stationId");
  const stationSlug = formData.get("stationSlug");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Aucune photographie sélectionnée." };
  }
  if (typeof stationId !== "string" || !stationId) {
    return { ok: false, error: "Station introuvable." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "La photographie dépasse 15 Mo." };
  }
  if (file.type && !ACCEPTED.includes(file.type)) {
    return { ok: false, error: "Format non pris en charge." };
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return { ok: false, error: "Service de dépôt non configuré." };
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  // Extract EXIF (best-effort — never block an upload on metadata failure)
  let exif:
    | {
        dateTimeOriginal?: string;
        latitude?: number;
        longitude?: number;
        make?: string;
        model?: string;
      }
    | undefined;
  let takenAt: string | undefined;
  try {
    const parsed = await exifr.parse(bytes, {
      tiff: true,
      exif: true,
      gps: true,
    });
    if (parsed) {
      exif = {
        dateTimeOriginal: parsed.DateTimeOriginal
          ? new Date(parsed.DateTimeOriginal).toISOString()
          : undefined,
        latitude: typeof parsed.latitude === "number" ? parsed.latitude : undefined,
        longitude:
          typeof parsed.longitude === "number" ? parsed.longitude : undefined,
        make: parsed.Make ?? undefined,
        model: parsed.Model ?? undefined,
      };
      if (parsed.DateTimeOriginal) {
        takenAt = new Date(parsed.DateTimeOriginal).toISOString();
      }
    }
  } catch {
    // ignore EXIF errors
  }

  const now = new Date().toISOString();

  try {
    const asset = await writeClient.assets.upload("image", bytes, {
      filename: file.name || "mountainsnap-photo.jpg",
    });

    await writeClient.create({
      _type: "photo",
      station: { _type: "reference", _ref: stationId },
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      takenAt: takenAt ?? now,
      uploadedAt: now,
      ...(exif ? { exif } : {}),
    });
  } catch {
    return {
      ok: false,
      error: "Le dépôt a échoué. Merci de réessayer dans un instant.",
    };
  }

  if (typeof stationSlug === "string" && stationSlug) {
    revalidatePath(`/station/${stationSlug}`);
  }
  revalidatePath("/");

  return { ok: true };
}
