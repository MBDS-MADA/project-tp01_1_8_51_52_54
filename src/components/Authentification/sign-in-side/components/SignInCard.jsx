import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import Alert from '@mui/material/Alert';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';

//code Finaritra integration 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignInButton from './SignInButton';
//


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
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

export default function SignInCard() {

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };


//code Finaritra integration
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

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
//

  return (

    <Card variant="outlined">

      {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

    <form onSubmit={handleLogin}>
      
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        {/* <SitemarkIcon /> */}
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        S'identifier
      </Typography>
      <Box
        component="div"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Nom d'utilisateur </FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            // type="email"
            // name="email"
            placeholder="jessica.miller"
            // autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            // color={emailError ? 'error' : 'primary'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
         </FormControl> 
        <FormControl> 
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              mot de passe oublié ?
            </Link>
           </Box>
          <TextField
             error={passwordError}
             helperText={passwordErrorMessage}
             name="password"
            placeholder="••••••"
             type="password"
             id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            // color={passwordError ? 'error' : 'primary'}
            value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth 
        variant="contained" 
        onClick={handleLogin}
        >
           Se connecter
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Etes vous étudiant?{' '}
          <span>
            {/* <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link> */}
            <Link to="/register"> S'inscrire.</Link>
          </span>
        </Typography>
     </Box>

  </form>
      <Divider>ou</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}> 
        <SignInButton/>
      </Box>

    </Card>
  );
}
