import React, { useEffect, useState } from 'react';
import api from '../hooks/useApi';

const Talleres = () => {
	const [talleres, setTalleres] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTalleres = async () => {
			try {
				const response = await api.get('/talleres'); // ajustá si es necesario
				setTalleres(response.data.data); // 🟢 Accede a la propiedad "data" del objeto
			} catch (err) {
				console.error(err);
				setError('Error al cargar los talleres');
			} finally {
				setLoading(false);
			}
		};

		fetchTalleres();
	}, []);

	if (loading) return <p className="text-gray-500">Cargando talleres...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div>
			<h1 className="text-2xl font-bold text-amber-700 mb-6">Talleres Disponibles</h1>
			<ul className="space-y-4">
				{talleres.map((taller) => (
					<li
						key={taller.id}
						className="p-5 bg-white rounded-lg shadow border border-gray-200"
					>
						<h2 className="text-xl font-semibold text-gray-800 mb-1">
							{taller.titulo}
						</h2>
						<p className="text-sm text-gray-600 mb-2">{taller.descripcion}</p>
						<div className="text-sm text-gray-500">
							<p><strong>Fecha:</strong> {new Date(taller.fechaHora).toLocaleString('es-AR')}</p>
							<p><strong>Lugar:</strong> {taller.lugar}</p>
							<p><strong>Instructor:</strong> {taller.instructor.nombre} {taller.instructor.apellido}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Talleres;

