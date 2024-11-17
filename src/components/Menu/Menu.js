import style from "./Menu.module.css";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";

function Menu() {
  const [auth, setAuth] = useAuth();

  const logout = e => {
    e.preventDefault();
    setAuth(false);
  };

  return (
    <div className={`${style.menuContainer} breadcrumb`}>
      <ul className={style.menu}>
        <li className={style.menuItem}>
          <NavLink exact to="/" activeClassName={style.menuItemActive}>
            Home
          </NavLink>
        </li>
        {auth ? (
          <>
            <li className={style.menuItem}>
              <NavLink to="/profil" activeClassName={style.menuItemActive}>
                Mój profil
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <a href="#" onClick={logout}>
                Wyloguj
              </a>
            </li>
          </>
        ) : (
          <>
            <li className={style.menuItem}>
              <NavLink to="/zaloguj" activeClassName={style.menuItemActive}>
                Zaloguj
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink to="/rejestracja" activeClassName={style.menuItemActive}>
                Rejestaracja
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Menu;
