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
        subtitle: "Développeur de jeux & créatif passionné",
        myProjects: "Mes Projets",
        about: "À propos",
        viewDetails: "Voir détails",
        aboutText: "Passionné par le développement web et la création de jeux vidéo, je mets ma créativité et mes compétences techniques au service de projets innovants. Curieux et autonome, j’aime relever les défis et apprendre continuellement pour offrir des expériences numériques de qualité.",

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
        subtitle: "Game developer & passionate creative",
        myProjects: "My Projects",
        about: "About",
        darkMode: "Switch to dark mode",
        lightMode: "Switch to light mode",
        viewDetails: "See details",
        aboutText: "Passionate about web development and game creation, I use my creativity and technical skills to build innovative projects. Curious and autonomous, I love taking on challenges and continuously learning to deliver high-quality digital experiences.",
    
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

  