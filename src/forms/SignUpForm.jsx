import React, { useState } from 'react';
import { UserIcon, LockIcon, PhoneIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../hooks/useApi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SignUpForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasena: '',
    repetirContrasena: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validación de campos obligatorios
    const required = ['nombre', 'apellido', 'email', 'telefono', 'contrasena', 'repetirContrasena'];
    for (const key of required) {
      if (!form[key]) {
        setError('Por favor completa todos los campos obligatorios.');
        return;
      }
    }
    if (form.contrasena !== form.repetirContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    // Validar teléfono (mínimo 8 dígitos sin código país)
    const phoneDigits = form.telefono.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('El número de teléfono no es válido.');
      return;
    }
    setLoading(true);
    try {
      // Enviar contraseña sin encriptar, la encriptación se realiza en el backend
      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        contrasena: form.contrasena,
      };
      await api.post('/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      setSuccess('¡Registro exitoso! Revisa tu correo para más instrucciones.');
      setForm({
        nombre: '', apellido: '', email: '', telefono: '', contrasena: '', repetirContrasena: '',
      });
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al registrar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit} autoComplete="off">
      {/* Nombre */}
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      {/* Apellido */}
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          value={form.apellido}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      {/* Teléfono */}
      <div className="relative col-span-2 sm:col-span-1">
        <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        <PhoneInput
          country={'ar'}
          value={form.telefono}
          onChange={value => setForm(f => ({ ...f, telefono: value }))}
          inputClass="!w-full !pl-10 !pr-3 !py-2 !border !border-gray-300 !rounded-md !outline-none focus:!border-amber-500 transition !h-[42px] !text-base"
          buttonClass="!border-none !bg-transparent !absolute !left-0 !top-1/2 !-translate-y-1/2 !z-20"
          dropdownClass="!z-50"
          containerClass="w-full"
          inputProps={{ name: 'telefono', required: true, autoFocus: false, placeholder: 'Teléfono' }}
          masks={{ ar: '..........' }}
          enableSearch
        />
      </div>


      {/* Contraseña */}
      <div className="relative">
        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="contrasena"
          placeholder="Password"
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md outline-none"
          value={form.contrasena}
          onChange={handleChange}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {/* Repetir contraseña */}
      <div className="relative">
        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type={showRepeatPassword ? 'text' : 'password'}
          name="repetirContrasena"
          placeholder="Password"
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md outline-none"
          value={form.repetirContrasena}
          onChange={handleChange}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={() => setShowRepeatPassword((v) => !v)}
          aria-label={showRepeatPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showRepeatPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>


      {/* Mensajes de error y éxito */}
      {error && (
        <div className="col-span-2 text-red-600 text-center font-medium mb-2">{error}</div>
      )}
      {success && (
        <div className="col-span-2 text-green-600 text-center font-medium mb-2">{success}</div>
      )}
      {/* Botón Sign Up */}
      <button
        type="submit"
        className="col-span-2 w-full bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
      <div className="col-span-2 flex flex-col items-center mt-4 text-sm">
        <span className="text-gray-700">¿Ya tienes cuenta?</span>
        <Link
          to="/login"
          className="text-amber-700 hover:text-amber-600 underline transition-colors font-semibold mt-1"
        >
          Inicia sesión
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
