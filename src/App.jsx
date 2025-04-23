// App.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
import MenuItem from './components/MenuItem'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import MenuOpt from './components/MenuOpt';

function App() {
  

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
     <MenuOpt/>
      <Header />
      <div id='content'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
