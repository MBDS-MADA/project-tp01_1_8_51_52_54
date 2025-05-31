import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/forgetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.status === 200) {
        alert("Un lien de réinitialisation a été envoyé à votre adresse email.");
        handleClose();
      } else {
        const data = await response.json();
        console.log("🚀 ~ handleSubmit ~ data:", data);
        alert(data.message || "Une erreur s'est produite. Veuillez réessayer.");
        handleClose();
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
      alert("Erreur de connexion. Veuillez réessayer.");
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Mot de passe oublié </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          Saisissez l'adresse e-mail de votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          placeholder="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
