const DB_URL = "https://tik0hub-default-rtdb.europe-west1.firebasedatabase.app";

async function getAuthToken() {
  const user = firebase.auth().currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

async function loadField(field, defaultValue) {
  try {
    const token = await getAuthToken();
    const url = DB_URL + "/" + field + ".json" + (token ? "?auth=" + token : "");
    const res = await fetch(url);
    const data = await res.json();
    return data !== null ? data : defaultValue;
  } catch (e) {
    console.error("Erreur de chargement :", e);
    return defaultValue;
  }
}

async function saveField(field, value) {
  try {
    const token = await getAuthToken();
    const url = DB_URL + "/" + field + ".json" + (token ? "?auth=" + token : "");
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(value)
    });
  } catch (e) {
    console.error("Erreur de sauvegarde :", e);
  }
}
