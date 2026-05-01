/**
 * TRPL 1A - Main Application
 * Modern design platform landing page
 */

class TRPLApp {
  constructor() {
    this.elements = {};
    this.state = {
      isDarkMode: false,
      isMobile: window.innerWidth < 768,
      scrollProgress: 0
    };
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.setupScrollTracking();
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.elements = {
      container: document.querySelector('.container'),
      ctaButton: document.querySelector('.hero__cta'),
      navLinks: document.querySelectorAll('.nav__link'),
      headerBrand: document.querySelector('.header__brand')
    };
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // CTA Button
    if (this.elements.ctaButton) {
      this.elements.ctaButton.addEventListener('click', () => this.handleCTAClick());
    }

    // Navigation Links
    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Header Brand
    if (this.elements.headerBrand) {
      this.elements.headerBrand.addEventListener('click', () => this.handleBrandClick());
    }

    // Window Events
    window.addEventListener('resize', () => this.handleResize());
  }

  /**
   * Handle CTA button click
   */
  handleCTAClick() {
    console.log('CTA Button Clicked');
    this.showNotification('Fitur Explore sedang dikembangkan! 🚀');
  }

  /**
   * Handle navigation link click
   */
  handleNavClick(event) {
    event.preventDefault();
    const target = event.currentTarget;
    
    // Update active state
    this.elements.navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
    });
    target.classList.add('nav__link--active');
    
    console.log(`Navigasi ke: ${target.textContent}`);
  }

  /**
   * Handle brand click
   */
  handleBrandClick() {
    console.log('Brand Clicked - Navigate to Home');
  }

  /**
   * Handle window resize
   */
  handleResize() {
    const isMobile = window.innerWidth < 768;
    if (isMobile !== this.state.isM) {
      this.state.isM = isMobile;
      console.log(`Device mode changed to: ${isMobile ? 'Mobile' : 'Desktop'}`);
    }
  }

  /**
   * Setup scroll tracking
   */
  setupScrollTracking() {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.state.scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    });
  }

  /**
   * Show notification
   * @param {string} message - Message to display
   */
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('notification--show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('notification--show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Get app state
   */
  getState() {
    return { ...this.state };
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TRPLApp();
});
