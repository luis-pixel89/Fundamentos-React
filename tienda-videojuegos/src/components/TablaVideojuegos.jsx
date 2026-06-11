import './TablaVideojuegos.css';

function Videojuego({ videojuego }) {
  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Genero</th>
            <th>Plataforma</th>
            <th>Lanzamiento</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Progreso</th>
          </tr>
        </thead>
        <tbody>
          {videojuego.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.titulo}</td>
              <td>{item.genero}</td>
              <td>{item.plataforma}</td>
              <td>{item.lanzamiento}</td>
              <td>${item.precio}</td>
              <td>
                <span className={`badge ${item.disponible ? 'badge-si' : 'badge-no'}`}>
                  {item.disponible ? 'Sí' : 'No'}
                </span>
              </td>
              <td>
                <div className="progreso-wrapper">
                  <progress value={item.progreso} max={1} />
                  <span className="progreso-label">
                    {(item.progreso * 100).toFixed(0)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Videojuego;