const translations = {
  de: {
    'nav.home': 'Home',
    'nav.authors': 'Authors',
    'card.label': 'IP Lookup',
    'hero.subtitle': 'Domain eingeben und IP-Adresse herausfinden',
    'btn.search': 'Suchen',
    'result.label': 'IP-Adresse',
    'authors.eyebrow': '🖥️ IP Lookup Projekt',
    'authors.headline': 'Code ohne Grenzen',
    'authors.tagline': 'Gemeinsam Zukunft bauen',
    'author.nima.role': 'Co-founder · Software Engineer',
    'author.sobhan.role': 'Co-founder · Web Developer',
    'author.bio.loading': 'Wird geladen...',
    'location.nima': 'Grieseim, Deutschland',
    'location.sobhan': 'Schöningen, Deutschland',
    'footer.made-by': 'Programmiert von',
    'footer.and': 'und',
    'error.empty': 'URL darf nicht leer sein.',
    'error.rate-limit': 'Bitte {n} Sekunden warten!',
    'error.api': 'API ist nicht erreichbar!',
    'loading.title': 'Lädt...',
    'loading.text': 'Bitte warten...',
  },
  en: {
    'nav.home': 'Home',
    'nav.authors': 'Authors',
    'card.label': 'IP Lookup',
    'hero.subtitle': 'Enter a domain to find its IP address',
    'btn.search': 'Search',
    'result.label': 'IP Address',
    'authors.eyebrow': '🖥️ IP Lookup Project',
    'authors.headline': 'Code Without Borders',
    'authors.tagline': 'Building the future together',
    'author.nima.role': 'Co-founder · Software Engineer',
    'author.sobhan.role': 'Co-founder · Web Developer',
    'author.bio.loading': 'Loading...',
    'location.nima': 'Griesheim, Germany',
    'location.sobhan': 'Schöningen, Germany',
    'footer.made-by': 'Developed by',
    'footer.and': 'and',
    'error.empty': 'URL must not be empty.',
    'error.rate-limit': 'Please wait {n} seconds!',
    'error.api': 'API is not reachable!',
    'loading.title': 'Loading...',
    'loading.text': 'Please wait...',
  }
};

let currentLang = localStorage.getItem('lang') || 'de';

function t(key, vars) {
  let str = (translations[currentLang] || translations.de)[key] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, v);
    });
  }
  return str;
}

function applyLang() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLang();
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
