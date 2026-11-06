/**
 * CentralApp - Pricing Module
 * Exact alignment with CentralApp Platform Plans:
 * - Plan POS: S/ 69.90/mes
 * - Plan Facturador (Recomendado): S/ 119.90/mes
 * - Plan BI (Business Intelligence - Todo Incluido): S/ 199.90/mes
 * - Personalizar / Agendar Llamada: A Medida
 *
 * Extras:
 * - +500 CPE: S/ 49.90/mes
 * - +1 Sede: S/ 49.90/mes
 * - Integración Llamafood: S/ 49.90/mes
 * - Integración Spotify: S/ 34.90/mes
 */

export const PRICING_DATA = {
  pos: {
    name: 'Plan POS',
    price: '69.90',
    note: 'Compras, ventas, flujo de caja, control de mermas, añade producción e insumos y panel principal.'
  },
  facturador: {
    name: 'Plan Facturador',
    price: '119.90',
    note: 'Todo lo del POS, facturar hasta 500 CPE al mes y control de asistencia.'
  },
  bi: {
    name: 'Plan BI',
    price: '199.90',
    note: 'Todo lo del Facturador, facturar hasta 2,000 CPE al mes, analíticas, módulos de IA y gamificación.'
  },
  custom: {
    name: 'Personalizar / Agendar Llamada',
    price: 'A medida',
    note: 'Agenda una llamada para personalizar tu plan o múltiples establecimientos.'
  }
};

export function initPricing() {
  // Attach plan click triggers to open lead modal with preselected plan
  const planSelectButtons = document.querySelectorAll('[data-plan-select]');
  planSelectButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan-select');
      window.dispatchEvent(new CustomEvent('open-demo-modal', {
        detail: { plan: planName }
      }));
    });
  });
}
