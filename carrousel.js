const slides = document.querySelector('.slides');
    const slideElements = document.querySelectorAll('.slides img, .slides video');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
      const slideWidth = slides.clientWidth;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideElements.length;
      showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
      showSlide(currentIndex);
    });

    window.addEventListener('resize', () => showSlide(currentIndex));