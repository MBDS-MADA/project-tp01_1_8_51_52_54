import { NavLink } from 'react-router-dom';
import 'animate.css';

function MenuItem({ text, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `nav-item animate__animated animate__fadeInDown ${isActive ? 'active' : ''}`
      }
    >
      {text}
    </NavLink>
  );
}

export default MenuItem;
