import { useState } from 'react'
import './App.css'

function Pelicula({ titulo }) {
  const [esFavorita, setEsFavorita] = useState(false);

  return (
    <div style={{
      border: '1px solid gray',
      padding: '10px',
      margin: '5px',
      cursor: 'pointer',
      backgroundColor: esFavorita ? 'skyblue' : 'white',
    }} onClick={() => {
      setEsFavorita(!esFavorita);
    }}>
      <p>{titulo} {esFavorita ? '⭐' : ''}</p>
    </div>
  )

}

function App() {
  const [peliculas, setPeliculas] = useState(['El Padrino', 'El Padrino II', 'El Padrino III', 'El Padrino IV']);
  const [nuevaPelicula, setNuevaPelicula] = useState('');

  function agregarPelicula() {
    if(nuevaPelicula.trim()===''){
      return;
    }else{
      setPeliculas([...peliculas, nuevaPelicula]);
      setNuevaPelicula('');
    }
  }

  return (
    <div>
      <h1>Peliculas</h1>

      <div>
        <input
          type="text"
          value={nuevaPelicula}
          onChange={(e) => setNuevaPelicula(e.target.value)}
          placeholder="Agregar nueva película"
          style={{ padding: '5px', marginRight: '5px' }}
        />
        <button onClick={agregarPelicula}>Agregar</button>
      </div>

      {peliculas.map((pelicula, indice) => (
        <Pelicula key={indice} titulo={pelicula} />
      ))}
    </div>
  )
}

export default App
