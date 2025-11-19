// ============================= 
//  UPDATE AUTOMAT AN FOOTER
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


// =============================
//  FUNCȚIE INCLUDE HTML (NAVBAR + FOOTER)
// =============================
function includeHTML(callback) {
  const elements = document.querySelectorAll("[w3-include-html]");
  let loaded = 0;

  if (elements.length === 0 && callback) {
    callback();
    return;
  }

  elements.forEach(el => {
    const file = el.getAttribute("w3-include-html");

    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        el.removeAttribute("w3-include-html");
        loaded++;

        if (loaded === elements.length && callback) {
          callback();
        }
      });
  });
}


// =============================
//  PORNIM TOATE SCRIPTURILE DUPĂ CE SE ÎNCARCĂ NAVBAR + FOOTER
// =============================
includeHTML(() => {
  console.log("HTML components loaded.");

  // ================ ACTIVARE BURGER MENU ================
  initMobileMenu();

  // ================= FILTRARE PRODUSE =================
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".flashcard");

  if (buttons.length > 0) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;

        cards.forEach(card => {
          if (filter === "all" || card.dataset.category === filter) {
            card.classList.remove("hide");
          } else {
            card.classList.add("hide");
          }
        });
      });
    });
  }

  // ================= FADE-IN LA SCROLL =================
  const fadeEls = document.querySelectorAll(".fade-in");

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));
  }


  // ================= POPUP DETALII PRODUS =================
  const popup = document.getElementById("productPopup");
  const popupImg = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");

  if (popup && popupImg && popupTitle) {
    const popupClose = popup.querySelector(".popup-close");

    document.querySelectorAll(".flashcard img").forEach(img => {
      img.addEventListener("click", () => {
        popupImg.src = img.src;
        popupTitle.textContent = img.alt;
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
      document.body.style.overflow = "auto";
    });

    popup.addEventListener("click", e => {
      if (e.target === popup) {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
});


// =============================
//  FUNCȚIE BURGER MENU
// =============================
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("is-open");
    nav.classList.toggle("is-open");

    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });
}
