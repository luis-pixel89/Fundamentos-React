import './Empleados.css';

function Empleados({ empleados, onEliminar, onEditar }) {
    return (
        <div className="emp-wrapper">
            <div className="emp-header">
                <h2>
                    Empleados
                    <span className="emp-count">{empleados.length} registros</span>
                </h2>
                <p>Gestión de personal activo e inactivo</p>
            </div>

            <div className="emp-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Departamento</th>
                            <th>Turno</th>
                            <th>Ingreso</th>
                            <th>Salario</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.nombre}</td>
                                <td>{emp.edad}</td>
                                <td>{emp.departamento}</td>
                                <td>{emp.turno}</td>
                                <td>{emp.ingreso}</td>
                                <td>{emp.salario}</td>
                                <td>
                                    <span className={`badge ${emp.activo ? 'activo' : 'inactivo'}`}>
                                        {emp.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => onEditar(emp)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-del"
                                        onClick={() => onEliminar(emp.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Empleados;