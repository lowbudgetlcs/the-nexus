// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SessionUser } from "$lib/types/models";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: SessionUser | null
    }

    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
