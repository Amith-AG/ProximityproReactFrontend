import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <header>
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <img src="./logo.png" alt="logo" />
          <h1>
            Proximity<span>Pro</span>
          </h1>
        </div>
        <ul className="app__navbar-links">
          {["home", "contact", "services", "about"].map((data) => (
            <li key={`item-${data}`}>
              <Link to={`/${data == "home" ? "" : data}`}>{data}</Link>
            </li>
          ))}
        </ul>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
      </nav>
    </header>
  );
}
