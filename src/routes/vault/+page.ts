// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import type { PageLoad } from './$types';
import * as dndApi from '$lib/services/dnd5eApi/api';

export const load: PageLoad = async ({ params }) => {
	const SpellsApi = new dndApi.SpellsApi({});
	const MonstersApi = new dndApi.MonstersApi({});
	const EquipmentApi = new dndApi.EquipmentApi({});
	// TODO heroes sind hier nicht drin

	return {
		spells: await SpellsApi.apiSpellsGet(),
		monsters: await MonstersApi.apiMonstersGet()
	};
};
