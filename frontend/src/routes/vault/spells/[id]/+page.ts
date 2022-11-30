// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import { BackendClient } from '$lib/services/backendClient/client';
import type { Spell } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const spellResponse = await BackendClient.getSpell(fetch, params.id);
  const { data: spell } = await spellResponse.json();

  return {
    spell: spell as Spell
  };
};
