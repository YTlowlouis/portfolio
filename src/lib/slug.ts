/** Transforme une valeur de métadonnée en identifiant de facette :
 *  « Lisbonne » → lisbonne, « f/1.8 » → f-1-8, « 1 200 lignes » → 1-200-lignes.
 *  Sert aux attributs data-facet et, à l'étape 4, aux URL /m/<slug>. */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
