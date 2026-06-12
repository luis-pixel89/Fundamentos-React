import { useState, useEffect } from 'react';
import './App.css';
import data from './data/videojuegos.js';
import Videojuego from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotificacion from './components/AlertaNotificacion.jsx';

function App() {
    const [videojuegos, setVideojuegos] = useState(() => {

        const datosGuardados = localStorage.getItem("lista_videojuegos");
        return datosGuardados ? JSON.parse(datosGuardados) : data;
    });

    const [alerta, setAlerta]=useState(null);

    useEffect(() => {
        localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
    }, [videojuegos]);

    function agregarVideojuego(videojuegoNuevo) {
        setVideojuegos([...videojuegos, videojuegoNuevo]);
    }

    function eliminarVideojuego(id) {
        const filtrados = videojuegos.filter((v) => v.id !== id);
        setVideojuegos(filtrados);
        setAlerta("Video juego eliminado correctamente");
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
            setAlerta("Video juego editado correctamente");
        } else {
            agregarVideojuego(videojuego);
            setAlerta("Video juego agregado correctamente");
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

            {alerta&&(
                <AlertaNotificacion
                    mensaje={alerta}
                    onOcultar={()=>setAlerta(null)}
                />
            )}
        </BrowserRouter>
    );
}

export default App