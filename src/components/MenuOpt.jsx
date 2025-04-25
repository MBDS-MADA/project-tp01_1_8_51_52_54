import MenuItem from "./MenuItem";
import { Link } from 'react-router-dom';

function MenuOpt() {
    const user = JSON.parse(localStorage.getItem("user"));
    const menu_liste = [
        { text: "Notes", path: "/app/notes", roles: ["SCOLARITE","STUDENT","ADMIN"] },
        { text: "Créer Note", path: "/app/notes/add", roles: ["SCOLARITE","ADMIN"] },
        { text: "Etudiants", path: "/app/etudiants", roles: ["SCOLARITE","ADMIN"] },
        { text: "Matières", path: "/app/matieres", roles: ["SCOLARITE","ADMIN"] },
        { text: "Statistique", path: "/app/console", roles: ["SCOLARITE","ADMIN","STUDENT"] },
        { text: "A propos", path: "/app/apropos", roles: ["SCOLARITE","STUDENT","ADMIN"] },
        { text: "Deconnexion", path: "/", roles: ["SCOLARITE","STUDENT","ADMIN"] }
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