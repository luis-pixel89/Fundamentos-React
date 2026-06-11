import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <span>GestorApp</span>
            <div>
                <Link to="/">Empleados</Link>
                <Link to="/nuevo">Nuevo Empleado</Link>
            </div>
        </nav>
    );
}

export default Navbar;