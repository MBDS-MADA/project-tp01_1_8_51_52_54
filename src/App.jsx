// App.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
import MenuItem from './components/MenuItem'
import Header from './components/Header'
// import Footer from './components/Footer'
import './App.css'
import MenuOpt from './components/MenuOpt';

//Blog import
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './components/blog/shared-theme/AppTheme';
import AppAppBar from './components/blog/components/AppAppBar';
import MainContent from './components/MainContent';
import Latest from './components/blog/components//Latest';
import Footer from './components/blog/components/Footer';
// import Footer from './components/Footer';
import { Margin } from 'react-to-pdf';

function App(props) {
  

  const navigate = useNavigate();

  useEffect(() => {
    //if user connected
    const userconnected = JSON.parse(localStorage.getItem("user"));
    if (!userconnected) {
      navigate("/");
    }
  }, []);

 
  // const [count, setCount] = useState(0)
  // const [selectedMenu,setSelectedMenu]=useState("Console")
  // const tri=()=>{
  //   const index = Math.floor(Math.random() * donnees.length); 
  //   return donnees[index]
  // }
  // const handleMenuClick = (text) => {
  //   setSelectedMenu(text)
  // };
  return (
    <>
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
        <AppAppBar />
        {/* <MenuOpt/> */}
          {/* <Header /> */}
          <div style={{ marginTop: '110px' }}>
          </div>
          <div id='content' style={{ marginBottom: '110px' }}>
            <Outlet />
          </div>
      <Footer />
    </AppTheme>
    </>
  );
}

export default App;
