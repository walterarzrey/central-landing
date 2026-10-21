/**
 * CentralApp - Central AI Advisor Interactive Simulator
 * Adaptable to Retail, Wholesale (Compra y Venta por Mayor/Menor) and Gastronomy businesses.
 */

const SIMULATION_DATA = {
  mayorista: {
    name: 'Comercio, Tienda & Ventas por Delivery',
    score: 94,
    summary: 'Excelente flujo comercial. Las Listas de Precios Dinámicas protegen tu margen en Apps de Delivery (+25% comisión), mostrador y clientes especiales.',
    insights: [
      {
        type: 'success',
        icon: 'sell',
        title: 'Listas de Precios Dinámicas Activas',
        desc: 'Tus precios diferenciados para Mostrador, Apps de Delivery y Clientes Frecuentes evitaron perder margen por comisiones de plataformas.'
      },
      {
        type: 'warning',
        icon: 'receipt_long',
        title: 'Facturación SUNAT al Día',
        desc: 'Se emitieron 1,420 Facturas y Boletas electrónicas validadas al instante y enviadas por WhatsApp sin rechazos.'
      },
      {
        type: 'info',
        icon: 'photo_camera',
        title: 'Registro de Compras por Foto con IA',
        desc: 'Se subieron 48 facturas de proveedores con lectura automática de IA, ahorrando 14 horas de digitación manual de mercadería.'
      }
    ],
    actionPlan: 'Ajustar +3% la Lista de Precios de Apps de Delivery en los 4 productos más pedidos para mantener tu ganancia neta intacta.'
  },
  retail: {
    name: 'Tienda Comercial, Minimarket & Retail',
    score: 89,
    summary: 'Rendimiento sólido en mostrador con cobros rápidos en segundos. Cero diferencias en los cierres de caja chica.',
    insights: [
      {
        type: 'success',
        icon: 'point_of_sale',
        title: 'Caja Rápida y Multi-pago',
        desc: 'Cobros integrados con Yape, Plin y Tarjetas agilizaron la atención a 12 segundos por cliente en hora punta.'
      },
      {
        type: 'warning',
        icon: 'inventory',
        title: 'Alerta de Stock por Agotarse',
        desc: '5 productos de alta demanda están por debajo del stock mínimo. Puedes generar tu lista de compra sugerida en 1 clic.'
      },
      {
        type: 'info',
        icon: 'insights',
        title: 'Packs y Promociones Sugeridas',
        desc: 'La IA detectó que quienes compran el Producto A llevan también el B el 68% de las veces. Sugerido: Crear Pack Promocional.'
      }
    ],
    actionPlan: 'Reabastecer los 5 productos críticos antes del viernes para no perder ventas el fin de semana.'
  },
  pasteleria: {
    name: 'Pastelería, Panadería & Cafetería',
    score: 87,
    summary: 'Producción continua con excelente margen por receta. Oportunidad clave en el control de costos de ingredientes y mermas.',
    insights: [
      {
        type: 'warning',
        icon: 'trending_up',
        title: 'Alerta de Subida en Ingredientes',
        desc: 'La mantequilla y el chocolate subieron +12% en tu última factura de compra. El sistema reajustó el margen real de tus recetas.'
      },
      {
        type: 'success',
        icon: 'cookie',
        title: 'Recetas Dinámicas con Control de Ganancia',
        desc: 'Cada torta o postre vendido descuenta automáticamente sus ingredientes exactos del almacén y calcula tu ganancia neta.'
      },
      {
        type: 'info',
        icon: 'schedule',
        title: 'Horario de Mayor Venta',
        desc: 'El 65% de ventas ocurren entre 5:30 PM y 8:30 PM. Sugerencia: reforzar vitrina y empaque en ese horario.'
      }
    ],
    actionPlan: 'Actualizar el precio sugerido o comprar por mayor los 2 ingredientes que subieron esta semana.'
  },
  produccion: {
    name: 'Restaurante & Producción de Alimentos',
    score: 91,
    summary: 'Operación coordinada entre salón y cocina. El arqueo ciego de caja evita pérdidas de dinero en un 99.6%.',
    insights: [
      {
        type: 'success',
        icon: 'verified_user',
        title: 'Arqueo Ciego Libre de Pérdidas',
        desc: 'Los cajeros declaran el dinero contado sin ver el saldo del sistema. Cero descuadres al cerrar turno durante 28 días seguidos.'
      },
      {
        type: 'warning',
        icon: 'soup_kitchen',
        title: 'Control de Producción y Cocina',
        desc: 'El módulo de cocina registró un tiempo de entrega promedio de 8 minutos por pedido.'
      },
      {
        type: 'info',
        icon: 'badge',
        title: 'Asistencia y Puntualidad de Personal',
        desc: 'Marcación de entrada y salida con PIN personal, calculando automáticamente las horas trabajadas de tu equipo.'
      }
    ],
    actionPlan: 'Programar la preparación de bases por la mañana para reducir el tiempo de espera en hora punta.'
  }
};

export function initAISimulator() {
  const tabs = document.querySelectorAll('.selector-tab');
  const scoreElem = document.getElementById('ai-score-number');
  const summaryElem = document.getElementById('ai-summary-text');
  const insightsContainer = document.getElementById('ai-insights-list');
  const actionPlanElem = document.getElementById('ai-action-plan-text');

  if (!tabs.length || !scoreElem || !insightsContainer) return;

  function renderPersona(personaKey) {
    const data = SIMULATION_DATA[personaKey] || SIMULATION_DATA.mayorista;

    // Animate score counter
    animateCounter(scoreElem, parseInt(scoreElem.textContent) || 50, data.score, 600);

    // Summary
    if (summaryElem) {
      summaryElem.textContent = data.summary;
    }

    // Insights
    insightsContainer.innerHTML = '';
    data.insights.forEach((insight) => {
      const item = document.createElement('div');
      item.className = 'insight-item';
      item.innerHTML = `
        <div class="insight-icon icon-${insight.type}">
          <span class="material-symbols-rounded">${insight.icon}</span>
        </div>
        <div class="insight-text">
          <h5>${insight.title}</h5>
          <p>${insight.desc}</p>
        </div>
      `;
      insightsContainer.appendChild(item);
    });

    // Action plan
    if (actionPlanElem) {
      actionPlanElem.innerHTML = `<strong>Consejo Prioritario de la Semana:</strong> ${data.actionPlan}`;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-target');
      renderPersona(key);
    });
  });

  // Initial render (starts with Mayorista / Comercial)
  renderPersona('mayorista');
}

function animateCounter(element, start, end, duration) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end;
    }
  }
  window.requestAnimationFrame(step);
}
