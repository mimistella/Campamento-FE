export function ErrorScreen({ error, refetch }) {
    return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <div className="text-red-600 text-lg font-semibold">Error al cargar las misiones</div>
                        <p className="text-slate-600 mt-2">{error}</p>
                        <Button onClick={refetch} className="mt-4 bg-amber-600 hover:bg-amber-700">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </div>
        )

}
