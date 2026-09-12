
const OWNER_HASH  = "0e3e0a2f2ba6cb042dc6dbceef6631f111ec6852328581c7ff07b664aa5579e9"; 
const FRIEND_HASH = "368facba305ed02d2e600c46b7a74c93337de53a87e97d2d2921b4ddc99d2b0f"; 


async function hashText(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}


async function tryLogin(password) {
  const hash = await hashText(password);

  if (hash === OWNER_HASH) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("role", "owner");
    return "owner";
  }

  if (hash === FRIEND_HASH) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("role", "friend");
    return "friend";
  }

  return null;
}


function isLoggedIn() {
  return sessionStorage.getItem("loggedIn") === "true";
}

function getRole() {
  return sessionStorage.getItem("role"); // "owner", "friend", ou null
}

function isOwner() {
  return getRole() === "owner";
}


function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

function requireOwner() {
  requireLogin();
  if (!isOwner()) {
    window.location.href = "index.html";
  }
}


function logout() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("role");
  window.location.href = "login.html";
}
