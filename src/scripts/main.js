/**
 * CentralApp - Main Application Script
 * Clean Code Architecture orchestrating all UI modules.
 */

import { initTheme } from './theme.js';
import { initAISimulator } from './ai-simulator.js';
import { initPricing } from './pricing.js';
import { initROICalculator } from './roi-calculator.js';
import { initModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme (Dark / Light)
  initTheme();

  // 2. Initialize Central AI Advisor Simulator
  initAISimulator();

  // 3. Initialize Defontana-inspired Pricing & Billing Switch
  initPricing();

  // 4. Initialize ROI & Savings Calculator
  initROICalculator();

  // 5. Initialize Lead Demo Modal
  initModal();

  // 6. Header Scroll Blur Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 7. Mobile Navigation Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('.material-symbols-rounded');
      if (icon) {
        icon.textContent = isOpen ? 'close' : 'menu';
      }
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('.material-symbols-rounded');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 9. Dynamic Year in Footer
  const yearElem = document.getElementById('footer-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
