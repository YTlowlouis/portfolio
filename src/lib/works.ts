import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;

/** Tous les éléments publiés, photo et code mêlés, du plus récent au plus ancien. */
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** URL de la page de détail. L'id commence par l'année, il ne peut pas
 *  entrer en conflit avec /a-propos ou /m/. */
export function workHref(work: Work): string {
  return `/${work.id}`;
}
