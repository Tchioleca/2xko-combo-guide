// guide for crud operations , check on postman collection for examples//

const baseUrl = import.meta.env.VITE_SERVER_URL || "";

// CREATE
async function createCombo(newCombo) {
  const res = await axios.post(`${baseUrl}/combos`, newCombo);
  return res.data;
}

// READ
async function getCombo(comboId) {
  const res = await axios.get(`${baseUrl}/combos/${comboId}`);
  return res.data;
}

// UPDATE (PATCH)
async function patchCombo(comboId, patchData) {
  const res = await axios.patch(`${baseUrl}/combos/${comboId}`, patchData);
  return res.data;
}

// DELETE
async function deleteCombo(comboId) {
  await axios.delete(`${baseUrl}/combos/${comboId}`);
}

//add 1 like = (event listener: onclick , method : patch) //

