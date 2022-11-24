export function calculateDiceAverage(diceAmount: number, diceSize: number, extra: number): number {
  return Math.round(Number(diceAmount) * (Number(diceSize) / 2 + 0.5)) + Number(extra ?? 0);
}

export function parseDiceAverageFromString(input: string | undefined): string {
  if (input === undefined) {
    return '';
  }

  const matchingResult = [...input.matchAll(/(\d+) *d(\d+) *\+? *(\d+)?/g)];
  if (matchingResult.length === 0) {
    return '';
  }

  const [_, diceAmount, dice, addition] = matchingResult[0];

  return `${calculateDiceAverage(Number(diceAmount), Number(dice), Number(addition ?? 0))}`;
}
