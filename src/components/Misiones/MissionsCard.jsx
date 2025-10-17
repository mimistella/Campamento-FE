// MissionCard.jsx
export function MissionCard({ mission }) {
    return (
        <div className="p-4 shadow rounded bg-white">
            <CardTitle title={mission.titulo} />
            <CardDescription description={mission.descripcion} />
            <CardContent recompensa={mission.recompensa} pista={mission.pista} />
        </div>
    );
}

export function CardTitle({ title }) {
    return <h2 className="text-xl font-bold">{title}</h2>;
}

export function CardDescription({ description }) {
    return <p className="text-gray-600 italic">{description}</p>;
}

export function CardContent({ recompensa, pista }) {
    return (
        <div>
            <p className="text-gray-600">Pista: {pista}</p>
            <span className="text-green-600">Recompensa: {recompensa}</span>
        </div>
    );
    
}

export function CardFooter({ children }) {
    return <div className="border-t border-gray-200 pt-4">{children}</div>;
}

export function CardHeader({ children }) {
    return <div className="border-b border-gray-200 pb-4">{children}</div>;
}   