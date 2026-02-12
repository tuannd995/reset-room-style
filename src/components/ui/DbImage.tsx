"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { FALLBACK_IMAGE } from "@/lib/constants";

interface DbImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined;
  fallback?: string;
}

/** Renders DB image URL with fallback on error or when src is empty */
export default function DbImage({
  src,
  fallback = FALLBACK_IMAGE,
  alt,
  ...rest
}: DbImageProps) {
  const [errored, setErrored] = useState(false);
  const url = !src || errored ? fallback : src;

  return (
    <Image src={url} alt={alt} onError={() => setErrored(true)} {...rest} />
  );
}
