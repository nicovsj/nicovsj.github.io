export type Author = {
  name: string;
  isSelf?: boolean;
};

export type PublicationLink = {
  url: string;
  labelKey: 'publications.rematchRepo';
};

export type Publication = {
  title: string;
  url: string;
  authors: Author[];
  venue: string;
  links?: PublicationLink[];
};

export type PublicationCategory = 'conference' | 'demo';

export const publications: Record<PublicationCategory, Publication[]> = {
  conference: [
    {
      title: 'REmatch: A Novel Regex Engine for Finding All Matches',
      url: 'https://doi.org/10.14778/3611479.3611488',
      authors: [
        { name: 'Cristian Riveros' },
        { name: 'Nicolás Van Sint Jan', isSelf: true },
        { name: 'Domagoj Vrgoč' },
      ],
      venue: "Proceedings of the VLDB Endowment (VLDB'23), pages 2792-2804",
      links: [
        {
          url: 'https://github.com/REmatchChile/REmatch',
          labelKey: 'publications.rematchRepo',
        },
      ],
    },
  ],
  demo: [
    {
      title:
        'Demostrating REmatch: A Novel Regex Engine for Finding All Matches',
      url: 'https://doi.org/10.1145/3626246.3654746',
      authors: [
        { name: 'Kyle Bossoney' },
        { name: 'Vicente Calisto' },
        { name: 'Cristian Riveros' },
        { name: 'Gustavo Toro' },
        { name: 'Nicolás Van Sint Jan', isSelf: true },
        { name: 'Domagoj Vrgoč' },
      ],
      venue:
        "Companion of the 2024 International Conference on Management of Data (SIGMOD'24), pages 448-451",
    },
  ],
};
