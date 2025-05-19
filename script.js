// Perkins Professional Roofing - Main JavaScript

// DOM Elements
const navbar = document.getElementById("navbar");
const backToTopBtn = document.getElementById("back-to-top");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");
const animateElements = document.querySelectorAll(".animate-on-scroll");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
const prevTestimonialBtn = document.querySelector(".prev-testimonial");
const nextTestimonialBtn = document.querySelector(".next-testimonial");
const contactForm = document.getElementById("quote-form");

// Current slide index
let currentSlide = 0;

// === SCROLL ANIMATIONS ===
// Add scrolled class to navbar when scrolled
function toggleScrolledClass() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    backToTopBtn.classList.add("active");
  } else {
    navbar.classList.remove("scrolled");
    backToTopBtn.classList.remove("active");
  }
}

// Handle scroll animations
function handleScrollAnimations() {
  animateElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.classList.add("animated");
    }
  });
}

// === MOBILE MENU ===
// Toggle mobile menu
function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
}

// Close mobile menu when a link is clicked
function closeMobileMenu() {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
}

// === TESTIMONIAL SLIDER ===
// Show slide based on index
function showSlide(index) {
  // Hide all slides
  testimonialSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show current slide and active dot
  testimonialSlides[index].classList.add("active");
  dots[index].classList.add("active");

  // Update current slide index
  currentSlide = index;
}

// Next slide
function nextSlide() {
  let nextIndex = currentSlide + 1;
  if (nextIndex >= testimonialSlides.length) {
    nextIndex = 0;
  }
  showSlide(nextIndex);
}

// Previous slide
function prevSlide() {
  let prevIndex = currentSlide - 1;
  if (prevIndex < 0) {
    prevIndex = testimonialSlides.length - 1;
  }
  showSlide(prevIndex);
}

// Auto slide testimonials
const autoSlide = setInterval(() => {
  nextSlide();
}, 5000);

// === FORM HANDLING ===
// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const formValues = Object.fromEntries(formData.entries());

  // Simple validation
  let isValid = true;
  for (const key in formValues) {
    if (!formValues[key]) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    // In a real application, you would send this data to a server
    // For now, just show a success message
    alert("Thanks for your inquiry! We will contact you soon.");
    contactForm.reset();
  } else {
    alert("Please fill out all fields.");
  }
}

// === SMOOTH SCROLLING ===
// Implement smooth scrolling for navigation links
function smoothScroll(e) {
  e.preventDefault();

  const targetId = this.getAttribute("href");
  if (targetId && targetId.startsWith("#") && targetId !== "#") {
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu
      closeMobileMenu();

      // Get navbar height for offset
      const navbarHeight = navbar.getBoundingClientRect().height;

      // Calculate scroll position
      const topOffset =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      // Smooth scroll to target
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  }
}

// === ACTIVE LINK HIGHLIGHTING ===
// Set active link based on scroll position
function highlightActiveLink() {
  const sections = document.querySelectorAll("section");

  // Get current scroll position
  const scrollPosition = window.scrollY;

  // Check each section
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbar.offsetHeight;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      sectionId &&
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active class from all links
      navLinksItems.forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to current section link
      const currentLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );
      if (currentLink) {
        currentLink.classList.add("active");
      }
    }
  });
}

// Parallax effect for sections with fixed background
function handleParallax() {
  const parallaxSections = document.querySelectorAll(
    ".hero, .why-choose-us, .cta"
  );

  parallaxSections.forEach((section) => {
    const scrollPosition = window.pageYOffset;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Check if section is in viewport
    if (
      scrollPosition + window.innerHeight > sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const parallaxSpeed = 0.5;
      const yOffset = (scrollPosition - sectionTop) * parallaxSpeed;

      // Apply transform to create parallax effect
      section.style.backgroundPositionY = `calc(50% + ${yOffset}px)`;
    }
  });
}

// === EVENT LISTENERS ===
// Window event listeners
window.addEventListener("scroll", toggleScrolledClass);
window.addEventListener("scroll", handleScrollAnimations);
window.addEventListener("scroll", highlightActiveLink);
window.addEventListener("scroll", handleParallax);
window.addEventListener("load", handleScrollAnimations);

// Back to top button click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Mobile menu toggle
hamburger.addEventListener("click", toggleMobileMenu);

// Navigation links
navLinksItems.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});

// Testimonial controls
prevTestimonialBtn.addEventListener("click", () => {
  clearInterval(autoSlide);
  prevSlide();
});

nextTestimonialBtn.addEventListener("click", () => {
  clearInterval(autoSlide);
  nextSlide();
});

// Testimonial dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(autoSlide);
    showSlide(index);
  });
});

// Form submission
if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}

// === INITIALIZE ===
// Set initial state
toggleScrolledClass();
handleScrollAnimations();
highlightActiveLink();

// Initialize AOS or custom animations
document.addEventListener("DOMContentLoaded", () => {
  // Show first testimonial
  showSlide(0);
});
