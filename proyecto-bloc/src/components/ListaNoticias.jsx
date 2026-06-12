import { useState, useEffect } from 'react';
import TarjetaNoticia from './TarjetaNoticia';

function ListaNoticias() {
    const [noticias, setNoticias] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setNoticias(data.slice(0, 12))) // Limitamos a 12 noticias por UX
            .catch(error => console.error('Error fetching:', error));
    }, []);
    return (
        <div className="grid-noticias">
            {noticias.map(noticia => (
                <TarjetaNoticia key={noticia.id} info={noticia} />
            ))}
        </div>
    );
}

export default ListaNoticias;