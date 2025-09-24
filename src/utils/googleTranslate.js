let scriptLoaded = false;
let translateInitialized = false;

function loadScript() {
  return new Promise((resolve, reject) => {
    if (scriptLoaded) return resolve();
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    window.googleTranslateElementInit = () => resolve();
    s.onerror = reject;
    document.body.appendChild(s);
    scriptLoaded = true;
  });
}

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  const domain = location.hostname.includes('.') ? '; domain=' + location.hostname : '';
  document.cookie = name + '=' + (value || '') + expires + '; path=/' + domain;
}

function setSelectLanguage(lang) {
  const select = document.querySelector('select.goog-te-combo');
  if (select) {
    if (select.value !== lang) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    } else {
      // force reapply
      select.dispatchEvent(new Event('change'));
    }
    return true;
  }
  return false;
}

let loaderCreated = false;
function showLoader(show) {
  let el = document.getElementById('gt-loader');
  if (!el) {
    el = document.createElement('div');
    el.id = 'gt-loader';
    el.style.position = 'fixed';
    el.style.inset = '0';
    el.style.background = 'rgba(0,0,0,0.25)';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.zIndex = '99999';
    el.style.backdropFilter = 'blur(1px)';
    const spinner = document.createElement('div');
    spinner.style.width = '48px';
    spinner.style.height = '48px';
    spinner.style.border = '5px solid #fff';
    spinner.style.borderTopColor = '#d32f2f';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'gt-spin 1s linear infinite';
    el.appendChild(spinner);
    document.body.appendChild(el);
    if (!loaderCreated) {
      const style = document.createElement('style');
      style.textContent = '@keyframes gt-spin{to{transform:rotate(360deg)}}';
      document.head.appendChild(style);
      loaderCreated = true;
    }
  }
  el.style.display = show ? 'flex' : 'none';
}

export async function applyGoogleTranslateLanguage(targetLang) {
  showLoader(true);
  // Set cookie so Google Translate knows the target language
  setCookie('googtrans', `/en/${targetLang}`);
  setCookie('googtrans', `/en/${targetLang}`, 365);

  await loadScript();
  const ensureInitialized = () => {
    return new Promise((resolve) => {
      if (translateInitialized && setSelectLanguage(targetLang)) {
        resolve();
        return;
      }
      const hiddenId = 'google_translate_element';
      let container = document.getElementById(hiddenId);
      if (!container) {
        container = document.createElement('div');
        container.id = hiddenId;
        container.style.display = 'none';
        document.body.appendChild(container);
      }
      if (!translateInitialized && window.google && window.google.translate) {
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,de,fr,it',
          autoDisplay: false,
        }, hiddenId);
        translateInitialized = true;
      }
      // wait until combo exists then set it
      const maxWaitMs = 5000;
      const intervalMs = 100;
      let waited = 0;
      const timer = setInterval(() => {
        if (setSelectLanguage(targetLang) || waited >= maxWaitMs) {
          clearInterval(timer);
          resolve();
        }
        waited += intervalMs;
      }, intervalMs);
    });
  };

  await ensureInitialized();
  // hide loader shortly after change applies
  setTimeout(() => showLoader(false), 1200);
}


