import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
  return {
    title: 'Events',
    events: data.events
  };
}
