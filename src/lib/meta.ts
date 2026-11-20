/**
 * Traduit une entrée de la collection en six paires label/valeur.
 *
 * C'est le seul endroit du site qui sait qu'une photo et un projet sont
 * différents. Le composant d'affichage ne reçoit que le résultat : un tuple
 * de six `MetaField`, sans aucune trace du type d'origine.
 */
import type { CollectionEntry } from 'astro:content';

export interface MetaField {
  /** Nom du champ, lu par les lecteurs d'écran (« Focale », « Langage »…). */
  label: string;
  /** Valeur affichée, et plus tard clé de facette (« 35 mm », « TypeScript »…). */
  value: string;
}

/** Exactement six champs. Un bloc plus court ne compile pas. */
export type Meta = readonly [MetaField, MetaField, MetaField, MetaField, MetaField, MetaField];

const integer = new Intl.NumberFormat('fr-FR');

export function toMeta(entry: CollectionEntry<'works'>): Meta {
  const { data } = entry;
  const place: MetaField = { label: 'Lieu', value: data.place };
  const year: MetaField = { label: 'Année', value: String(data.date.getFullYear()) };

  switch (data.kind) {
    case 'photo':
      return [
        { label: 'Focale', value: data.meta.focal },
        { label: 'Ouverture', value: data.meta.aperture },
        { label: 'Vitesse', value: data.meta.shutter },
        { label: 'Sensibilité', value: `ISO ${data.meta.iso}` },
        place,
        year,
      ];
    case 'code':
      return [
        { label: 'Langage', value: data.meta.stack },
        { label: 'Équipe', value: data.meta.team },
        { label: 'Durée', value: data.meta.duration },
        { label: 'Taille', value: `${integer.format(data.meta.lines)} lignes` },
        place,
        year,
      ];
  }
}
