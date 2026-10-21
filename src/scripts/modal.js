/**
 * CentralApp - Demo Booking & Free Trial Modal
 * Provides seamless lead capture and instant WhatsApp direct redirection.
 */

const WHATSAPP_PHONE = '51999999999'; // Can be customized with client's direct business WhatsApp

export function initModal() {
  const modal = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-demo]');
  const form = document.getElementById('demo-lead-form');
  const planSelect = document.getElementById('lead-plan-select');

  if (!modal) return;

  function openModal(prefilledPlan = '') {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (prefilledPlan && planSelect) {
      planSelect.value = prefilledPlan;
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Listen to custom event dispatched by pricing buttons
  window.addEventListener('open-demo-modal', (e) => {
    openModal(e.detail?.plan || '');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close when clicking background outside the box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('lead-name')?.value.trim();
      const phone = document.getElementById('lead-phone')?.value.trim();
      const business = document.getElementById('lead-business')?.value.trim();
      const plan = planSelect?.value || 'Pro Crecimiento';

      // Build personalized WhatsApp text
      const message = `Hola CentralApp, soy ${name} de *${business}*. Me interesa comenzar la prueba gratuita del *Plan ${plan}* y ver una demostración en vivo de Central AI Advisor. Mi teléfono de contacto es ${phone}.`;

      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

      // Show immediate feedback
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `
          <span class="material-symbols-rounded">check_circle</span>
          ¡Conectando con tu Asesor...!
        `;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        window.open(waUrl, '_blank');
        closeModal();
        if (submitBtn) {
          submitBtn.innerHTML = `
            <span>Comenzar Prueba Gratis (14 Días)</span>
            <span class="material-symbols-rounded">arrow_forward</span>
          `;
          submitBtn.disabled = false;
        }
        form.reset();
      }, 800);
    });
  }
}
