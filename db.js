const DB_URL = "https://tik0hub-default-rtdb.europe-west1.firebasedatabase.app";

async function loadField(field, defaultValue) {
  try {
    const res = await fetch(DB_URL + "/" + field + ".json");
    const data = await res.json();
    return data !== null ? data : defaultValue;
  } catch (e) {
    console.error("Erreur de chargement :", e);
    return defaultValue;
  }
}

async function saveField(field, value) {
  try {
    await fetch(DB_URL + "/" + field + ".json", {
      method: "PUT",
      body: JSON.stringify(value)
    });
  } catch (e) {
    console.error("Erreur de sauvegarde :", e);
  }
}
