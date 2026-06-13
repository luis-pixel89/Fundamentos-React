import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({onSaludar,onNombre}) {
    return (
        <nav className="navbar">
            <span className="navbar-brand">{onNombre}</span>
            <div className="navbar-links">
                <Link to="/">Videojuegos</Link>
                <Link to="/nuevo">Nuevo Videojuego</Link>

                <button onClick={()=>onSaludar(onNombre)}>
                    Saludar
                </button>

            </div>
        </nav>
    );
}

export default Navbar;