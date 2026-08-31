/* =========================================================
   CONNEXION A LA BASE DE DONNEES (Firebase Realtime Database)
   ========================================================= */

// L'adresse de ta base de données Firebase
const DB_URL = "https://tik0hub-default-rtdb.europe-west1.firebasedatabase.app";

/* =========================================================
   Charge la valeur d'un champ (ex: "todos"), ou une valeur
   par défaut si rien n'existe encore en ligne.
   ========================================================= */
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

/* =========================================================
   Sauvegarde la valeur d'un champ en ligne.
   ========================================================= */
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
