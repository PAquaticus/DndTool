import type * as dndApi from '$lib/services/dnd5eApi/api';
import type { Spell } from '@prisma/client';

type NewSpell = Omit<Spell, 'id'>;

export function mapSpell(sourceSpell: dndApi.Spell): NewSpell {
  if (sourceSpell.name === undefined || !Array.isArray(sourceSpell.desc)) {
    throw new Error(`Spell "${sourceSpell.index}" is not indexable`);
  }

  return {
    name: sourceSpell.name,
    description: sourceSpell.desc.join(';'),
    shortDescription: null,
    category: null,
    multipliciy: null,
    higherLevelDescription: null,
    range: sourceSpell.range ?? null,
    components: sourceSpell.components?.map((el) => el.toString()) ?? [],
    material: sourceSpell.material ?? null,
    ritual: sourceSpell.ritual ?? false,
    duration: sourceSpell.duration ?? null,
    castingTime: sourceSpell.castingTime ?? null,
    level: sourceSpell.level ?? null,
    characterId: null
  };
}
