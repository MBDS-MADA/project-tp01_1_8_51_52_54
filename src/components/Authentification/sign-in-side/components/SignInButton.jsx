import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const SignInButton = () => {
  localStorage.removeItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token: response.credential }),
    });


    const data = await res.json();
    console.log("Logged in:", data);

    if (res.ok) {
            const userconnected = { ...data };
            localStorage.setItem('user', JSON.stringify(userconnected));
            navigate('/app/index');
        } 
    
        if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status}`);
    }

  } catch (error) {
    console.error("Erreur lors de l'authentification Google :", error);
  }
};

  return <div id="google-signin-button"></div>;
};

export default SignInButton;