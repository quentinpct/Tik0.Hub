/* =========================================================
   GESTION DE LA CONNEXION
   ========================================================= */

// Change ce mot de passe pour le tien
const SITE_PASSWORD = "Sp4ceTik0";

// Vérifie si l'utilisateur est déjà connecté (pour la session en cours du navigateur)
function isLoggedIn() {
  return sessionStorage.getItem("loggedIn") === "true";
}

// A appeler tout en haut de chaque page à protéger.
// Si pas connecté, on renvoie directement vers login.html
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

// Déconnexion : on efface l'accès et on repart sur la page de connexion
function logout() {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
