"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { uploadPhoto, type UploadResult } from "@/app/(site)/[lang]/station/[id]/actions";
import { dict, type Lang } from "@/lib/i18n";

type Props = {
  stationId: string;
  stationSlug: string;
  stationNumber: number;
  lang: Lang;
};

export function UploadForm({ stationId, stationSlug, stationNumber, lang }: Props) {
  const t = dict[lang];
  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, pending] = useActionState<UploadResult | null, FormData>(
    uploadPhoto,
    null
  );

  // Move the chosen file into the single named "photo" input the form submits.
  function onFile(file: File | undefined) {
    if (!file || !photoInputRef.current) return;
    const dt = new DataTransfer();
    dt.items.add(file);
    photoInputRef.current.files = dt.files;
    setFilename(file.name);
    setPreview(URL.createObjectURL(file));
  }

  function reset() {
    setPreview(null);
    setFilename(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  // Clear the preview once an upload succeeds.
  useEffect(() => {
    if (state?.ok) reset();
  }, [state]);

  return (
    <form
      action={formAction}
      className="bg-background rounded-3xl ring-1 ring-border p-6 md:p-10"
    >
      <input type="hidden" name="stationId" value={stationId} />
      <input type="hidden" name="stationSlug" value={stationSlug} />
      <input type="hidden" name="lang" value={lang} />
      {/* The single file input that actually gets submitted */}
      <input ref={photoInputRef} type="file" name="photo" accept="image/*" className="sr-only" />

      <div className="flex items-baseline justify-between mb-8">
        <p className="font-display font-bold text-xl text-primary">{t.formTitle}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {t.formStation(String(stationNumber).padStart(2, "0"))}
        </p>
      </div>

      {!preview ? (
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="group aspect-[4/3] sm:aspect-square rounded-2xl border border-dashed border-border hover:border-primary hover:bg-surface transition-colors flex flex-col items-center justify-center gap-2 text-foreground/70 hover:text-primary"
          >
            <span className="font-display text-3xl text-accent">+</span>
            <span className="text-sm">{t.chooseGallery}</span>
          </button>
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="group aspect-[4/3] sm:aspect-square rounded-2xl border border-dashed border-border hover:border-primary hover:bg-surface transition-colors flex flex-col items-center justify-center gap-2 text-foreground/70 hover:text-primary"
          >
            <span className="font-display text-3xl text-accent">○</span>
            <span className="text-sm">{t.takePhoto}</span>
          </button>

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-[4/3] bg-surface overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt={t.previewAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted truncate">{filename}</span>
            <button
              type="button"
              onClick={reset}
              className="text-primary hover:underline"
            >
              {t.chooseAnother}
            </button>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary text-white py-4 rounded-full font-display font-extrabold tracking-wider hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {pending ? t.submitting : t.submit}
          </button>
          <p className="text-xs text-muted text-center leading-relaxed">
            {t.moderationNote}
          </p>
        </div>
      )}

      {state?.ok && (
        <div className="mt-6 text-center">
          <p className="font-display font-bold text-primary text-lg">
            {t.successTitle}
          </p>
          <p className="mt-1 text-sm text-muted">{t.successBody}</p>
        </div>
      )}
      {state && !state.ok && (
        <p className="mt-6 text-center text-sm text-red-700">{state.error}</p>
      )}
    </form>
  );
}
