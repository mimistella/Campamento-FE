````markdown
# 🚀 Guía de instalación del proyecto

## 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/mimistella/Campamento-FE.git
````
---

## 2️⃣ Entrar en la carpeta del proyecto

```bash
cd Campamento-FE
```

---

## 3️⃣ Instalar dependencias

Instala las dependencias:

```bash
pnpm install

```

---

## 4️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto copiando el contenido de `.env.example`:

```bash
cp .env.example .env
```

---

## 5️⃣ Comandos disponibles

```bash
pnpm dev       # Modo desarrollo
pnpm build     # Compilar para producción
pnpm preview   # Servir build localmente
pnpm lint      # Ejecutar ESLint
```

---

## 6️⃣ Iniciar el servidor de desarrollo

```bash
pnpm dev
```

Abre en tu navegador:

```
http://localhost:5173
```

---

## 7️⃣ Compilar para producción (opcional)

```bash
pnpm build
```

El resultado estará en la carpeta `dist/`.

---

## 8️⃣ Servir la compilación (opcional)

```bash
pnpm preview
```


## 📝 Notas importantes

* El backend **Campamento-BE** debe estar corriendo antes de iniciar el frontend.
* Usar **Core UI** y **FontAwesome** para mantener consistencia visual.
* Centralizar las rutas de API en `src/constants` para facilitar el mantenimiento.
* Utilizar **Axios** para las peticiones HTTP.

* Si hay cambios en `.env`, vuelve a iniciar el servidor (`Ctrl + C` para parar y `pnpm dev` para arrancar de nuevo).

```
