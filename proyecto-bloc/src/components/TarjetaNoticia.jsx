const CATEGORIAS = ['Tecnología', 'Política', 'Cultura', 'Deportes', 'Economía', 'Salud'];

function calcularTiempoLectura(texto) {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(palabras / 200));
}

function formatearFecha(id) {
  const fecha = new Date(2026, 2, 14);
  fecha.setDate(fecha.getDate() - id);
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function TarjetaNoticia({ info }) {
  const categoria = CATEGORIAS[info.userId % CATEGORIAS.length];
  const tiempoLectura = calcularTiempoLectura(info.body);

  return (
    <article className="card">
      <a href="#" className="card-media" aria-label={`Ver noticia: ${info.title}`}>
        <img
          src={`https://picsum.photos/seed/noticia-${info.id}/640/360`}
          alt=""
          loading="lazy"
          className="card-image"
        />
        <span className="card-category">{categoria}</span>
      </a>

      <div className="card-content">
        <div className="card-meta">
          <time dateTime={formatearFecha(info.id)}>{formatearFecha(info.id)}</time>
          <span className="card-meta-divider" aria-hidden="true" />
          <span>{tiempoLectura} min de lectura</span>
        </div>

        <h2 className="card-title">
          <a href="#">{info.title}</a>
        </h2>

        <p className="card-body">{info.body}</p>

        <footer className="card-footer">
          <span className="card-author">Redacción · Autor #{info.userId}</span>
          <a href="#" className="card-link">
            Leer artículo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </footer>
      </div>
    </article>
  );
}

export default TarjetaNoticia;
