const BASE = import.meta.env.VITE_SERVER_URL || '';

async function getJson(path) {
  const url = BASE + path;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function sendJson(path, method, body) {
  const url = BASE + path;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

// CHARACTER
export async function fetchCharacters() {
  return getJson('/characters');
}

export async function fetchCharacter(id) {
  return getJson(`/characters/${id}`);
}

// COMBOS
export async function fetchCombos() {
  return getJson('/combos');
}

export async function fetchCombo(id) {
  return getJson(`/combos/${id}`);
}


export async function fetchCombosByCharacter(characterId) {
  return getJson(`/combos?characterId=${characterId}`);
}

export async function updateCombo(id, payload) {
  return sendJson(`/combos/${id}`, "PATCH", payload);
}

export default {
  fetchCharacters,
  fetchCharacter,
  fetchCombo,
  fetchCombos,
  fetchCombosByCharacter,
  updateCombo
};
