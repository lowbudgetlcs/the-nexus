import { mainSidebarItems } from '$lib/sidebar';
import type { LayoutLoad } from './$types';


export const load: LayoutLoad = async ({ data }) => {
  return { user: data.user, sidebarItems: mainSidebarItems };
}
