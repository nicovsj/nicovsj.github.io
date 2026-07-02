import {
  publications,
  type Author,
  type Publication,
  type PublicationCategory,
} from '../data/publications';

function extractYear(venue: string): string {
  const fourDigit = venue.match(/\b(19|20)\d{2}\b/);
  if (fourDigit) {
    return fourDigit[0];
  }

  const twoDigit = venue.match(/[''](\d{2})\b/);
  if (twoDigit) {
    return `20${twoDigit[1]}`;
  }

  return '0000';
}

function bibtexKey(paper: Publication): string {
  const year = extractYear(paper.venue);
  const lastName =
    paper.authors[0]?.name.split(' ').pop()?.toLowerCase() ?? 'anon';
  const titleWord =
    paper.title.match(/\b[A-Za-z]+\b/)?.[0]?.toLowerCase() ?? 'paper';
  return `${lastName}${year}${titleWord}`;
}

function formatAuthors(authors: Author[]): string {
  return authors.map(author => author.name).join(' and ');
}

function paperToBibtex(
  paper: Publication,
  category: PublicationCategory
): string {
  const key = bibtexKey(paper);
  const year = extractYear(paper.venue);
  const entryType = category === 'demo' ? 'inproceedings' : 'article';
  const doi = paper.url.startsWith('https://doi.org/')
    ? paper.url.replace('https://doi.org/', '')
    : undefined;

  const fields = [
    `  title={${paper.title}}`,
    `  author={${formatAuthors(paper.authors)}}`,
    `  year={${year}}`,
    `  url={${paper.url}}`,
  ];

  if (doi) {
    fields.push(`  doi={${doi}}`);
  }

  if (entryType === 'article') {
    fields.push(`  journal={${paper.venue}}`);
  } else {
    fields.push(`  booktitle={${paper.venue}}`);
  }

  return `@${entryType}{${key},\n${fields.join(',\n')}\n}`;
}

export function publicationsToBibtex(): string {
  const categories: PublicationCategory[] = ['conference', 'demo'];
  return categories
    .flatMap(category =>
      publications[category].map(paper => paperToBibtex(paper, category))
    )
    .join('\n\n');
}
