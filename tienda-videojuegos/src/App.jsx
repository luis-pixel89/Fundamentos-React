import { useState } from 'react';
import './App.css';
import data from './data/videojuegos.js';
import Videojuego from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoEncontrada from './components/PaginaNoEncontrada';

function App() {
    const [videojuegos, setVideojuegos] = useState(data);

    function agregarVideojuego(videojuegoNuevo) {
        setVideojuegos([...videojuegos, videojuegoNuevo]);
    }

    function eliminarVideojuego(id) {
        const filtrados = videojuegos.filter((v) => v.id !== id);
        setVideojuegos(filtrados);
    }

    function editarVideojuego(videojuegoActualizado) {
        const actualizados = videojuegos.map((v) => {
            if (v.id === videojuegoActualizado.id) {
                return videojuegoActualizado;
            }
            return v;
        });
        setVideojuegos(actualizados);
    }

    function manejarGuardar(videojuego) {
        const existe = videojuegos.find((v) => v.id === videojuego.id);

        if (existe) {
            editarVideojuego(videojuego);
        } else {
            agregarVideojuego(videojuego);
        }
    }

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Videojuego videojuego={videojuegos} onEliminar={eliminarVideojuego} />}
                />

                <Route
                    path="/nuevo"
                    element={<FormularioVideojuego onGuardar={manejarGuardar} />}
                />

                <Route
                    path="/editar"
                    element={<FormularioVideojuego onGuardar={manejarGuardar} />}
                />

                <Route
                    path="*"
                    element={<NoEncontrada />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App