import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
// import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { Height } from '@mui/icons-material';

//import MenuOpt
import { Link } from 'react-router-dom';
import MenuItem from "../../MenuItem";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? '#6EACDA'
    : alpha(theme.palette.background.default, 0.4),
  // backgroundColor: '#61dafbaa',
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

//code MenuOpt
const user = JSON.parse(localStorage.getItem("user"));
    const menu_liste = [
        { text: "Notes", path: "/app/notes", roles: ["ADMIN","SCOLARITE","STUDENT"] },
       
        { text: "Etudiants", path: "/app/etudiants", roles: ["ADMIN","SCOLARITE"] },
        { text: "Matières", path: "/app/matieres", roles: ["ADMIN","SCOLARITE"] },
        { text: "Statistique", path: "/app/console", roles: ["ADMIN","SCOLARITE","STUDENT"] },
        { text: "A propos", path: "/app/apropos", roles: ["ADMIN","SCOLARITE"] },
        { text: "Deconnexion", path: "/", roles: ["ADMIN","SCOLARITE","STUDENT"] }
      ]
   
   

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            {/* <Sitemark /> */}
            <Link to="/app/index">
            <img
                src="/src/assets/logo-rbg.png"
                alt="Logo de la formation"
                id="formation-logo"
                style={{ width: '150px', height: '40px' }}
              />
            </Link>
            {/* code MenuOpt */}
            <nav style={{ padding: '10px', color: 'white' }}>
                        
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
                        {menu_liste.map(menu => {
                            if (menu.roles && (!user || !menu.roles.includes(user.role))) {
                              return null; 
                            }
              
                            return (
                              <li key={menu.text} className="mr-4">
                                <MenuItem text={menu.text} path={menu.path} />
                              </li>
                            );
                          })}
                        </ul>
              </nav>

          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Link to="/" >
            <Button color="primary" variant="contained" size="small">
              Deconnexion
            </Button>
            </Link>
            <ColorModeIconDropdown />
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
