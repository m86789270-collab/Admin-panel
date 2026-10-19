import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIGURATION */

const firebaseConfig = {

    apiKey: "AIzaSyC3e6Q2jbht4cslONzbU9BwzD1p3KVZivA",

    authDomain: "new-projuct-1.firebaseapp.com",

    projectId: "new-projuct-1",

    storageBucket: "new-projuct-1.firebasestorage.app",

    messagingSenderId: "5903682841",

    appId: "1:5903682841:web:3bdfce8bda9422649d0988",

    measurementId: "G-45DWE3DJEW"

};

/* INITIALIZE FIREBASE */

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

/* FIREBASE AUTHENTICATION */

export const auth = getAuth(app);

/* FIRESTORE DATABASE */

export const db = getFirestore(app);

/* ADMIN UID */

export const ADMIN_UID =
    "N07Ey9RxhuUMV93p9q2u0Walrm82";

/* FIREBASE PROJECT ID */

export const FIREBASE_PROJECT_ID =
    firebaseConfig.projectId;