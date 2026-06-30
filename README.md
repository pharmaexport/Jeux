# Jeux — Le dos rond

Site de mini-jeux pour enfants de 7–8 ans, inspiré de l’univers graphique du **Journal officiel du Sablona — Le dos rond**.

## Objectif

Un site simple, coloré et sans collecte de données, avec un jeu par onglet :

- **Mémo des personnages** : jeu de mémoire avec le petit chien, la grenouille, Papi, Mamie, les poules et Tonton.
- **Calcul / orientation de la ferme** : questions simples pour guider le petit chien chez Papi et Mamie.
- **Récolte du potager** : tri des salades, carottes et poireaux.
- **Poulailler du Sablona** : mini-quiz sur les poules, les canards et le panier.
- **Mare aux moustiques** : jeu d’observation avec la grenouille et les libellules.
- **Tournesol botaniste / montagne** : remettre dans l’ordre les étapes de vie d’une plante.
- **Parapente du Sablona** : attraper les lettres du mot SABLONA.
- **Port de By** : guider le petit bateau vers la Gironde.
- **Cherche et trouve** : retrouver les objets du reportage, casque, maïs, chocolat chaud, hache et téléphone de grenouille.
- **Jeu des différences** : comparer deux scènes dans l’humour du Dos rond.

## Stack

- Vite
- React
- CSS maison, style dessin/coloriage
- Données locales uniquement, pas de compte enfant, pas de publicité

## Installation locale

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Déploiement Vercel

Le dépôt est prêt pour Vercel :

- Framework : **Vite**
- Commande de build : `npm run build`
- Dossier de sortie : `dist`

Depuis Vercel : **Add New Project → Import Git Repository → pharmaexport/Jeux**.

## Priorités de développement

1. Stabiliser le MVP avec 10 médailles-jeux.
2. Remplacer progressivement les illustrations vectorielles simples par les personnages détourés issus des pages scannées.
3. Ajouter sons courts, animations et mode plein écran tablette.
4. Ajouter une page parentale sans collecte de données personnelles.
