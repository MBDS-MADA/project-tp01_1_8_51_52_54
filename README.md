[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/j-otaqSD)


# Student Management System – CI/CD Fullstack App

## Réalisé par

Ce projet a été développé dans le cadre du MBDS par l'équipe suivante :

- **1** ANDRIAMAMONJY Fitia Arivony  
- **8** ANDRIANTAHIANA Vatosoa Finaritra  
- **51** RAVELOMANANTSOA Iaina Erico  
- **52** RAVOAHANGILALAO Kaloina Mélodie  
- **53** RAZAFIMAHATRATRA Steeve Peraly  

## Liens importants

### Démo vidéo
 [Présentation des fonctionnalités](https://www.youtube.com/watch?v=Ah5Ireh1RRY)

### Accès à l’application
- **Frontend :** [https://cicd-frontend-3rg8.onrender.com](https://cicd-frontend-3rg8.onrender.com)  
- **Backend :** [https://cicd-backend-63hl.onrender.com](https://cicd-backend-63hl.onrender.com)  

### Images Docker
- **Frontend (React) :** [Docker Hub - Frontend](https://hub.docker.com/r/kaloina/project-cicd-frontend)  
- **Backend (Node.js) :** [Docker Hub - Backend](https://hub.docker.com/r/kaloina/project-cicd-backend)

### Dépôts GitHub
- **Frontend + Backend (monorepo) :**  
  [project-cicd](https://github.com/KaloinaMelodie/project-cicd/) – Contient les workflows GitHub Actions CI/CD  
  [Workflows GitHub Actions](https://github.com/KaloinaMelodie/project-cicd/actions)

- **Backend uniquement :**  
  [studentmanagement](https://github.com/KaloinaMelodie/studentmanagement)

- **Repository pour le trigger distant :**  
  [github-trigger](https://github.com/kaloinamelodie/github-trigger)  
  [Lien de déclenchement :](https://github-trigger.onrender.com/trigger)

## Comptes de démonstration

| Rôle       | Nom d'utilisateur | Mot de passe   |
|------------|-------------------|----------------|
| Admin      | `admin`           | `admin`        |
| Scolarité  | `admin`           | `admin`        |
| Étudiant   | `kevin.green`     | `kevin.green`  |

## Fonctionnalités DevOps

Le projet utilise un pipeline **CI/CD complet** :
- Build & Push automatique des images Docker pour le frontend et le backend à chaque mise à jour
- Synchronisation automatique si des commits sont effectués dans les sous-modules
- Déclenchement distant du workflow via **UptimeRobot** toutes les 5 minutes

---


# For the team
Create .env and add VITE_BACKEND_URL="Your_backend_api_url"(example:"http://localhost:8010/api")


## Configuration requise

Ajoutez la variable suivante dans un fichier `.env` à la racine de votre projet :

### Si vous utilisez **Vite** :

```env
VITE_GOOGLE_CLIENT_ID="google_id"
