# AngularMBDSMadagascar2024
# Membre du groupe
28	Ramarolahy	Manoaniony 
52	RAZAFINDRAKOTO	Manolotsoa Daniel

# Installation du projet sur votre machine locale
git clone https://github.com/Manoaniony/AngularMBDSFront.git
cd AngularMBDSFront
executer npm install

executer npm run serve
Le serveur backend est disponible sur http://localhost:4200/

# Fonctionnalités au niveau frontend

## Tâches Manoaniony:

Url: /exercises
Description: Liste des exercices (assignments)

Url: /exercises/add
Description: Creation d'une exercice (assignment)

Url: /exercise/:id/edit
Description: Edition d'une exercice (assignment)

Url: /exercise/:id/notes
Description: Liste des notes associées à un assignment

Url: /exercise/:id/notes/:matricule/edit
Description: Edition d'une note d'une éléve

Url: exercise/:id/note/new
Description: Création d'une note dans une exercice (assignment)


## Tâches: Manolotsoa

Url: /login
Description: Page pour se connecter

Url: /register
Description: Page pour s'inscrire

Url: /subjects
Description: Page list matière

Url: /subject/add
Description: Page ajout matière

Url: /subject/:id/edit
Description: Page edition matière

Url: /subject/:id
Description: Detail matière

# Point difficile de votre projet:
Création des composants formulaire reutilisable
Gestion de cycle de vie des composants

# Les liens qui nous a aidé:
https://docs.angular.lat/guide/inputs-outputs
https://angular.fr/lifecycle/ngchanges