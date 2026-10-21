/**
 * CentralApp - ROI & Savings Interactive Calculator
 * Computes waste reduction, hours saved on audits, and monthly cash recovery.
 */

export function initROICalculator() {
  const salesSlider = document.getElementById('calc-sales-slider');
  const recipesSlider = document.getElementById('calc-recipes-slider');

  const salesDisplay = document.getElementById('calc-sales-display');
  const recipesDisplay = document.getElementById('calc-recipes-display');

  const moneySavedElem = document.getElementById('calc-money-saved');
  const hoursSavedElem = document.getElementById('calc-hours-saved');
  const marginBoostElem = document.getElementById('calc-margin-boost');

  if (!salesSlider || !recipesSlider) return;

  function calculate() {
    const monthlySales = parseFloat(salesSlider.value) || 25000;
    const activeRecipes = parseInt(recipesSlider.value) || 30;

    // Format inputs display
    if (salesDisplay) {
      salesDisplay.textContent = `S/ ${monthlySales.toLocaleString('es-PE')}`;
    }
    if (recipesDisplay) {
      recipesDisplay.textContent = `${activeRecipes} recetas`;
    }

    // Benchmark formulas derived from CentralApp gastronomy metrics:
    // 1. Average gastro food waste/merma is ~6-8% of sales.
    // CentralApp reduces hidden recipe loss and over-portioning by ~3.5% of total sales.
    const wasteReduction = monthlySales * 0.038;

    // 2. Cashier audit & recipe inventory math:
    // ~1.5 hours saved daily in cash counts, blind audit reconciliations, and supplier re-checks.
    const hoursSaved = Math.round(28 * 1.5 + (activeRecipes * 0.4));

    // 3. Margin percentage boost (typically +4.2% to +7.8%)
    const marginBoost = (3.8 + (activeRecipes / 45)).toFixed(1);

    if (moneySavedElem) {
      moneySavedElem.textContent = `S/ ${Math.round(wasteReduction).toLocaleString('es-PE')}`;
    }
    if (hoursSavedElem) {
      hoursSavedElem.textContent = `${hoursSaved} hrs`;
    }
    if (marginBoostElem) {
      marginBoostElem.textContent = `+${marginBoost}%`;
    }
  }

  salesSlider.addEventListener('input', calculate);
  recipesSlider.addEventListener('input', calculate);

  // Initial calculation
  calculate();
}
