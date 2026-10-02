# Caja del Día

App de control diario de caja y fiados. Un solo sitio estático (HTML/CSS/JS),
sin backend, sin dependencias externas. Los datos se guardan en el
`localStorage` del navegador y la app funciona **sin conexión** gracias a un
service worker.

## Archivos del proyecto

Todos los archivos van sueltos, en la raíz del repositorio (sin carpetas):

```
caja-del-dia/
├── index.html              ← la app
├── manifest.json            ← hace que sea instalable ("Agregar a pantalla de inicio")
├── sw.js                     ← service worker, guarda todo en caché para uso offline
├── icon-192.png
├── icon-192-maskable.png
├── icon-512.png
├── icon-512-maskable.png
└── README.md
```

## 1. Subir a GitHub

Primero crea un repositorio nuevo en GitHub (puede ser público o privado).

**Desde computadora (con git):**

```bash
git init
git add .
git commit -m "Caja del Día"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

**Desde el celular (sin git):**

1. Descomprime el `.zip` en tu teléfono (con la app de Archivos/Files, o
   cualquier gestor de archivos que sepa descomprimir).
2. En GitHub, entra a tu repositorio → **Add file → Upload files**.
3. Toca "choose your files" y selecciona **todos los archivos a la vez**
   (índice, manifest, sw.js, los 4 íconos y el README) — como están
   sueltos, sin carpetas, se pueden elegir todos juntos desde la galería
   o el explorador de archivos del celular en una sola selección.
4. Baja y confirma el commit ("Commit changes").

## 2. Activar GitHub Pages

1. En el repositorio, ve a **Settings → Pages**.
2. En "Source" elige la rama `main` y la carpeta `/ (root)`.
3. Guarda. GitHub te dará una URL parecida a:
   `https://TU-USUARIO.github.io/TU-REPO/`
4. Espera 1-2 minutos y abre esa URL — debe cargar la app. (GitHub Pages
   sirve todo por HTTPS, que es requisito para que el service worker
   funcione).

## 3. Instalar en el celular (Chrome)

1. Abre la URL de GitHub Pages en Chrome, en tu celular.
2. Toca el menú **⋮** (arriba a la derecha).
3. Toca **"Agregar a pantalla de inicio"** o **"Instalar aplicación"**
   (el texto exacto varía según la versión de Chrome).
4. Confirma. Te va a quedar un ícono como el de cualquier otra app.
5. Ábrela desde ese ícono — se abre en pantalla completa, sin la barra de
   direcciones de Chrome.

## 4. Uso sin conexión

La primera vez que abras la app necesita conexión (para que el navegador
descargue los archivos). Después de esa primera carga, el service worker
ya guardó todo en caché del propio dispositivo, así que puedes abrirla en
modo avión sin problema.

## 5. Dónde quedan tus datos

Todo se guarda con `localStorage`, **dentro del navegador de ese
dispositivo**. Esto significa:

- No necesitas internet para registrar movimientos, ver tus totales o
  guardar cierres mensuales.
- Los datos **no se sincronizan** entre dispositivos ni entre navegadores
  distintos (por ejemplo, si la abres en Chrome y luego en Firefox, cada
  uno tiene su propia copia).
- Si borras los datos de navegación / caché del sitio, o desinstalas la
  app, se pierde la información. Vale la pena exportar o anotar tus
  cierres mensuales de vez en cuando como respaldo.
- Como el repositorio de GitHub solo contiene el *código* de la app (no
  tus datos), puedes actualizar el código subiendo cambios sin que eso
  afecte lo que ya tienes guardado en el celular.

## 6. Actualizar la app más adelante

Si subes cambios nuevos al repositorio, el service worker los detecta y
los descarga en segundo plano; van a verse la próxima vez que cierres y
vuelvas a abrir la app (o refresques dos veces).
