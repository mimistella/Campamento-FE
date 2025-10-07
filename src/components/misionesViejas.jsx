//import { useState } from "react"
import api from "../hooks/useApi.js"
import { MissionCard, CardTitle, CardDescription, CardContent, CardHeader, CardFooter } from "./Misiones/MissionsCard.jsx"
import { Shield, Sword, Zap, Skull, MapPin, CalendarDays, Users, Trophy } from "lucide-react"
import { useState, useEffect } from "react";


export default function MissionsSection() {
    const [missionsBack, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await api.get('/misiones');
                setMissions(response.data.data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar las misiones');
            } finally {
                setLoading(false);
            }
        };

        fetchMissions();
    }, []);


    //const [enrollingMissions, setEnrollingMissions] = useState(new Set())

    /*
    const handleEnrollMission = async (missionId) => {
        setEnrollingMissions((prev) => new Set(prev).add(missionId))

        try {
            // Simular ID del campista actual - en una app real vendría del contexto de autenticación
            const camperId = 1

            const response = await fetch("/api/asigna-mision", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    camperId,
                    missionId,
                }),
            })
            
            if (response.ok) {
                toast({
                    title: "¡Inscripción exitosa!",
                    description: "Te has inscrito a la misión correctamente.",
                })
                refetch()
                } else {
                throw new Error("Error al inscribirse")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo completar la inscripción. Inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setEnrollingMissions((prev) => {
                const newSet = new Set(prev)
                newSet.delete(missionId)
                return newSet
                })
                }
                }
                */
               
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                        <p className="mt-4 text-slate-600">Cargando misiones del campamento...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <div className="text-red-600 text-lg font-semibold">Error al cargar las misiones</div>
                        <p className="text-slate-600 mt-2">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    const missions = missionsBack.map(mission => ({
        ...mission,          // copiamos todas las propiedades originales
        difficulty: ["Fácil", "Medio", "Difícil", "Extremo"][Math.floor(Math.random() * 4)]
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-amber-800 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Misiones del Campamento</h1>
                    <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto text-balance">
                        Demuestra tu valor como semidiós y gana la gloria eterna
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                            <span className="text-amber-200 font-semibold">{missions?.length || 0} misiones disponibles</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Missions Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {missions?.map((mission) => {
                        const difficultyInfo = difficultyConfig[mission.difficulty]
                        const DifficultyIcon = difficultyInfo.icon
                        //const isEnrolling = enrollingMissions.has(mission.id)
                        
                        return (
                            <MissionCard
                            key={mission.id}
                            className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                            mission={mission}
                            >
                                <CardHeader
                                    className={`bg-gradient-to-r ${difficultyInfo.gradient} rounded-t-lg border-b border-slate-200`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                                                {mission.titulo}
                                            </CardTitle>
                                            <CardDescription className="text-slate-600 mt-2">{mission.descripcion}</CardDescription>
                                        </div>
                                        <DifficultyIcon className="h-6 w-6 text-slate-600 ml-2 flex-shrink-0" />
                                    </div>

{/*
                                    <div className="flex items-center gap-2 mt-4">
                                    <Badge className={`${difficultyInfo.color} font-semibold`}>{mission.difficulty}</Badge>
                                    {mission.godParent && (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                            {mission.godParent}
                                            </Badge>
                                            )}
                                    </div>
                                    */}
                                </CardHeader>

                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <MapPin className="h-4 w-4 text-amber-600" />
                                            <span>{mission.pista}</span>
                                        </div>
   
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Trophy className="h-4 w-4 text-amber-600" />
                                            <span className="font-medium text-amber-700">{mission.recompensa}</span>
                                        </div>
                                    </div>



                                </CardContent>

                                <CardFooter className="p-6 pt-0">
                                    {/*<Button
                                        onClick={() => alert("Enrolled")}
                                        disabled={isEnrolling || isFull || mission.isEnrolled}
                                        className={`w-full font-semibold transition-all duration-200 ${
                                            mission.isEnrolled
                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                                : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl"
                                        }`}
                                        >*/}
                                    <button
                                        onClick={() => alert("Enrolled")}
                                        className={`w-full font-semibold transition-all duration-200 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
                                            }`}
                                    >
                                        {/*{isEnrolling ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Inscribiendo...
                                            </div>
                                            ) : mission.isEnrolled ? (
                                                "✓ Ya inscrito"
                                        ) : isFull ? (
                                            "Misión completa"
                                        ) : (
                                            "Inscribirse a la misión"
                                        )}*/}
                                    </button>
                                </CardFooter>
                            </MissionCard>
                        )
                    })}
                </div>

                {missions && missions.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-slate-400 text-lg">No hay misiones disponibles en este momento</div>
                        <p className="text-slate-500 mt-2">Vuelve pronto para nuevas aventuras</p>
                    </div>
                )}
            </div>
        </div>
    )
}


const difficultyConfig = {
    Fácil: {
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: Shield,
        gradient: "from-emerald-50 to-emerald-100",
    },
    Medio: {
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: Sword,
        gradient: "from-amber-50 to-amber-100",
    },
    Difícil: {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: Zap,
        gradient: "from-orange-50 to-orange-100",
    },
    Extremo: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: Skull,
        gradient: "from-red-50 to-red-100",
    },
}
