// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  Link,
} from '@mui/material';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = async () => {
    if (password.length < 8) {
      setAlert({ type: 'error', message: 'Le mot de passe doit contenir au moins 8 caractères.' });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Les mots de passe ne correspondent pas.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/resetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setAlert({ type: 'success', message: 'Mot de passe réinitialisé avec succès.' });
        setResetSuccess(true);
      } else {
        setAlert({ type: 'error', message: data.message || 'Erreur serveur.' });
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Erreur réseau.' });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" sx={{ mt: 4 }}>
          Token manquant ou invalide.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Réinitialiser le mot de passe
            </Typography>
            <Typography variant="body2" align="center">
              Entrez votre nouveau mot de passe.
            </Typography>

            {alert && (
              <Alert severity={alert.type}>{alert.message}</Alert>
            )}

            <TextField
              label="Nouveau mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={resetSuccess || loading}
              fullWidth
            />
            <TextField
              label="Confirmer le mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={resetSuccess || loading}
              fullWidth
            />

            <Button
              variant="contained"
              onClick={handleReset}
              disabled={loading || resetSuccess}
              fullWidth
            >
              Réinitialiser
            </Button>

            {resetSuccess && (
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                <Link component={RouterLink} to="/">
                  Retourner à la page de connexion
                </Link>
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ResetPassword;
