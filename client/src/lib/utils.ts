import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function preserveQueryParams(path: string) {
  const currentParams = new URLSearchParams(window.location.search);
  const siteId = currentParams.get('site_id');

  if (!siteId) return path;

  return `${path}?site_id=${siteId}`;
}