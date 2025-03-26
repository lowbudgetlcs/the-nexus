import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals }) => {
  if (!locals.user)
    error(403, 'Unauthorized.');
  return {
    user: locals.user
  };
}
