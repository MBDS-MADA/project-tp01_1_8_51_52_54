import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  MenuItem,
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import SignInButton from '../sign-in-side/components/SignInButton';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [students, setStudents] = React.useState([]);
  const [student, setStudent] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [success, setSuccess] = React.useState(null);

  React.useEffect(() => {
    async function fetchStudentList() {
      try {
        const response = await fetch(`${BACKEND_URL}/students`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Erreur de communication :', error);
      }
    }

    fetchStudentList();
  }, []);

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student, username, password }),
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
      console.error('Erreur serveur :', err);
      setErrors({ api: "Erreur serveur." });
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2, // optionnel : espace sous le logo
          }}
        >
          <img
            src="/assets/logo-rbg.png"
            alt="Logo de la formation"
            id="formation-logo"
            style={{ maxWidth: '150px', height: 'auto' }} // optionnel : ajuste la taille
          />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
        >
          Inscription
        </Typography>

          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {success && <Typography color="success.main">{success}</Typography>}
            {errors.api && <Typography color="error.main">{errors.api}</Typography>}

            <FormControl>
              <FormLabel>Étudiant</FormLabel>
              <TextField
                select
                fullWidth
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                error={Boolean(errors.student)}
                helperText={errors.student}
              >
                <MenuItem value="">-- Choisir un étudiant --</MenuItem>
                {students.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <TextField
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Mot de passe</FormLabel>
              <TextField
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>            

            <Button type="submit" fullWidth variant="contained">
              S'inscrire
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              S’inscrire avec Google
            </Button> */}
            <Typography sx={{ textAlign: 'center' }}>
              Vous avez déjà un compte ?{' '}
              <Link to="/">
                Connexion
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}