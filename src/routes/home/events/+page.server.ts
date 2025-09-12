import type { PageServerLoad } from "./$types";
import { getEvents } from '$lib/server/dennys/event';

export const load: PageServerLoad = async () => {
  const events = await getEvents();
  return { events }
}
