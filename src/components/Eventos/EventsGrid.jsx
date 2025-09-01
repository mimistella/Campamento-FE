import Evento from "./Evento";
   /*const layout = [
        "col-span-2 row-span-2", // evento 1 → 2x2
        "col-span-2 row-span-1", // evento 2 → 2x1
        "col-span-1 row-span-1", // evento 3 → 1x1
        "col-span-1 row-span-1", // evento 4 → 1x1

        "col-span-1 row-span-2", // evento 5 → 1x2
        "col-span-1 row-span-1", // evento 6 → 1x1
        "col-span-2 row-span-2", // evento 8 → 2x2
        "col-span-1 row-span-1", // evento 7 → 1x1
    ];*/


export default function EventsGrid({ eventos }) {
    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows gap-8">

				{eventos.map((evento, i) => {
                    return(
					<li
						key={evento.id}
						className={`p-5 bg-[#415a77] bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,1)),url(/src/assets/images/ForestSky.jpg)] bg-cover bg-center
                                    hover:scale-105 transition-transform duration-300 text-white 
                                    rounded-b-2xl shadow-blue-900 shadow-xl
                                    lg:col-span-${i % 4 === 0 ? '2' : '1'} lg:row-span-${i % 3 === 0 ? '2' : '1'}`}
					>
						<Evento evento={evento} />
					</li>)
})}
			</ul>
        </>
    );
}