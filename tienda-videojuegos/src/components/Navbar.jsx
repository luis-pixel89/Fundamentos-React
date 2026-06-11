import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <span className="navbar-brand">GestorApp</span>
            <div className="navbar-links">
                <Link to="/">Videojuegos</Link>
                <Link to="/nuevo">Nuevo Videojuego</Link>
            </div>
        </nav>
    );
}

export default Navbar;