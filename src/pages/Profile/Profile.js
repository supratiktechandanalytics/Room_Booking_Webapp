import ProfileDetails from "./ProfileDetails/ProfileDetails";
import MyHotels from "./MyHotels/MyHotels";
import { Route, Switch, Link, NavLink, useRouteMatch } from "react-router-dom";
export default function Profile(props) {
  // bym mógł zaczytać wartości
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <div className="card">
      <h2 className="card-header">Moj profil</h2>

      <div className="card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" exact to={`${url}`}>
              Profil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to={`${url}/hotele`}>
              Moje hotele
            </NavLink>
          </li>
        </ul>
        <div className="pt-4">
          <Switch>
            <Route path={`${path}/hotele`} component={MyHotels} />
            <Route path={`${path}`} component={ProfileDetails} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
