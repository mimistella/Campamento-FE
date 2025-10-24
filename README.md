# 🏕️ Campamento-FE

Este proyecto corresponde al **Frontend** del sistema **Campamento Mestizo**, una aplicación web desarrollada en **React + Vite**.  
Permite gestionar un sistema de campamento temático.

---

## 🚀 Tecnologías utilizadas

- **React**
- **Vite**
- **JavaScript**
- **pnpm** como gestor de paquetes
- **Axios** para comunicación con el backend
- **React Router** para el enrutado
- **Context API y Hooks personalizados** para el manejo de estado global

---

## 🧩 Requisitos previos

Antes de comenzar, asegurate de tener instalado:

| Herramienta | Versión recomendada | Comando para verificar |
|-------------|---------------------|------------------------|
| [Node.js](https://nodejs.org/) | 18 o superior | `node -v` |
| [pnpm](https://pnpm.io/installation) | 8 o superior | `pnpm -v` |

---

## ⚙️ Instalación del proyecto

1. **Cloná el repositorio**
   ```bash
   git clone https://github.com/tuusuario/campamento-mestizo-frontend.git
   ```

2. **Entrá a la carpeta del proyecto**
   ```bash
   cd ./Campamento-FE
   ```

3. **Instalá las dependencias**
   ```bash
   pnpm install
   ```

⚠️ **Asegurate de tener el backend ejecutándose antes de iniciar el frontend.**

---

## Levantar el proyecto

Para iniciar el servidor de desarrollo:

```bash
pnpm run dev
```

Luego abrí tu navegador en [http://localhost:5173](http://localhost:5173) para acceder al sistema.

---

## 🧠 Estructura principal del proyecto

```
campamento-FE/
├── src/
│   ├── assets/          → Imágenes, íconos y recursos estáticos
│   ├── components/      → Componentes reutilizables
│   ├── context/         → Contextos globales (Auth, UI, etc.)
│   ├── constants/       → Constantes generales
│   ├── forms/           → Formularios y validaciones
│   ├── hooks/           → Hooks personalizados
│   ├── pages/           → Páginas del sistema
│   ├── providers/       → Providers globales
│   ├── App.jsx          → Componente raíz
│   └── main.jsx         → Punto de entrada
├── vite.config.js
├── package.json
└── README.md
```
