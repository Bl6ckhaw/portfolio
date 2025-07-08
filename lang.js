const translations = {
    fr: {
        // Général
        downloadNow: "Télécharger maintenant",
        back: "Retour",
        footer: "© 2025 ALLANO Hugo. Tous droits réservés.",
        darkMode: "Passer en mode sombre",
        lightMode: "Passer en mode clair",
    
        // Index
        portfolioTitle: "Mon Portfolio",
        subtitle: "Développeur & explorateur de technologies créatives",
        myProjects: "Mes Projets",
        about: "À propos",
        viewDetails: "Voir détails",
        aboutText: "Curieux, créatif et rigoureux, j'aime donner vie aux idées et résoudre des problèmes de façon concrète. Mon parcours m'a permis de développer à la fois un sens aigu du détail et une vision d'ensemble, que ce soit dans la conception, la gestion ou la mise en œuvre de projets. J'apprécie particulièrement travailler sur des projets qui allient technique et créativité, et je mets un point d'honneur à créer des solutions utiles, esthétiques et efficaces. Toujours à l’écoute, je m’adapte facilement aux différents environnements et je crois fermement que la collaboration et le partage sont les clés pour avancer.",

        cosmicAdventuresDescription: "Un projet 2D inspiré des niveaux de type gauntlet, se déroulant dans un vaisseau spatial. Le joueur affronte des ennemis extraterrestres et interagit avec des objets pour recharger son énergie ou récupérer de la vie, combinant combat et gestion des ressources.",
        artGalleryDescription: "Un projet d’exploration de fiction interactive où tout se déroule à l’écrit. Le joueur se déplace entre des pièces décrites textuellement, collecte des objets et les utilise pour avancer vers l’objectif final.",
        pirateDescription: "Un projet de création de personnage sur Unity mettant en scène un pirate inspiré du style cubique de Minecraft. L’objectif est d’explorer la modélisation low-poly et la mise en place d’un personnage.",
        ileDescription: "Un projet d’environnement 3D sur Unity représentant une île. Il se concentre sur la création de paysages naturels, la sculpture de terrain, le texturage et la conception d’environnement de base.",
        syllogismeDescription: "Un programme conçu pour vérifier la validité logique des syllogismes. Il génère et affiche également un tableau récapitulant tous les types de syllogismes valides et non valides.",
        rushDescription: "Un jeu 3D centré sur la vitesse de réaction et les déplacements. Le joueur doit atteindre des points qui apparaissent aléatoirement sur une petite carte dans un temps limité. L’objectif principal est de tester et améliorer la rapidité.",
        flappyMonsterDescription: "Un jeu 2D inspiré de Flappy Bird, recréé avec des visuels originaux. L’accent est mis sur un gameplay simple et continu, où le joueur évite des obstacles à l’aide de designs entièrement créés par le développeur.",
        donutsDescription: "Un exercice de modélisation 3D réalisé sur Blender pour reproduire un donut et une tasse de café. L’objectif est de maîtriser les techniques de base en modélisation, texturage et rendu.",
      },
    
      en: {
        // General
        downloadNow: "Download now",
        back: "Back",
        footer: "© 2025 ALLANO Hugo. All rights reserved.",
        darkMode: "Switch to dark mode",
        lightMode: "Switch to light mode",
    
        // Index
        portfolioTitle: "My Portfolio",
        subtitle: "Developer & creative tech explorer",
        myProjects: "My Projects",
        about: "About",
        darkMode: "Switch to dark mode",
        lightMode: "Switch to light mode",
        viewDetails: "See details",
        aboutText: "Curious, creative, and detail-oriented, I enjoy bringing ideas to life and solving problems in a concrete, hands-on way. My background has allowed me to develop both a sharp eye for detail and a strong ability to see the bigger picture, whether in design, project management, or implementation. I particularly enjoy working on projects that combine technical skills and creativity, and I make it a point to create solutions that are useful, aesthetic, and effective. Always attentive and adaptable, I believe that collaboration and sharing are key to moving forward.",
    
        cosmicAdventuresDescription: "A 2D project inspired by gauntlet-style levels, set in a spaceship. The player faces alien enemies and interacts with objects to recharge energy or recover health, combining combat and resource management.",
        artGalleryDescription: "An interactive fiction exploration project where everything unfolds in writing. The player navigates through textually described rooms, collects objects, and uses them to progress towards the final goal.",
        pirateDescription: "A character creation project in Unity featuring a pirate inspired by Minecraft's blocky style. The goal is to explore low-poly modeling and set up a character.",
        ileDescription: "A 3D environment project in Unity representing an island. It focuses on creating natural landscapes, terrain sculpting, texturing, and basic environment design.",
        syllogismeDescription: "A program designed to check the logical validity of syllogisms. It also generates and displays a table summarizing all valid and invalid syllogism types.",
        rushDescription: "A 3D game focused on reaction speed and movement. The player must reach points that appear randomly on a small map within a limited time. The main objective is to test and improve speed.",
        flappyMonsterDescription: "A 2D game inspired by Flappy Bird, recreated with original visuals. The focus is on simple and continuous gameplay, where the player avoids obstacles using designs entirely created by the developer.",
        donutsDescription: "A 3D modeling exercise done in Blender to recreate a donut and a coffee cup. The goal is to master basic techniques in modeling, texturing, and rendering.",
      },
  };
  
  function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    localStorage.setItem("lang", lang);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "fr";
    setLanguage(savedLang);
  
    const langBtn = document.getElementById("langBtn");
    if (langBtn) {
      langBtn.textContent = savedLang === "fr" ? "EN" : "FR";
      langBtn.addEventListener("click", () => {
        const newLang = localStorage.getItem("lang") === "fr" ? "en" : "fr";
        setLanguage(newLang);
        langBtn.textContent = newLang === "fr" ? "EN" : "FR";
      });
    }
  });

  