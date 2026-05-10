// firebase-config.js
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAGu7Upfx2zwpxTOyhwTlTAjyCSA7bFE4Q",
    authDomain: "portfolio-assa.firebaseapp.com",
    projectId: "portfolio-assa",
    storageBucket: "portfolio-assa.firebasestorage.app",
    messagingSenderId: "880584019080",
    appId: "1:880584019080:web:e9b76da87b96ca05aca33d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);