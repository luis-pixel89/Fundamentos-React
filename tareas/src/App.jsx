import { useState } from 'react'
import './App.css'

function Tarea({ texto }) {
  const [completada, setCompletada] = useState(false)

  return (
    <div style={{
      border: '1px solid gray',
      padding: '10px',
      margin: '5px',
      textDecoration: completada ? 'line-through' : 'none',
      opacity: completada ? 0.5 : 1,
      cursor: 'pointer',
    }}
      onClick={() => setCompletada(!completada)}
    >
      <p>{texto}</p>
    </div>
  )
}



function App() {
  const [tareas, setTareas] = useState(['Comprar leche', 'Hacer ejercicio']);
  const [nuevaTarea, setNuevaTarea] = useState('');

  function agregarTarea() {
    if (nuevaTarea.trim() === '') {
      return;
    } else {
      setTareas([...tareas, nuevaTarea]);
      setNuevaTarea('');
    }
  }

  return (
    <div>
      <h1>Mi lista de tareas</h1>

      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ flex: '1', padding: '8px' }}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      {tareas.map((tarea, indice) => {
        return <Tarea key={indice} texto={tarea} />
      })}

    </div>
  )
}

export default App
