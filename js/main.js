// Galería de productos: scroll (desktop) y swipe (mobile)
function initGalerias() {
  document.querySelectorAll(".galeria").forEach(function (galeria) {
    const imgs = galeria.querySelectorAll(".galeria__img");
    const dotsContainer = galeria.closest(".producto__img-wrap").querySelector(".galeria__dots");
    let index = 0;

    // Crear dots
    imgs.forEach(function (_, i) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () { goTo(i); });
      dotsContainer.appendChild(dot);
    });

    function goTo(newIndex) {
      imgs[index].classList.remove("active");
      dotsContainer.querySelectorAll(".dot")[index].classList.remove("active");
      index = (newIndex + imgs.length) % imgs.length;
      imgs[index].classList.add("active");
      dotsContainer.querySelectorAll(".dot")[index].classList.add("active");
    }

    // Scroll con rueda del mouse
    galeria.closest(".producto__img-wrap").addEventListener("wheel", function (e) {
      e.preventDefault();
      goTo(e.deltaY > 0 ? index + 1 : index - 1);
    }, { passive: false });

    // Swipe táctil (mobile)
    let touchStartX = 0;
    galeria.closest(".producto__img-wrap").addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    galeria.closest(".producto__img-wrap").addEventListener("touchend", function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? index + 1 : index - 1);
      }
    }, { passive: true });
  });
}

initGalerias();

// Header: transparente → sólido al hacer scroll
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animacion de aparicion al hacer scroll (fade-in)
const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".producto__card, .contacto__card, .nosotros__inner").forEach(function (el) {
  el.classList.add("fade-in");
  observer.observe(el);
});
