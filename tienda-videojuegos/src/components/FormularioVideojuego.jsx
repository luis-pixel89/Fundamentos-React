import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();

    const videojuegoRecuperado = location.state?.videojuego || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(false);
    const [progreso, setProgreso] = useState(0);

    useEffect(() => {
        if (videojuegoRecuperado) {
            setTitulo(videojuegoRecuperado.titulo);
            setGenero(videojuegoRecuperado.genero);
            setPlataforma(videojuegoRecuperado.plataforma);
            setLanzamiento(videojuegoRecuperado.lanzamiento);
            setPrecio(videojuegoRecuperado.precio);
            setDisponible(videojuegoRecuperado.disponible);
            setProgreso(videojuegoRecuperado.progreso ?? true);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible("");
            setProgreso(true);
        }
    }, [videojuegoRecuperado]);

    function manejarGuardar(e) {
        e.preventDefault();

        const videojuego = {
            id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
            titulo,
            genero,
            plataforma,
            lanzamiento: parseInt(lanzamiento),
            precio: parseFloat(precio),
            disponible,
            progreso: parseFloat(progreso),
        };

        onGuardar(videojuego);
        navigate("/");
    }

    function manejarCancelar() {
        navigate("/");
    }

    return (
        <form className="formulario-empleado" onSubmit={manejarGuardar}>
            <h2>{videojuegoRecuperado ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>

            {/* fila 1: 4 campos */}
            <div className="form-grid">
                <div className="campo">
                    <label>Título</label>
                    <input type="text" value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ej: Elden Ring" required />
                </div>
                <div className="campo">
                    <label>Género</label>
                    <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                        <option value="">Seleccione</option>
                        <option value="Aventura">Aventura</option>
                        <option value="RPG">RPG</option>
                        <option value="Acción">Acción</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Metroidvania">Metroidvania</option>
                        <option value="Carreras">Carreras</option>
                        <option value="Roguelike">Roguelike</option>
                        <option value="Simulacion">Simulacion</option>
                        <option value="Survival Horror">Survival Horror</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Sandbox">Sandbox</option>
                    </select>
                </div>
                <div className="campo">
                    <label>Plataforma</label>
                    <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)} required>
                        <option value="">Seleccione</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                    </select>
                </div>
                <div className="campo">
                    <label>Lanzamiento</label>
                    <input type="number" value={lanzamiento}
                        onChange={(e) => setLanzamiento(e.target.value)}
                        placeholder="Ej: 2023" min="1970" max="2030" required />
                </div>
            </div>

            {/* fila 2: 3 campos + checkbox */}
            <div className="form-grid-wide">
                <div className="campo">
                    <label>Precio</label>
                    <input type="number" value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="Ej: 59.99" required />
                </div>
                <div className="campo">
                    <label>Progreso</label>
                    <input type="number" value={progreso}
                        onChange={(e) => setProgreso(e.target.value)}
                        placeholder="Ej: 0.75" min="0" max="1" step="0.01" required />
                </div>
                <div className="campo checkbox-container">
                    <label>
                        <input type="checkbox" checked={disponible}
                            onChange={(e) => setDisponible(e.target.checked)} />
                        Disponible
                    </label>
                </div>
            </div>

            <div className="botones">
                <button type="submit" className="btn-guardar">Guardar</button>
                <button type="button" className="btn-cancelar" onClick={manejarCancelar}>Cancelar</button>                
            </div>
        </form>
    );
}

export default FormularioVideojuego;