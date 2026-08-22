// JARVIS HUB SECRET AI ENTRANCE
// Add this script to the existing index.html with:
// <script src="secret-entrance.js"></script>

(() => {
  const logo = document.querySelector('.brand, .logo, header a[href="index.html"]');
  if (!logo) return;

  let clicks = 0;
  let resetTimer;

  const overlay = document.createElement('div');
  overlay.id = 'jarvis-access';
  overlay.innerHTML = `
    <div class="access-box">
      <div class="access-label">PRIVATE SYSTEM</div>
      <div class="access-title">AUTHENTICATING</div>
      <div class="access-line"><span></span></div>
      <div class="access-status">VERIFYING USER...</div>
    </div>`;
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    #jarvis-access{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;
      background:#050607;opacity:0;pointer-events:none;transition:opacity .25s;font-family:Inter,system-ui,sans-serif}
    #jarvis-access.show{opacity:1;pointer-events:all}
    #jarvis-access:before{content:"";position:absolute;inset:0;opacity:.04;
      background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:44px 44px}
    .access-box{position:relative;width:min(440px,86vw);border:1px solid #2b3236;background:#0c1012;padding:34px;box-shadow:0 0 60px #ff7a1812}
    .access-label{font-size:9px;letter-spacing:.2em;color:#ff7a18;margin-bottom:12px}
    .access-title{font:700 32px "Space Grotesk",system-ui,sans-serif;color:#f2f4f5}
    .access-line{height:2px;background:#22292d;margin:22px 0;overflow:hidden}
    .access-line span{display:block;width:0;height:100%;background:#ff7a18;box-shadow:0 0 12px #ff7a18;transition:width 1.1s}
    .access-status{font-size:9px;letter-spacing:.14em;color:#899196}
  `;
  document.head.appendChild(style);

  function activate() {
    overlay.classList.add('show');
    requestAnimationFrame(() => {
      overlay.querySelector('.access-line span').style.width = '100%';
    });

    setTimeout(() => {
      overlay.querySelector('.access-title').textContent = 'ACCESS GRANTED';
      overlay.querySelector('.access-status').textContent = 'WELCOME BACK, JARVIS';
    }, 1050);

    setTimeout(() => {
      window.location.href = 'ai.html';
    }, 1700);
  }

  logo.addEventListener('click', (event) => {
    clicks++;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { clicks = 0; }, 2000);

    if (clicks >= 3) {
      clicks = 0;
      activate();
    }
  });
})();