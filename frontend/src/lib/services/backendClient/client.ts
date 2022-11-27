type FetchType = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
async function backendClient(fetch: FetchType, url: string, body?: object) {
  const req = new Request(`http://localhost:5000/api/${url}`, body ?? { body });
  return fetch(req);
}

async function getAllSpells(fetch: FetchType) {
  return backendClient(fetch, 'spell');
}

async function getSpell(fetch: FetchType, spellId: string) {
  return backendClient(fetch, 'spell');
}

export const BackendClient = {
  getAllSpells,
  getSpell
};
