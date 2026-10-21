/**
 * CentralApp - Pricing Module
 * Exact alignment with CentralApp Platform Plans:
 * - Plan Básico: S/ 49/mes
 * - Plan Estándar (Recomendado): S/ 89/mes
 * - Plan Pro Completo: S/ 149/mes
 * - Plan Personalizado: A Medida
 */

const PRICING_DATA = {
  monthly: {
    periodText: '/mes facturado mensual',
    basico: { price: 49, note: 'Ventas rápidas, Caja y Productos' },
    estandar: { price: 89, note: 'Facturación SUNAT, Compras, Caja y Analíticas' },
    pro: { price: 149, note: 'Todos los módulos + IA + Producción/Recetas' },
    custom: { price: 'A medida', note: 'Selecciona módulos a tu necesidad' }
  },
  annual: {
    periodText: '/mes (ahorras 20% pagando anual)',
    basico: { price: 39, note: 'S/ 468 al año (Ahorras S/ 120)' },
    estandar: { price: 71, note: 'S/ 852 al año (Ahorras S/ 216)' },
    pro: { price: 119, note: 'S/ 1,428 al año (Ahorras S/ 360)' },
    custom: { price: 'A medida', note: 'Planes corporativos con descuento' }
  }
};

export function initPricing() {
  const billingButtons = document.querySelectorAll('.billing-opt-btn');
  const basicoPriceElem = document.getElementById('price-basico');
  const estandarPriceElem = document.getElementById('price-estandar');
  const proPriceElem = document.getElementById('price-pro');
  const periodTextElems = document.querySelectorAll('.price-period');

  let currentCycle = 'annual'; // Default to annual discount for best conversion

  function updatePrices(cycle) {
    currentCycle = cycle;
    const data = PRICING_DATA[cycle];

    if (basicoPriceElem) basicoPriceElem.textContent = data.basico.price;
    if (estandarPriceElem) estandarPriceElem.textContent = data.estandar.price;
    if (proPriceElem) proPriceElem.textContent = data.pro.price;

    periodTextElems.forEach((elem) => {
      elem.textContent = data.periodText;
    });

    billingButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-cycle') === cycle);
    });
  }

  billingButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cycle = btn.getAttribute('data-cycle');
      if (cycle) {
        updatePrices(cycle);
      }
    });
  });

  // Attach plan click triggers to open lead modal with preselected plan
  const planSelectButtons = document.querySelectorAll('[data-plan-select]');
  planSelectButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan-select');
      window.dispatchEvent(new CustomEvent('open-demo-modal', {
        detail: { plan: planName, cycle: currentCycle }
      }));
    });
  });

  // Initial set
  updatePrices('annual');
}
