function TarjetaNoticia({ info }) {
  return (
    <article className="card">
      <h2 className="card-title">{info.title}</h2>
      <p className="card-body">{info.body}</p>
      <button className="card-btn">Leer más →</button>
    </article>
  );
}

export default TarjetaNoticia;