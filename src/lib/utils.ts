import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitize(str: string): string;
export function sanitize(str: string | null): string | null;
export function sanitize(str: string | null): string | null {
  return str?.trim() ?? null;
}
