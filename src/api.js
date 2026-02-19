import axios from 'axios';

const BASE = import.meta.env.VITE_SERVER_URL || '';

const api = axios.create({ baseURL: BASE });

async function getJson(path) {
  try {
    const res = await api.get(path);
    return res.data;
  } catch (err) {
    if (err && err.response) {
      throw new Error(`${err.response.status} ${err.response.statusText}`);
    }
    throw err;
  }
}

async function sendJson(path, method, body) {
  try {
    const res = await api.request({
      url: path,
      method,
      headers: { 'Content-Type': 'application/json' },
      data: body
    });
    return res.data;
  } catch (err) {
    if (err && err.response) {
      throw new Error(`${err.response.status} ${err.response.statusText}`);
    }
    throw err;
  }
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

// need to add : update combo name , update description, update array information...
export default {
  fetchCharacters,
  fetchCharacter,
  fetchCombo,
  fetchCombos,
  fetchCombosByCharacter,
  updateCombo
};
