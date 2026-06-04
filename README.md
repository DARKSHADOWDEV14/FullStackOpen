creación de react
npm create vite@latest part1 -- --template react
npm run dev

creación de backen
json-server db.json --port 3001
carpera db.json en la raiz del proyecto

part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  courseinfo
  phonebook
  countries

npm run build = Esto crea un directorio llamado dist (que contiene el único archivo HTML de nuestra aplicación, index.html)
--------------------------------------------------------------------------------------------------------
Se debe agregar esto en vite.config.js despues de reducir el patch http://localhost:3001/api/persons a /api/persons, enlace a la aplicación en línea  https://fullstackopenb.onrender.com/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/api/persons',
        changeOrigin: true,
      },
    },
  },
})

npm install --save-dev vitest jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
"scripts": {
    // ...
    "test": "vitest run"
  }

  Eslint se queja de las palabras clave test y expect en las pruebas. El problema se puede resolver instalando eslint-plugin-vitest-globals:
  npm install --save-dev eslint-plugin-vitest-globals

nstalemos la librería user-event que facilita un poco la simulación del input del usuario:
  npm install --save-dev @testing-library/user-event
