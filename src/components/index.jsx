import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

  
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

function Index() {
  return (
    <div style={{  margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        
      <h1 >
        Bienvenue à <strong style={{ fontSize: '2.5rem', color: '#1069af', marginBottom: '10px' }}>EduBridge</strong>
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#010b14', marginBottom: '30px' }}>
        Votre suivi académique à votre portée!
      </p>

        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 12 }}>
        
            <Grid size={{ xs: 2, sm: 5, md: 12 }}>
                <Item style={{ backgroundColor: '#d0f8ca' }} >
                    <h2 style={{ color: '#000000' }}>📘 Description</h2>
                    <p>
                        Ce projet vise à finaliser l'application de gestion des étudiants, cours et notes, avec des fonctionnalités avancées comme l'authentification, les rôles et le déploiement.
                    </p>

                </Item>
            </Grid>

            <Grid size={{ xs: 2, sm: 5, md: 12 }}>
                <Item style={{ backgroundColor: '#caf7f8' }}>
                    {/* <h2 style={{ color: '#000000', marginTop: '30px' }}>Fonctionnalités</h2> */}
                    <h3 style={{ marginTop: '20px', color: '#000000' }}>🧩 Module 0 – Fonctionnalités de base</h3>
                    <ul>
                    <li>Gestion des entités : cours, étudiants et notes</li>
                    <li>Connexion à une API Node.js pour la synchronisation des données</li>
                    </ul>
                </Item>
            </Grid>

            <Grid  size={{ xs: 2, sm: 4, md: 12 }}>
                <Item style={{ backgroundColor: '#d0f8ca' }}>
                <h3 style={{ marginTop: '20px', color: '#000000' }}>🔐 Module 1 – Authentification</h3>
                <ul>
                    <li>Authentification via OAUTH2</li>
                    <li>Gestion de rôles :
                        <strong>ADMIN</strong> : accès total (comptes, données)
                        <strong>SCOLARITE</strong> : gestion des étudiants, cours et notes
                        <strong>STUDENT</strong> : visualisation de ses propres données
                    </li>
                </ul>

                </Item>
            </Grid>
            <Grid  size={{ xs: 2, sm: 5, md: 12 }}>
                <Item style={{ backgroundColor: '#caf7f8' }}>
                <h3 style={{ marginTop: '20px', color: '#000000' }}>📊 Module 2 – Statistiques améliorées</h3>
                    <ul>
                        <li>Dashboards spécifiques selon le rôle utilisateur</li>
                        <li>Vision globale ou ciblée selon le profil</li>
                    </ul>


                </Item>
            </Grid>
            <Grid size={{ xs: 2, sm: 5, md: 12 }}>
                <Item style={{ backgroundColor: '#d0f8ca' }}>
                <h3 style={{ marginTop: '20px', color: '#000000' }}>📦 Module 3 – Containerisation & déploiement</h3>
                <ul>
                    <li>Utilisation de Docker pour conteneuriser les apps React et Node.js</li>
                    <li>Déploiement dans le cloud (AWS, Hostinger, etc.)</li>
                </ul>
                </Item>
            </Grid>
            <Grid size={{ xs: 2, sm: 5, md: 12 }}>
                <Item style={{ backgroundColor: '#caf7f8' }}>
                <h3 style={{ marginTop: '20px', color: '#000000' }}>⭐ Bonus</h3>
                <ul>
                    <li>Thèmes Material UI (mode clair/sombre)</li>
                    <li>Télécharger les données en csv</li>
                    <li>Envoi d’e-mails automatiques</li>
                    <li>Authentification SSO (Google, LinkedIn, GitHub, …)</li>
                </ul>
                </Item>
            </Grid>
            
        </Grid>
        </Box>


    </div>

    
  );
}

export default Index;