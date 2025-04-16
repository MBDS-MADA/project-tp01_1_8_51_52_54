import MenuItem from "./MenuItem";
import { Link } from 'react-router-dom';

function MenuOpt() {
    const user = JSON.parse(localStorage.getItem("user"));
    const menu_liste = [
        { text: "Notes", path: "/app/notes", roles: ["admin","user"] },
        { text: "Créer Note", path: "/app/notes/add", roles: ["admin"] },
        { text: "Etudiants", path: "/app/etudiants", roles: ["admin","user"] },
        { text: "Matières", path: "/app/matieres", roles: ["admin","user"] },
        { text: "Statistique", path: "/app/console", roles: ["admin","user"] },
        { text: "A propos", path: "/app/apropos", roles: ["admin","user"] },
        { text: "Deconnexion", path: "/", roles: ["admin","user"] }
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