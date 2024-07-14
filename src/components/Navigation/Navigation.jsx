import { NavLink } from 'react-router-dom';
import clsx from "clsx";
import css from "./Namvigation.module.css";

export default function Navigation() {

     const makeNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  }
    
    return (
        <header>
          <nav className={css.buttons}>
              {/* <NavLink to="/" className={(props) => {console.log(props)}}> */}
              <NavLink to="/" className={makeNavLinkClass}>
                  Home   
              </NavLink>
              <NavLink to="/movies" className={makeNavLinkClass}>
                  Movies   
              </NavLink>
          </nav>
        </header>
    )
}