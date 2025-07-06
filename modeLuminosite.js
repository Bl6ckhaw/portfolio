document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleThemeBtn");
    const body = document.body;
  
    // Appliquer le thème sauvegardé
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  
    // Mettre à jour le texte du bouton au chargement
    updateThemeButtonText();
  
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        if (body.classList.contains("dark-theme")) {
          localStorage.setItem("theme", "dark");
        } else {
          localStorage.setItem("theme", "light");
        }
        updateThemeButtonText();
      });
    }
  });
  
  function updateThemeButtonText() {
    const toggleBtn = document.getElementById("toggleThemeBtn");
    const body = document.body;
  
    if (toggleBtn) {
      if (body.classList.contains("dark-theme")) {
        toggleBtn.textContent = "Light Mode";
      } else {
        toggleBtn.textContent = "Dark Mode";
      }
    }
  }
  