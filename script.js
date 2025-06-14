document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle-btn")
  const body = document.body

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.classList.toggle("dark-mode", savedTheme === "dark")
  } else {
    // Default to dark mode as shown in the app screenshot
    body.classList.add("dark-mode")
  }

  function toggleTheme() {
    body.classList.toggle("dark-mode")
    const theme = body.classList.contains("dark-mode") ? "dark" : "light"
    localStorage.setItem("theme", theme)
  }

  themeToggleBtn.addEventListener("click", toggleTheme)
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener("click", toggleTheme)
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Tabs functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to current button and content
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Quick Exit functionality
  const quickExitBtn = document.getElementById("quick-exit-btn")

  quickExitBtn.addEventListener("click", () => {
    quickExit()
  })

  // Also trigger quick exit on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      quickExit()
    }
  })

  function quickExit() {
    // Redirect to a safe website (weather website as mentioned in requirements)
    window.location.href = "https://www.accuweather.com/"
  }

  // Smooth scrolling for anchor links with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Get header height for offset
        const headerHeight = document.querySelector("header").offsetHeight

        window.scrollTo({
          top: targetElement.offsetTop - headerHeight - 20, // Additional 20px padding
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission handling
  const notifyForm = document.querySelector(".notify-form")
  if (notifyForm) {
    notifyForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      alert(`Thank you! We'll notify ${email} when the app launches.`)
      this.reset()
    })
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".feature-card, .emergency-card, .article-card, .law-card, .website-card, .stat-card",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  document
    .querySelectorAll(".feature-card, .emergency-card, .article-card, .law-card, .website-card, .stat-card")
    .forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Add lazy loading for images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]')

  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    lazyImages.forEach((img) => {
      img.src = img.dataset.src
    })
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })

    lazyImages.forEach((img) => {
      lazyImageObserver.observe(img)
    })
  }

  // Improve mobile experience by adjusting header on scroll
  let lastScrollTop = 0
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down & past header
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up or at top
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })
})
