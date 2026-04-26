/**
 * Animation d'un albatros "porté par les vagues".
 *
 * - L'albatros traverse l'écran 1 fois toutes les 2 minutes (120000 ms).
 * - Le mouvement vertical imite l'exploitation de l'énergie des vagues
 *   (oscillation douce + micro-variation de vitesse).
 *
 * Utilisation :
 *   1) Inclure ce script dans la page animation-stoic_fr.html
 *   2) Vérifier que <body> existe (script en bas de page recommandé)
 */
(function initWavePoweredAlbatross() {
  const PASS_INTERVAL_MS = 120000; // 2 minutes
  const FLIGHT_DURATION_MS = 14000; // temps de traversée à l'écran

  const style = document.createElement('style');
  style.textContent = `
    .wave-albatross {
      position: fixed;
      left: -220px;
      top: 22vh;
      width: 180px;
      height: auto;
      z-index: 60;
      pointer-events: none;
      opacity: 0;
      filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.28));
      will-change: transform, opacity;
    }

    .wave-albatross.is-flying {
      animation:
        albatross-cross-screen ${FLIGHT_DURATION_MS}ms linear forwards,
        albatross-wing-flap 900ms ease-in-out infinite;
      opacity: 1;
    }

    @keyframes albatross-cross-screen {
      0% {
        transform: translateX(0) translateY(0) rotate(-3deg);
        animation-timing-function: cubic-bezier(0.2, 0.6, 0.3, 1);
      }
      15% {
        transform: translateX(18vw) translateY(-14px) rotate(-1deg);
      }
      35% {
        transform: translateX(40vw) translateY(10px) rotate(2deg);
      }
      55% {
        transform: translateX(62vw) translateY(-18px) rotate(-2deg);
      }
      75% {
        transform: translateX(84vw) translateY(12px) rotate(1deg);
      }
      100% {
        transform: translateX(115vw) translateY(-6px) rotate(0deg);
      }
    }

    @keyframes albatross-wing-flap {
      0%, 100% { filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.28)) brightness(1); }
      50% { filter: drop-shadow(0 7px 10px rgba(0, 0, 0, 0.3)) brightness(1.05); }
    }
  `;
  document.head.appendChild(style);

  const albatross = document.createElement('img');
  albatross.className = 'wave-albatross';
  albatross.alt = 'Albatros en vol';
  // SVG inline pour éviter une dépendance d'asset externe.
  albatross.src =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220">
        <g fill="none" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 125 C120 25, 240 35, 290 115" />
          <path d="M585 125 C480 25, 360 35, 310 115" />
        </g>
        <ellipse cx="300" cy="122" rx="24" ry="12" fill="#ffffff" />
        <circle cx="316" cy="120" r="2.4" fill="#001f3f" />
        <path d="M326 123 L342 128 L326 133 Z" fill="#ffd166" />
      </svg>
    `);

  document.body.appendChild(albatross);

  function flyAcross() {
    albatross.classList.remove('is-flying');
    // force reflow pour relancer l'animation
    void albatross.offsetWidth;

    // Position de départ variable pour suggérer un vent/mer vivants.
    const startTop = 14 + Math.random() * 18;
    albatross.style.top = `${startTop}vh`;

    albatross.classList.add('is-flying');

    window.setTimeout(() => {
      albatross.classList.remove('is-flying');
    }, FLIGHT_DURATION_MS + 100);
  }

  // Premier passage après 2 minutes (strictement "une fois toutes les 2 minutes").
  window.setTimeout(() => {
    flyAcross();
    window.setInterval(flyAcross, PASS_INTERVAL_MS);
  }, PASS_INTERVAL_MS);
})();
