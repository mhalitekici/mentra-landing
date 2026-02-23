(function () {
  const SCREENSHOT_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif"];
  const VIDEO_CANDIDATES = [
    "./assets/videos/tanitim.mp4",
    "./assets/videos/promo.mp4",
    "./assets/videos/mentra-tanitim.mp4",
    "./assets/videos/tanitim.webm",
  ];

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = Array.from(document.querySelectorAll(".main-nav a"));

  const helpFab = document.getElementById("help-fab");
  const helpPanel = document.getElementById("help-panel");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  const promoVideo = document.getElementById("promo-video");
  const promoVideoPlaceholder = document.getElementById("promo-video-placeholder");

  function checkImageExists(src) {
    return new Promise(function (resolve) {
      const image = new Image();
      image.onload = function () {
        resolve(true);
      };
      image.onerror = function () {
        resolve(false);
      };
      image.src = src;
    });
  }

  async function checkAssetExists(url) {
    try {
      const response = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (response.ok) return true;
    } catch (error) {
      // ignore and fallback to GET
    }

    try {
      const response = await fetch(url, { method: "GET", cache: "no-store" });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async function findCustomScreenSource(screenKey) {
    for (const extension of SCREENSHOT_EXTENSIONS) {
      const candidate = "./assets/screenshots/" + screenKey + "." + extension;
      const exists = await checkImageExists(candidate);
      if (exists) {
        return candidate;
      }
    }
    return null;
  }

  async function hydrateScreenAssets() {
    const screenNodes = Array.from(document.querySelectorAll("[data-screen]"));
    const screenKeys = Array.from(
      new Set(
        screenNodes
          .map(function (node) {
            return node.getAttribute("data-screen");
          })
          .filter(Boolean)
      )
    );

    for (const screenKey of screenKeys) {
      const customSource = await findCustomScreenSource(screenKey);
      const nodesForKey = screenNodes.filter(function (node) {
        return node.getAttribute("data-screen") === screenKey;
      });

      nodesForKey.forEach(function (node) {
        const fallback = node.getAttribute("data-fallback") || "";
        const source = customSource || fallback;
        if (!source) return;

        if (node instanceof HTMLImageElement) {
          node.src = source;
          return;
        }

        if (node.classList.contains("shot-card")) {
          node.setAttribute("data-image", source);
          const image = node.querySelector("img");
          if (image instanceof HTMLImageElement) {
            image.src = source;
          }
        }
      });
    }
  }

  async function hydratePromoVideo() {
    if (!(promoVideo instanceof HTMLVideoElement) || !(promoVideoPlaceholder instanceof HTMLElement)) {
      return;
    }

    for (const candidate of VIDEO_CANDIDATES) {
      const exists = await checkAssetExists(candidate);
      if (!exists) continue;

      promoVideo.src = candidate;
      promoVideo.classList.add("ready");
      promoVideoPlaceholder.style.display = "none";
      return;
    }

    promoVideo.classList.remove("ready");
    promoVideoPlaceholder.style.display = "block";
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach(function (item) {
      io.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("revealed");
    });
  }

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item, index) {
    const button = item.querySelector(".faq-question");
    if (!button) return;

    if (index === 0) {
      item.classList.add("open");
    }

    button.addEventListener("click", function () {
      const shouldOpen = !item.classList.contains("open");
      faqItems.forEach(function (other) {
        other.classList.remove("open");
      });
      if (shouldOpen) {
        item.classList.add("open");
      }
    });
  });

  const shotCards = Array.from(document.querySelectorAll(".shot-card"));
  hydrateScreenAssets();
  hydratePromoVideo();

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImage) {
      lightboxImage.setAttribute("src", "");
      lightboxImage.setAttribute("alt", "");
    }
  }

  shotCards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCaption) return;
      const image = card.getAttribute("data-image") || "";
      const title = card.getAttribute("data-title") || "Ekran";
      const caption = card.getAttribute("data-caption") || "";

      lightboxImage.setAttribute("src", image);
      lightboxImage.setAttribute("alt", title);
      lightboxTitle.textContent = title;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  function closeHelpPanel() {
    if (!helpPanel || !helpFab) return;
    helpPanel.classList.remove("open");
    helpPanel.setAttribute("aria-hidden", "true");
    helpFab.setAttribute("aria-expanded", "false");
  }

  function openHelpPanel() {
    if (!helpPanel || !helpFab) return;
    helpPanel.classList.add("open");
    helpPanel.setAttribute("aria-hidden", "false");
    helpFab.setAttribute("aria-expanded", "true");
  }

  if (helpFab && helpPanel) {
    helpFab.addEventListener("click", function () {
      const isOpen = helpPanel.classList.contains("open");
      if (isOpen) {
        closeHelpPanel();
      } else {
        openHelpPanel();
      }
    });

    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!helpPanel.contains(target) && !helpFab.contains(target)) {
        closeHelpPanel();
      }
    });

    helpPanel.querySelectorAll("button[data-scroll]").forEach(function (button) {
      button.addEventListener("click", function () {
        const targetSelector = button.getAttribute("data-scroll");
        if (!targetSelector) return;
        const section = document.querySelector(targetSelector);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        closeHelpPanel();
      });
    });
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function updateActiveNav() {
    const sections = navLinks
      .map(function (link) {
        const hash = link.getAttribute("href");
        if (!hash || !hash.startsWith("#")) return null;
        const section = document.querySelector(hash);
        return section ? { link: link, section: section } : null;
      })
      .filter(Boolean);

    const scrollY = window.scrollY + 120;

    sections.forEach(function (entry) {
      const top = entry.section.offsetTop;
      const bottom = top + entry.section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        entry.link.classList.add("active");
      } else {
        entry.link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
      closeHelpPanel();
      if (nav && navToggle) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
})();
