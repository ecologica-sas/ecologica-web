/* ===== FUNCIONALIDADES JAVASCRIPT PARA ECOLOGICA INTEGRADA ===== */

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeScrollEffects();
  initializeFormHandling();
  initializeAnimations();
});

// ===== NAVEGACIÓN Y MENÚ MÓVIL =====
function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");
  const header = document.getElementById("header");

  // Toggle del menú móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show-menu");

      // Cambiar ícono del botón
      const icon = navToggle.querySelector("i");
      if (navMenu.classList.contains("show-menu")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("show-menu");
      const icon = navToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Efecto de scroll en el header
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  });

  // Navegación suave
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== EFECTOS DE SCROLL =====
function initializeScrollEffects() {
  // Intersection Observer para animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");

        // Para elementos específicos, aplicar diferentes animaciones
        if (entry.target.classList.contains("about__text")) {
          entry.target.classList.add("fade-in-right");
        }
        if (entry.target.classList.contains("about__image")) {
          entry.target.classList.add("fade-in-left");
        }
      }
    });
  }, observerOptions);

  // Observar elementos para animaciones
  const animatedElements = document.querySelectorAll(
    ".section__title, .service__card, .mission-vision__card, .experience__item, .contact__item"
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Actualizar enlace activo en navegación
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(
        `.nav__link[href="#${sectionId}"]`
      );

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav__link").forEach((link) => {
          link.classList.remove("active-link");
        });
        if (correspondingLink) {
          correspondingLink.classList.add("active-link");
        }
      }
    });
  });
}

// ===== MANEJO DE FORMULARIO DE CONTACTO =====
function initializeFormHandling() {
  const whatsappButton = document.querySelector(".btn--whatsapp");
  if (whatsappButton) {
    whatsappButton.addEventListener("click", function () {
      const message = encodeURIComponent(
        "Hola! me interesa contactar con EcoLógica Integrada S.A.S."
      );
      const phoneNumber = "573234822535"; // <-- tu número con el código de país
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappURL, "_blank");
    });
  }
}

// ===== FUNCIÓN DE VALIDACIÓN DE EMAIL =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
            <button class="notification__close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Estilos para la notificación
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${
          type === "success"
            ? "#4caf50"
            : type === "error"
            ? "#f44336"
            : "#2196f3"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    closeNotification(notification.querySelector(".notification__close"));
  }, 5000);
}

function closeNotification(closeBtn) {
  const notification = closeBtn.closest(".notification");
  notification.style.transform = "translateX(100%)";
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// ===== ANIMACIONES Y EFECTOS VISUALES =====
function initializeAnimations() {
  // Efecto parallax suave para el hero (deshabilitado para evitar superposiciones)
  // window.addEventListener("scroll", function () {
  //   const scrolled = window.pageYOffset;
  //   const hero = document.querySelector(".hero");

  //   if (hero) {
  //     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  //   }
  // });

  // Efecto de typing para el título principal (opcional)
  const heroTitle = document.querySelector(".hero__title");
  if (heroTitle && window.innerWidth > 768) {
    animateTyping(heroTitle, heroTitle.textContent);
  }

  // Contador animado para estadísticas (si se agregan en el futuro)
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    animateCounter(counter);
  });
}

// ===== ANIMACIÓN DE TYPING =====
function animateTyping(element, text) {
  element.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  // Iniciar animación después de un delay
  setTimeout(typeWriter, 500);
}

// ===== ANIMACIÓN DE CONTADORES =====
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 segundos
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  function updateCounter() {
    if (current < target) {
      current += increment;
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// ===== FUNCIONES UTILITARIAS =====

// Función para scroll suave a cualquier elemento
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const headerHeight = document.getElementById("header").offsetHeight;
    const targetPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Función para alternar tema (para futuras implementaciones)
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-theme") ? "dark" : "light"
  );
}

// Cargar tema guardado
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

// ===== OPTIMIZACIONES DE RENDIMIENTO =====

// Throttle para eventos de scroll
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Aplicar throttle a eventos de scroll
window.addEventListener(
  "scroll",
  throttle(function () {
    // Aquí se pueden agregar más efectos de scroll optimizados
  }, 16)
); // 60fps

// ===== MANEJO DE ERRORES =====
window.addEventListener("error", function (e) {
  console.error("Error en la página:", e.error);
  // Aquí se podría enviar el error a un servicio de monitoreo
});

// ===== FUNCIONES DE ACCESIBILIDAD =====

// Navegación con teclado
document.addEventListener("keydown", function (e) {
  // ESC para cerrar menús
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    if (navMenu && navMenu.classList.contains("show-menu")) {
      navMenu.classList.remove("show-menu");
      const navToggle = document.getElementById("nav-toggle");
      const icon = navToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }
});

// ===== INICIALIZACIÓN ADICIONAL =====

// Cargar tema al inicializar
loadSavedTheme();

// Lazy loading para imágenes (si se agregan en el futuro)
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Inicializar lazy loading si hay imágenes
initializeLazyLoading();

// ===== CONSOLA DE BIENVENIDA =====
console.log(`
🌿 ¡Bienvenido a EcoLógica Integrada S.A.S.!
💚 Desarrollado con amor por el medio ambiente
🌱 Pensamos en verde, actuamos con lógica
`);

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL (si es necesario) =====
window.EcoLogica = {
  scrollToElement,
  showNotification,
  toggleTheme,
};
