// commentaires.js
import { db } from "./firebase-config.js";
import {
    collection, addDoc, getDocs, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form  = document.getElementById("commentaire-form");
const liste = document.getElementById("commentaires-liste");

if (!form || !liste) {
  console.error("Formulaire ou liste introuvable !");
} else {

  async function chargerCommentaires() {
    try {
      const q    = query(collection(db, "commentaires"), orderBy("date", "desc"));
      const snap = await getDocs(q);
      liste.innerHTML = "";
      if (snap.empty) {
        liste.innerHTML = '<p style="color:var(--t2);font-size:.82rem;letter-spacing:.06em">Aucun commentaire pour l\'instant. Sois la première !</p>';
        return;
      }
      snap.forEach(doc => {
        const c   = doc.data();
        const div = document.createElement("div");
        div.className = "cmt-card";
        div.innerHTML = `<div class="cmt-author">${c.auteur}</div><p class="cmt-text">${c.texte}</p>`;
        liste.appendChild(div);
      });
    } catch (error) {
      console.error("Erreur chargement commentaires :", error);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const auteur = document.getElementById("auteur").value.trim();
    const texte  = document.getElementById("texte").value.trim();
    const btn    = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.querySelector("span").textContent = "Envoi...";
    try {
      await addDoc(collection(db, "commentaires"), {
        auteur, texte, date: serverTimestamp()
      });
      form.reset();
      btn.querySelector("span").textContent = "Publié ✓";
      btn.style.background = "var(--cyan)";
      btn.style.color      = "var(--bg)";
      setTimeout(() => {
        btn.querySelector("span").textContent = "Publier →";
        btn.style.background = "";
        btn.style.color      = "";
        btn.disabled         = false;
      }, 3000);
      chargerCommentaires();
    } catch (error) {
      console.error("Erreur :", error);
      btn.querySelector("span").textContent = "Erreur, réessaie";
      btn.disabled = false;
    }
  });

  chargerCommentaires();
}