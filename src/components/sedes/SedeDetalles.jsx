import { useState, useEffect } from 'react';
import { sedeService } from '@/services/sedeService';

export default function SedeDetalles({ sedeId }) {
    const [sede, setSede] = useState(null);
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSedeDetails = async () => {
            try {
                const sedeData = await sedeService.getSedeById(sedeId);
                setSede(sedeData);
                setAreas(sedeData.areas);
            } catch (error) {
                console.error('Error cargando detalles de sede:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSedeDetails();
    }, [sedeId]);

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{sede.nombre}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Información General</h3>
                    <p>Dirección: {sede.direccion}</p>
                    <p>Descripción: {sede.descripcion}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Áreas</h3>
                    <ul>
                        {areas.map(area => (
                            <li key={area.id} className="mb-2">
                                {area.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}