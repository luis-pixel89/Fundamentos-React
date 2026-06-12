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
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [calificacion, setCalificacion] = useState("");

    const [errores, setErrores] = useState({});

    const hoy = new Date().toISOString().split("T")[0];   //YYYY-MM-DD

    function validarFormulario() {
        const erroresActivos = {};

        if (titulo.trim() == "") {
            erroresActivos.titulo="EL nombre del video juego no pude estar vacio o contener solo espacios";
        }

        const cal = parseInt(calificacion);
        if (isNaN(cal) || cal < 1 || cal > 100) {
            erroresActivos.calificacion="La calificacion debe estar entre 1 y 100.";
        }

        if (sinopsis.trim().length < 10) {
            erroresActivos.sinopsis="La sinopsis debe contener minimo 10 caracteres.";
        }

        return erroresActivos;
    }

    useEffect(() => {
        if (videojuegoRecuperado) {
            setTitulo(videojuegoRecuperado.titulo);
            setGenero(videojuegoRecuperado.genero);
            setPlataforma(videojuegoRecuperado.plataforma);
            setLanzamiento(videojuegoRecuperado.lanzamiento);
            setPrecio(videojuegoRecuperado.precio);
            setDisponible(videojuegoRecuperado.disponible);
            setProgreso(videojuegoRecuperado.progreso ?? true);
            setFechaLanzamiento(videojuegoRecuperado.fechaLanzamiento || "");
            setSinopsis(videojuegoRecuperado.sinopsis || "");
            setCalificacion(videojuegoRecuperado.calificacion || "");
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(false);
            setProgreso(0);
            setFechaLanzamiento("");
            setSinopsis("");
            setCalificacion("");
        }
    }, [videojuegoRecuperado]);

    function manejarGuardar(e) {
        e.preventDefault();

        if (fechaLanzamiento > hoy) {
            alert("La fecha de lanzamiento no puede ser futura.")
            return;
        }

        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }

        setErrores({});

        const videojuego = {
            id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
            titulo,
            genero,
            plataforma,
            lanzamiento: parseInt(lanzamiento),
            precio: parseFloat(precio),
            disponible,
            progreso: parseFloat(progreso),
            fechaLanzamiento,
            sinopsis,
            calificacion: parseInt(calificacion),
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
                        placeholder="Ej: Elden Ring"  />
                    {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
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

                <div className="campo">
                    <label>Fecha de lanzamiento</label>
                    <input
                        type="date"
                        value={fechaLanzamiento}
                        onChange={(e) => setFechaLanzamiento(e.target.value)}
                        max={hoy}
                        required
                    />
                </div>

                <div className="campo campo-textarea">
                    <label>Sinopsis</label>
                    <textarea
                        value={sinopsis}
                        onChange={(e) => setSinopsis(e.target.value)}
                        placeholder="Escribe una breve reseña (10 a 250 caracteres)"

                    />
                    <span className="contador">{sinopsis.length}/250</span>
                    {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
                </div>

                <div className="campo">
                    <label>Calificacion (1-100)</label>
                    <input
                        type="number"
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        placeholder="Ej: 87"
                        step={1}
                    />
                    {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
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