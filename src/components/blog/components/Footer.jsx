import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import SitemarkIcon from './SitemarkIcon';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://mui.com/">
        Sitemark
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

//////////////////////////////////////////////
function MyFooter() {
  const etudiants = [
    { id: 1, nom: "ANDRIAMAMONJY Fitia Arivony" },
    { id: 8, nom: "ANDRIANTAHIANA Vatosoa Finaritra" },
    { id: 51, nom: "RAVELOMANANTSOA Iaina Erico" },
    { id: 52, nom: "RAVOAHANGILALAO Kaloina Mélodie" },
    { id: 54, nom: "RAZAFIMAHATRATRA Steeve Peraly" },
  ];

  return (
    <Box sx={{
      textAlign: 'center',
      marginTop: '5px',
      fontSize: '14px',
    }}>
      <Typography variant="body2">© {new Date().getFullYear()} - Tous droits réservés</Typography>
      <Typography variant="body2">
        {etudiants.map((etudiant, index) => (
          <React.Fragment key={etudiant.id}>
            <strong>{etudiant.id}</strong> {etudiant.nom}
            {index < etudiants.length - 1 ? ', ' : ''}
          </React.Fragment>
        ))}
      </Typography>
    </Box>
  );
}


//////////////////////////////////////////////

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        {/* ... le reste de votre Footer ... */}
       
         
          {/* Insertion de MyFooter ici avec style adapté */}
          <MyFooter />

    
      </Container>
    </React.Fragment>
  );
}