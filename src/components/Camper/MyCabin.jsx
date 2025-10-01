import { cabinsData } from './CabinData';
import CabinInfo from './CabinInfo';



const CabinPage = ({ userId }) => {
  // Hardcodeo el userId por el momento, cambio cuando esté el login
  userId = "1";
  const userCabin = cabinsData.find((cabin) =>
    cabin.assignedUsers.includes(userId)
  );

  if (!userCabin) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl text-amber-600 font-bold">
            No pertenecés a ninguna cabaña
          </h1>
          <p className="mt-4 text-gray-600">
            Aún no has sido asignado a una cabaña.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 flex justify-center items-start lg:items-center">
      <CabinInfo cabin={userCabin} />
    </div>
  );
};

export default CabinPage;
