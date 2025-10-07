const ListaMisionesAsignadas = ({misionesAsig}) =>{

    

    return(

        <div className="inset-0 bg-gray-400 p-4 rounded-lg">
            <h1 className="text-2xl font-bold p-4">Lista Misiones Asignadas</h1>

            <ul>
                {misionesAsig.map(asigna =>(
                    <li className="m-2 p-2 bg-gray-200">
                        {asigna.mision.titulo} - {asigna.campista.nombre} {asigna.campista.apellido} - {asigna.estado}
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default ListaMisionesAsignadas;