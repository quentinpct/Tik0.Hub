const firebaseConfig = {
  apiKey: "AIzaSyBiGxp1o8WRkZ10pg2MmADdNpxsBhDRNVc",
  authDomain: "tik0hub.firebaseapp.com",
  projectId: "tik0hub",
  appId: "1:1016413306511:web:76ecfaee66ce1e1e193afa"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

const OWNER_EMAIL = "quen1quent@gmail.com";
const FRIEND_EMAIL = "quentinpct@proton.me";

async function tryLogin(password) {
  try {
    await auth.signInWithEmailAndPassword(OWNER_EMAIL, password);
    sessionStorage.setItem("role", "owner");
    return "owner";
  } catch (e) {
  }

  try {
    await auth.signInWithEmailAndPassword(FRIEND_EMAIL, password);
    sessionStorage.setItem("role", "friend");
    return "friend";
  } catch (e) {
    return null;
  }
}

function getRole() {
  return sessionStorage.getItem("role"); 
}

function isOwner() {
  return getRole() === "owner";
}

function onAuthReady(callback) {
  auth.onAuthStateChanged(function (user) {
    callback(user);
  });
}

function requireLogin(onReady) {
  onAuthReady(function (user) {
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    document.body.classList.remove("hide-until-auth");
    if (typeof onReady === "function") onReady();
  });
}

function requireOwner(onReady) {
  onAuthReady(function (user) {
    if (!user || !isOwner()) {
      window.location.href = "index.html";
      return;
    }
    document.body.classList.remove("hide-until-auth");
    if (typeof onReady === "function") onReady();
  });
}

function logout() {
  auth.signOut().then(function () {
    sessionStorage.removeItem("role");
    window.location.href = "login.html";
  });
}
