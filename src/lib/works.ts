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

/** Les images qui suivent le texte : la galerie d'une série, les captures
 *  d'un projet. La page de détail n'a pas besoin de savoir laquelle. */
export function figuresOf(work: Work) {
  return work.data.kind === 'photo' ? work.data.gallery : work.data.screenshots;
}

/** Liens externes de l'élément, dans l'ordre d'affichage. */
export function linksOf(work: Work): { label: string; href: string }[] {
  if (work.data.kind !== 'code') return [];
  const { repo, demo } = work.data.links;
  return [
    ...(demo ? [{ label: 'Voir la démo', href: demo }] : []),
    ...(repo ? [{ label: 'Voir le code source', href: repo }] : []),
  ];
}
