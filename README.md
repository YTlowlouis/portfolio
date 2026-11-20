# Portfolio

Site statique Astro. Projets de code et séries photo partagent une seule
collection (`works`) et un seul bloc de métadonnées à six champs.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # vérification des types puis build dans dist/
```

## Ajouter un élément

Un dossier par élément dans `src/content/works/`, nommé `AAAA-slug`
(année, puis titre en minuscules sans accents, mots séparés par des tirets) :

```
src/content/works/2024-lisbonne/
  index.md       le texte et le frontmatter
  cover.jpg      image de carte et d'en-tête
  01.jpg 02.jpg  galerie d'une série photo, dans l'ordre d'affichage
  capture-01.jpg captures d'un projet de code
```

Le frontmatter suit le schéma de `src/content.config.ts`. Le champ `kind`
(`photo` ou `code`) fixe les quatre champs propres au type. Les deux autres
champs du bloc, le lieu et l'année, sont communs. Un champ manquant fait échouer
le build.

| Bloc     | 1       | 2         | 3       | 4           | 5    | 6     |
| -------- | ------- | --------- | ------- | ----------- | ---- | ----- |
| `photo`  | focale  | ouverture | vitesse | ISO         | lieu | année |
| `code`   | langage | équipe    | durée   | lignes      | lieu | année |
