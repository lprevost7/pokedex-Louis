// Isolated from Angular as required by EmulatorJS's SPA embedding API.
const status = document.getElementById('status');
const reset = document.getElementById('reset');

reset.addEventListener('click', () => window.location.reload());

async function startGame() {
  const romName = 'Pokemon - Version Rouge Feu (F).gba';
  const romUrl = new URL(`../${encodeURIComponent(romName)}`, window.location.href).href;
  status.textContent = 'Chargement de Pokémon Rouge Feu…';
  try {
    const response = await fetch(romUrl, { method: 'HEAD' });
    if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
      throw new Error('ROM unavailable');
    }
  } catch {
    status.textContent = 'ROM introuvable. Vérifie le fichier dans public, puis clique sur Relancer.';
    return;
  }

  window.EJS_player = '#game';
  window.EJS_core = 'gba';
  window.EJS_gameUrl = romUrl;
  window.EJS_gameName = romName.replace(/\.gba$/i, '');
  window.EJS_startOnLoaded = true;
  window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
  window.EJS_language = 'fr-FR';
  window.EJS_color = '#ee8548';
  window.EJS_ready = () => { status.textContent = 'Démarrage… Clique dans la console si nécessaire pour activer le jeu et le son.'; };
  window.EJS_onGameStart = () => { status.textContent = ''; };

  status.textContent = 'Chargement de la console…';
  const loader = document.createElement('script');
  loader.src = `${window.EJS_pathtodata}loader.js`;
  loader.onerror = () => {
    status.textContent = 'Chargement impossible. Vérifie ta connexion puis clique sur Relancer.';
  };
  document.body.appendChild(loader);
}

void startGame();
