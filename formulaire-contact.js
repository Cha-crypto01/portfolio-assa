// formulaire-contact.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form   = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nom     = document.getElementById("nom").value;
    const email   = document.getElementById("email").value;
    const sujet   = document.getElementById("sujet").value;
    const message = document.getElementById("message").value;

    status.textContent = "Envoi en cours...";
    status.style.color = "var(--t2)";

    const btn = document.getElementById("fsub");
    btn.disabled = true;
    btn.querySelector("span").textContent = "Envoi...";

    try {
        await addDoc(collection(db, "messages"), {
            nom:     nom,
            email:   email,
            sujet:   sujet,
            message: message,
            date:    serverTimestamp()
        });

        status.textContent = "✓ Message envoyé avec succès !";
        status.style.color = "var(--cyan)";
        btn.querySelector("span").textContent = "Message envoyé ✓";
        btn.style.background = "var(--cyan)";
        btn.style.color      = "var(--bg)";
        form.reset();

        setTimeout(() => {
            btn.querySelector("span").textContent = "Envoyer le message →";
            btn.style.background = "";
            btn.style.color      = "";
            btn.disabled         = false;
            status.textContent   = "";
        }, 4000);

    } catch (error) {
        console.error("Erreur Firestore :", error);
        status.textContent = "✗ Erreur lors de l'envoi. Réessaie plus tard.";
        status.style.color = "var(--magenta)";
        btn.querySelector("span").textContent = "Envoyer le message →";
        btn.disabled = false;
    }
});