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
    
        // Rush That
        rushDescription: "Plongez dans une aventure palpitante où vous explorez des donjons mystérieux, affrontez des boss épiques et découvrez des trésors cachés. Inspiré des meilleurs RPG, ce jeu mélange exploration, puzzle et action.",
        tagTimer: "Contre-la-montre",
        tagSpeed: "vitesse",
        tagSolo: "Solo",
    
        // Boids
        boidsDescription: "Simulation d'un vol d'oiseaux en essaim, basée sur des comportements mathématiques et physiques. Chaque oiseau réagit aux autres et crée un mouvement collectif fluide et naturel.",
        tagMath: "mathématiques",
        tagFlight: "vol",
        tagBirds: "oiseaux",
    
        // Pirate
        pirateDescription: "Modélisation 3D d'un personnage pirate stylisé. Conçu pour un univers d'aventure, ce modèle met l'accent sur la personnalité et les détails visuels pour renforcer l'identité du personnage.",
        tagModeling: "Modélisation",
        tagPirate: "pirate",
    
        // Ile
        ileDescription: "Modélisation d'une île 3D immersive, conçue pour explorer un environnement naturel et détaillé. Ce projet met en avant la création de terrains, la végétation et l'ambiance d'une aventure tropicale.",
        tagMap: "Map",
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
    
        // Rush That
        rushDescription: "Dive into an exciting adventure where you explore mysterious dungeons, face epic bosses, and discover hidden treasures. Inspired by the best RPGs, this game combines exploration, puzzles, and action.",
        tagTimer: "Speedrun",
        tagSpeed: "Speed",
        tagSolo: "Solo",
    
        // Boids
        boidsDescription: "Simulation of a flock of birds, based on mathematical and physical behaviors. Each bird reacts to others, creating smooth and natural collective motion.",
        tagMath: "mathematics",
        tagFlight: "flight",
        tagBirds: "birds",
    
        // Pirate
        pirateDescription: "3D modeling of a stylized pirate character. Designed for an adventure universe, this model emphasizes personality and visual details to strengthen the character's identity.",
        tagModeling: "Modeling",
        tagPirate: "pirate",
    
        // Ile
        ileDescription: "3D modeling of an immersive island, designed to explore a natural and detailed environment. This project highlights terrain creation, vegetation, and a tropical adventure atmosphere.",
        tagMap: "Map",
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

  