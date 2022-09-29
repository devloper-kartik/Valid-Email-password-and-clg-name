import { useContext } from "react";
import AuthContext from "../../Context/auth-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const ctx = useContext(AuthContext);
  return (
      <nav className={classes.nav}>
        <ul>
          {ctx.isLogIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLogIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLogIn && (
            <li>
              <button onClick={ctx.logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
  );
};

export default Navigation;
