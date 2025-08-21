import React from 'react';
import { UserIcon, LockIcon, LandmarkIcon, CakeIcon, HouseIcon, HeartPulseIcon } from 'lucide-react';

const SignUpForm = () => {
  return (
     <form className="grid grid-cols-2 gap-4">
      {/* Nombre */}
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Nombre" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Apellido */}
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Apellido" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Email" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Usuario */}
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Nombre de Usuario" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Contraseña */}
      <div className="relative">
        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Padre Divino */}
      <div className="relative">
        <LandmarkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Padre Divino" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Fecha de Nacimiento */}
      <div className="relative">
        <CakeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="date" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Grupo Sanguíneo */}
      <div className="relative">
        <HeartPulseIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Grupo Sanguíneo" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Dirección */}
      <div className="relative">
        <HouseIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Dirección" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Alergias */}
      <div className="relative">
        <HeartPulseIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Alergias conocidas" 
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Botón Sign Up */}
      <button className="col-span-2 w-full bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors">
        Registrarse
      </button>
    </form>
  );
};

export default SignUpForm;
