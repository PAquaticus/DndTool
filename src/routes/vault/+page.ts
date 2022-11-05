// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import type { PageLoad } from './$types';
import * as dndApi from "$lib/services/dnd5eApi/api"

export const load: PageLoad = async ({ params }) => {
  const instance =  new dndApi.SpellsApi({})  
  return {
    spells: await instance.apiSpellsGet()
  };
}