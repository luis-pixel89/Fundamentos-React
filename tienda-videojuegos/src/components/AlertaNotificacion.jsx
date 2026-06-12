import { useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onOcultar }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onOcultar();
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="alerta-notificacion">
            <span>✓ {mensaje}</span>
        </div>
    );
}

export default AlertaNotificacion;