import type * as dndApi from '../../lib/services/dnd5eApi/api';
import { PrismaClient, type Spell } from '@prisma/client';
import spellShortDescriptions from '../open5eMigration/spellsShortDescription.json' assert { type: 'json' };

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

const prisma = new PrismaClient();
async function migrate5eSrdContent(prisma: PrismaClient) {
  const prismaConnectResponse = prisma.$connect();
  console.log('totally connected');
  const response = await fetch(
    'https://raw.githubusercontent.com/5e-bits/5e-database/main/src/5e-SRD-Spells.json'
  );
  const spells: dndApi.Spell[] = (await response.json()) as dndApi.Spell[];
  const map: Record<string, string> = {};
  spellShortDescriptions.spells.forEach((obj) => {
    map[obj.name] = obj.desc ?? '';
  });
  const mappedSpells = spells.map(mapSpell).map((spell) => ({
    ...spell,
    shortDescription: map[spell.name]
  }));

  await prismaConnectResponse;

  await prisma.spell.deleteMany();
  const resp = await prisma.spell.createMany({ data: mappedSpells });
  console.log(resp);

  await prisma.$disconnect();

  console.log('disconneting');
}
migrate5eSrdContent(prisma);
