/**
 * Une seule collection, `works`, pour les séries photo comme pour les projets
 * de code. Le champ `kind` discrimine ; tout le reste du contrat est commun.
 *
 * La règle des six champs de métadonnées est tenue ainsi :
 *   - 4 champs propres au type (`meta`), toujours obligatoires ;
 *   - 2 champs communs : `place` et l'année tirée de `date`.
 * 4 + 2 = 6, pour les deux types, sans exception. `toMeta()` (src/lib/meta.ts)
 * les assemble en un tuple de longueur 6 vérifié par TypeScript.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  // Un dossier par élément : src/content/works/<AAAA>-<slug>/index.md,
  // avec ses images à côté. L'id de l'entrée est le nom du dossier.
  loader: glob({
    base: './src/content/works',
    pattern: '*/index.md',
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: ({ image }) => {
    const figure = z.object({
      src: image(),
      alt: z.string().min(1, 'Chaque image doit avoir un texte alternatif.'),
    });

    // Champs partagés par tous les éléments.
    const base = z.object({
      title: z.string().min(1),
      date: z.coerce.date(),
      place: z.string().min(1),
      summary: z.string().min(1).max(200),
      cover: figure,
      draft: z.boolean().default(false),
    });

    const photo = base.extend({
      kind: z.literal('photo'),
      meta: z
        .object({
          focal: z.string().regex(/^\d+(–\d+)? mm$/, 'Format attendu : « 35 mm » ou « 24–70 mm ».'),
          aperture: z.string().regex(/^f\/\d+(\.\d+)?$/, 'Format attendu : « f/1.8 ».'),
          shutter: z.string().regex(/^(1\/\d+|\d+(\.\d+)?)( s)?$/, 'Format attendu : « 1/250 » ou « 2 s ».'),
          iso: z.number().int().positive(),
        })
        .strict(),
      gallery: z.array(figure).min(1),
    });

    const code = base.extend({
      kind: z.literal('code'),
      meta: z
        .object({
          stack: z.string().min(1),
          team: z.string().min(1),
          duration: z.string().min(1),
          lines: z.number().int().positive(),
        })
        .strict(),
      screenshots: z.array(figure).default([]),
      links: z
        .object({
          repo: z.url().optional(),
          demo: z.url().optional(),
        })
        .default({}),
    });

    return z.discriminatedUnion('kind', [photo, code]);
  },
});

export const collections = { works };
