/**
 * CentralApp - Demo Booking & Free Trial Modal
 * Provides seamless lead capture, modern custom plan selector, and instant WhatsApp direct redirection.
 */

const WHATSAPP_PHONE = '51995585320'; // Can be customized with client's direct business WhatsApp

export function initModal() {
  const modal = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-demo]');
  const form = document.getElementById('demo-lead-form');
  const planSelect = document.getElementById('lead-plan-select');

  // Custom Plan Select Elements
  const customSelect = document.getElementById('custom-plan-select');
  const selectTrigger = document.getElementById('plan-select-trigger');
  const selectOptions = customSelect ? Array.from(customSelect.querySelectorAll('.custom-select-option')) : [];
  const selectedIcon = document.getElementById('selected-plan-icon');
  const selectedTitle = document.getElementById('selected-plan-title');
  const selectedBadge = document.getElementById('selected-plan-badge');
  const selectedDesc = document.getElementById('selected-plan-desc');

  if (!modal) return;

  function closeDropdown() {
    if (!customSelect || !selectTrigger) return;
    customSelect.classList.remove('open');
    selectTrigger.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown() {
    if (!customSelect || !selectTrigger) return;
    const isOpen = customSelect.classList.toggle('open');
    selectTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function setPlanValue(planValue) {
    if (!planValue) return;
    const targetOpt = selectOptions.find((opt) => opt.getAttribute('data-value') === planValue);
    if (!targetOpt) return;

    if (planSelect) {
      planSelect.value = planValue;
    }

    selectOptions.forEach((opt) => {
      const isMatch = opt === targetOpt;
      opt.classList.toggle('selected', isMatch);
      opt.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    const icon = targetOpt.getAttribute('data-icon') || 'verified';
    const badge = targetOpt.getAttribute('data-badge') || '';
    const badgeType = targetOpt.getAttribute('data-badge-type') || 'neutral';
    const desc = targetOpt.getAttribute('data-desc') || '';

    if (selectedIcon) selectedIcon.textContent = icon;
    if (selectedTitle) selectedTitle.textContent = planValue;
    if (selectedBadge) {
      selectedBadge.textContent = badge;
      selectedBadge.classList.toggle('badge-featured', badgeType === 'featured');
    }
    if (selectedDesc) selectedDesc.textContent = desc;
  }

  if (selectTrigger) {
    selectTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    selectTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!customSelect.classList.contains('open')) {
          toggleDropdown();
        }
        const currentIdx = selectOptions.findIndex((opt) => opt.classList.contains('selected'));
        const dir = e.key === 'ArrowDown' ? 1 : -1;
        const nextIdx = (currentIdx + dir + selectOptions.length) % selectOptions.length;
        const nextVal = selectOptions[nextIdx]?.getAttribute('data-value');
        if (nextVal) setPlanValue(nextVal);
      }
    });
  }

  selectOptions.forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = opt.getAttribute('data-value');
      if (val) setPlanValue(val);
      closeDropdown();
      selectTrigger?.focus();
    });
  });

  // Close dropdown when clicking outside inside modal
  document.addEventListener('click', (e) => {
    if (customSelect && !customSelect.contains(e.target)) {
      closeDropdown();
    }
  });

  function openModal(prefilledPlan = '') {
    closeDropdown();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (prefilledPlan) {
      setPlanValue(prefilledPlan);
    }
  }

  function closeModal() {
    closeDropdown();
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
      if (customSelect?.classList.contains('open')) {
        closeDropdown();
      } else {
        closeModal();
      }
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeDropdown();

      const name = document.getElementById('lead-name')?.value.trim();
      const phone = document.getElementById('lead-phone')?.value.trim();
      const business = document.getElementById('lead-business')?.value.trim();
      const plan = planSelect?.value || 'Plan Facturador';

      // Build personalized WhatsApp text
      const isCustomCall = plan.includes('Personalizar') || plan.includes('Llamada');
      const message = isCustomCall
        ? `Hola CentralApp, soy ${name} de *${business}*. Quisiera *agendar una llamada* para personalizar un plan a la medida de mi negocio. Mi teléfono de contacto es ${phone}.`
        : `Hola CentralApp, soy ${name} de *${business}*. Me interesa comenzar la prueba gratuita del *${plan}* y agendar una cita con un asesor para empezar a usar CentralApp. Mi teléfono de contacto es ${phone}.`;

      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

      // Show immediate feedback
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `
          <span class="material-symbols-rounded">check_circle</span>
          <span>¡Conectando con tu Asesor...!</span>
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
        setPlanValue('Plan Facturador');
      }, 800);
    });
  }
}
