import MenuItem from "./MenuItem";
import { Link } from 'react-router-dom';

function MenuOpt() {
    const user = JSON.parse(localStorage.getItem("user"));
    const menu_liste = [
        { text: "Notes", path: "/app/notes", roles: ["SCOLARITE","STUDENT"] },
        { text: "Créer Note", path: "/app/notes/add", roles: ["SCOLARITE"] },
        { text: "Etudiants", path: "/app/etudiants", roles: ["SCOLARITE"] },
        { text: "Matières", path: "/app/matieres", roles: ["SCOLARITE"] },
        { text: "Statistique", path: "/app/console", roles: ["SCOLARITE"] },
        { text: "A propos", path: "/app/apropos", roles: ["SCOLARITE","STUDENT"] },
        { text: "Deconnexion", path: "/", roles: ["SCOLARITE","STUDENT"] }
      ]
   

    return (
        <menu className='nav-menu'>
          <Link to="/app/index">
        <img 
            src="/src/assets/logo-rbg.png"
            alt="Logo de la formation" 
            id="formation-logo"
          />
          </Link>
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
        </menu>
    )
}
export default MenuOpt