import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import pino from 'pino';
const logger = pino();

export const load: LayoutServerLoad = ({ locals }) => {
  if (!locals.user) {
    logger.warn(`Unauthorized access attempted!`);
    error(403, 'Unauthorized.');
  }
  return {
    user: locals.user
  };
}
