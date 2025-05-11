import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
  Stack
} from '@mui/material';
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const Login = () => {
  localStorage.removeItem('user');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            const userconnected = { ...data };
            localStorage.setItem('user', JSON.stringify(userconnected));
            navigate('/app/index');
        } else {
            setError(data.message || "Erreur lors de la connexion.");
        }
    } catch (error) {
        console.error('Erreur de connexion :', error);
        setError("Erreur serveur.");
    }
};


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e8f5e9, #ffffff)', // 🌿 vert clair
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold" sx={{ color: 'green' }}>
          Connexion
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Nom d'utilisateur"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#2e7d32' } }}
            >
              Se connecter
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
