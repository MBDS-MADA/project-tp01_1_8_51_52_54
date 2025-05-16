import React, { useState, useEffect } from 'react';
import { Link, Links, useNavigate } from 'react-router-dom';
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
function Registration () {

  localStorage.removeItem('user');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState('');
  const [error, setError] = useState('');

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  
  async function fetchStudentList() {
    try {
      const response = await fetch(`${BACKEND_URL}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Erreur de communication :', error);
    }
  }

  useEffect(() => {
    fetchStudentList()
  },[]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!student) newErrors.student = "L’étudiant est requis";
    if (!username) newErrors.username = "Le nom d’utilisateur est requis";
    if (!password) newErrors.password = "Le mot de passe est requis";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;   
    try {
        const res = await fetch(`${BACKEND_URL}/register`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ student, username, password })
        });

        const payload = await res.json();          

        if (!res.ok) {
        setErrors({ api: payload.message || "Erreur lors de l’inscription" });
        return;
        }

        localStorage.setItem('user', JSON.stringify(payload));
        setSuccess("Inscription réussie !");
        setErrors({});
        navigate('/app/index');
    } catch (err) {
        console.error('Erreur réseau :', err);
        setErrors({ api: "Erreur serveur." });
    }
    };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e8f5e9, #ffffff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold" sx={{ color: 'green' }}>
          Inscription
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleRegister}>
            {success && <p className="noteform-success">{success}</p>}
            {errors.api && <p className="noteform-error">{errors.api}</p>}
            <Stack spacing={2}>
            <div className="noteform-field">
            <label>Étudiant :</label>
            <select
                className="noteform-input"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
            >
                <option value="">-- Choisir --</option>
                {students.map((s) => (
                <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                </option>
                ))}
            </select>
            {errors.student_id && <p className="noteform-error">{errors.student_id}</p>}
            </div>
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
              S'inscrire
            </Button>
            <Link to="/">Vous avez déjà un compte?</Link>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Registration;
