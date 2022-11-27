// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import type { PageLoad } from './$types';
import * as dndApi from '$lib/services/dnd5eApi/api';
import type { Spell } from '@prisma/client';
import { BackendClient } from '$lib/services/backendClient/client';

export const load: PageLoad = async ({ params, fetch }) => {
  const MonstersApi = new dndApi.MonstersApi({});
  const EquipmentApi = new dndApi.EquipmentApi({});

  const spellsResponse = await BackendClient.getAllSpells(fetch);
  const { data: spells } = await spellsResponse.json();

  return {
    spells: spells as Spell[],
    monsters: await MonstersApi.apiMonstersGet()
  };
};
