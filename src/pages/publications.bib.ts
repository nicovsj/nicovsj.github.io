import type { APIRoute } from 'astro';
import { publicationsToBibtex } from '../utils/bibtex';

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(publicationsToBibtex(), {
    headers: {
      'Content-Type': 'application/x-bibtex; charset=utf-8',
    },
  });
};
