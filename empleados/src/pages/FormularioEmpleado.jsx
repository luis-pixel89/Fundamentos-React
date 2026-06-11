import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioEmpleado.css";

function FormularioEmpleado({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();

    const empleadoRecuperado = location.state?.empleado || null;

    const [nombre, setNombre] = useState("");
    const [salario, setSalario] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [turno, setTurno] = useState("");
    const [edad, setEdad] = useState("");
    const [activo, setActivo] = useState(true);

    useEffect(() => {
        if (empleadoRecuperado) {
            setNombre(empleadoRecuperado.nombre);
            setEdad(empleadoRecuperado.edad);
            setDepartamento(empleadoRecuperado.departamento);
            setTurno(empleadoRecuperado.turno);
            setActivo(empleadoRecuperado.activo ?? true);
            setFechaIngreso(empleadoRecuperado.fechaIngreso);
            setSalario(empleadoRecuperado.salario);
        } else {
            setNombre("");
            setEdad("");
            setDepartamento("");
            setTurno("");
            setActivo(true);
            setFechaIngreso("");
            setSalario("");
        }
    }, [empleadoRecuperado]);

    function manejarGuardar(e) {
        e.preventDefault();

        const empleado = {
            id: empleadoRecuperado ? empleadoRecuperado.id : Date.now(),
            nombre,
            edad: Number(edad),
            turno,
            activo,
            departamento,
            fechaIngreso,
            salario: Number(salario)
        };

        onGuardar(empleado);
        navigate("/");
    }

    function manejarCancelar() {
        navigate("/");
    }

    return (
        <form className="formulario-empleado" onSubmit={manejarGuardar}>
            <h2>
                {empleadoRecuperado
                    ? "Editar Empleado"
                    : "Nuevo Empleado"}
            </h2>

            <div className="campo">
                <label>Nombre completo</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre completo"
                    required
                />
            </div>

            <div className="campo">
                <label>Edad</label>
                <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ingrese la edad"
                    required
                />
            </div>

            <div className="campo">
                <label>Salario mensual</label>
                <input
                    type="number"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    placeholder="Ingrese el salario"
                    required
                />
            </div>

            <div className="campo">
                <label>Fecha de ingreso</label>
                <input
                    type="date"
                    value={fechaIngreso}
                    onChange={(e) => setFechaIngreso(e.target.value)}
                    required
                />
            </div>

            <div className="campo">
                <label>Departamento</label>
                <select
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    required
                >
                    <option value="">
                        Seleccione un departamento
                    </option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Recursos Humanos">
                        Recursos Humanos
                    </option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operaciones">Operaciones</option>
                    <option value="Gerencia">Gerencia</option>
                </select>
            </div>

            <div className="campo">
                <label>Turno</label>

                <div className="grupo-radios">
                    <label>
                        <input
                            type="radio"
                            name="turno"
                            value="Mañana"
                            checked={turno === "Mañana"}
                            onChange={(e) =>
                                setTurno(e.target.value)
                            }
                        />
                        Mañana
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="turno"
                            value="Tarde"
                            checked={turno === "Tarde"}
                            onChange={(e) =>
                                setTurno(e.target.value)
                            }
                        />
                        Tarde
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="turno"
                            value="Noche"
                            checked={turno === "Noche"}
                            onChange={(e) =>
                                setTurno(e.target.value)
                            }
                        />
                        Noche
                    </label>
                </div>
            </div>

            <div className="campo checkbox-container">
                <label>
                    <input
                        type="checkbox"
                        checked={activo}
                        onChange={(e) =>
                            setActivo(e.target.checked)
                        }
                    />
                    Empleado activo
                </label>
            </div>

            <div className="botones">
                <button type="submit" className="btn-guardar">
                    Guardar
                </button>

                <button
                    type="button"
                    className="btn-cancelar"
                    onClick={manejarCancelar}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default FormularioEmpleado;