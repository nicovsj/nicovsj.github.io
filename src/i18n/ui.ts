export const languages = {
  en: 'EN',
  fr: 'FR',
};

export const defaultLang = 'en';
export const showDefaultLang = false;

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.publications': 'Publications',
    'nav.cv': 'CV',
    'language.toggle': 'Language',
    'footer.copyright': 'All rights reserved',
    'profile.title': 'PhD Candidate @',
    'profile.contact': 'Contact',
    'profile.address': 'Address',
    'profile.links': 'Links',
    'abstract.title': 'Abstract',
    'email.me': 'E-mail me',
    'email.copy': 'Copy e-mail',
    'email.copied': 'Copied!',
    'email.or': 'or',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.publications': 'Publications',
    'nav.cv': 'CV',
    'language.toggle': 'Langue',
    'footer.copyright': 'Tous droits réservés',
    'profile.title': 'Doctorant @',
    'profile.contact': 'Contact',
    'profile.address': 'Adresse',
    'profile.links': 'Liens',
    'abstract.title': 'Résumé',
    'email.me': "M'écrire",
    'email.copy': 'Copier e-mail',
    'email.copied': 'Copié !',
    'email.or': 'ou',
  },
} as const;

export const routes = {
  fr: {
    publications: 'publications',
    cv: 'cv',
  },
};
