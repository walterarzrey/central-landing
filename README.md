# CentralApp — Landing Page de Alta Conversión

Landing page moderna, tecnológica y ultra-rápida desarrollada para comercializar **CentralApp** en internet.

Diseñada siguiendo referencias de diseño tecnológico premium (inspirado en *Sonic Trader* y *StrawberryTV*) y la presentación de planes enfocada en Inteligencia Artificial (inspirado en *Defontana*), integrando los colores y la identidad visual de CentralApp tanto en **Modo Oscuro** como en **Modo Claro**.

---

## 🚀 Características Principales

- **Arquitectura Clean Code**:
  - Separación de responsabilidades: `styles/` (tokens, base, layouts, componentes, animaciones) y `scripts/` (gestor de temas, simulador de IA, pricing, calculadora ROI, modal).
  - Cero dependencias pesadas en tiempo de ejecución: 100% JavaScript moderno (ES Modules) y CSS semántico modular.
  - Empaquetador ultra-rápido: **Vite 6**.
- **SEO y Rendimiento de Primer Nivel**:
  - HTML5 100% semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - Etiquetas Open Graph (Facebook, WhatsApp) y Twitter Cards completas.
  - Datos estructurados **JSON-LD Schema.org** (`SoftwareApplication`, `Organization`, `FAQPage`).
  - `robots.txt` y `sitemap.xml` integrados en `/public`.
  - Carga diferida de scripts, `pre-connect` a fuentes de Google e iconos Material Symbols.
- **Identidad de Marca & Soporte Dual Dark / Light**:
  - Paleta exacta de CentralApp: Dorado ámbar (`#F6C55F`, `#D4982A`), Chocolate tostado (`#1C110B`, `#2A1A10`), y Crema artesanal (`#F7F1E1`).
  - Selector de tema fluido con persistencia en `localStorage` y detección de preferencia del sistema operativo (`prefers-color-scheme`).
- **Secciones Estratégicas de Conversión**:
  1. **Hero Tecnológico**: Titular de alto impacto, badges con glow, métricas de confianza y mockup flotante del POS en vivo con burbuja de IA.
  2. **Central AI Advisor (Showcase Interactivo)**: Simulador en vivo donde el usuario puede seleccionar su tipo de negocio (Pastelería, Dark Kitchen, Cafetería o Franquicia) y ver su **Health Score (1-100)** con alertas de inflación y recomendaciones tácticas en tiempo real.
  3. **Módulos Bento-Grid**: Explicación clara de POS, Recetario & Mermas, Arqueo Ciego, Asistencia y Tienda Web sin comisiones.
  4. **Calculadora Interactiva de ROI**: Sliders en tiempo real para estimar horas de auditoría ahorradas y soles recuperados en mermas.
  5. **Planes & Precios (Estilo Defontana)**: Conmutador Mensual vs. Anual (con 20% de descuento y 2 meses gratis), plan destacado con ribbon luminoso y desglose de funcionalidades.
  6. **Casos de Éxito & Testimonios**: Opiniones reales de negocios gastronómicos.
  7. **FAQ con Acordeón Interactivo**: Respuestas a compatibilidad de hardware, soporte offline, migración desde Excel y permanencia.
  8. **Modal de Captura de Leads**: Integración directa con WhatsApp para agendar demo o iniciar la prueba de 14 días.

---

## 📁 Estructura del Proyecto

```
central-landing/
├── index.html                  # HTML semántico con Schema.org, OpenGraph y accesibilidad
├── package.json                # Scripts y dependencias
├── vite.config.js              # Configuración de compilación Vite
├── README.md                   # Documentación técnica
├── public/
│   ├── favicon.svg             # Ícono vectorial de CentralApp
│   ├── og-image.svg            # Imagen social para previews
│   ├── robots.txt              # Directivas para motores de búsqueda
│   └── sitemap.xml             # Mapa del sitio web
└── src/
    ├── styles/
    │   ├── variables.css       # Tokens de diseño (Modo Oscuro & Modo Claro)
    │   ├── base.css            # Tipografía, resets y scrollbar
    │   ├── layout.css          # Estructura del header, héroe, grid y footer
    │   ├── components.css      # Botones, cards glassmorphism, pricing y calculadora
    │   └── animations.css      # Micro-interacciones y efectos glow
    └── scripts/
        ├── theme.js            # Lógica de cambio de modo claro/oscuro
        ├── ai-simulator.js     # Motor del simulador de IA para gastronomía
        ├── pricing.js          # Switch mensual/anual y cálculo de precios
        ├── roi-calculator.js   # Calculadora interactiva de rentabilidad
        ├── modal.js            # Modal de contacto y generador de enlace WhatsApp
        └── main.js             # Punto de entrada de la aplicación
```

---

## 🛠️ Instalación y Ejecución Local

1. Navegar a la carpeta del proyecto:
   ```bash
   cd "central-landing"
   ```

2. Instalar dependencias de desarrollo:
   ```bash
   npm install
   ```

3. Iniciar el servidor local de desarrollo:
   ```bash
   npm run dev
   ```
   Abrirá la landing page en `http://localhost:5174`.

4. Compilar para producción (archivos optimizados y minificados en `/dist`):
   ```bash
   npm run build
   ```

5. Previsualizar la versión de producción:
   ```bash
   npm run preview
   ```

---

## 🌐 Opciones de Despliegue

La carpeta compilada (`/dist`) es 100% estática y puede desplegarse instantáneamente en:
- **Vercel**: `vercel deploy`
- **Cloudflare Pages**: Conectar repositorio o arrastrar la carpeta `dist`.
- **Netlify**: `netlify deploy`
- **Docker / Nginx**: Copiar `dist/` a `/usr/share/nginx/html`.
