import { useState, useEffect } from 'react';
import TarjetaNoticia from './TarjetaNoticia';

function TarjetaSkeleton() {
  return (
    <article className="card card--skeleton" aria-hidden="true">
      <div className="card-media skeleton-block" />
      <div className="card-content">
        <div className="skeleton-line skeleton-line--short" />
        <div className="skeleton-line skeleton-line--title" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-line--medium" />
      </div>
    </article>
  );
}

function ListaNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) throw new Error('No se pudieron cargar las noticias');
        return response.json();
      })
      .then(data => setNoticias(data.slice(0, 12)))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (error) {
    return <p className="estado error">{error}</p>;
  }

  return (
    <section className="contenedor" aria-label="Listado de noticias">
      <header className="seccion-header">
        <h1 className="seccion-titulo">Últimas noticias</h1>
        <p className="seccion-subtitulo">Lo más relevante del día, seleccionado para ti.</p>
      </header>

      <div className="grid-noticias">
        {cargando
          ? Array.from({ length: 6 }).map((_, i) => <TarjetaSkeleton key={i} />)
          : noticias.map(noticia => (
              <TarjetaNoticia key={noticia.id} info={noticia} />
            ))}
      </div>
    </section>
  );
}

export default ListaNoticias;
