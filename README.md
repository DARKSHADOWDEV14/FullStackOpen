### creación de react
npm create vite@latest nombre-proyecto -- --template react
npm run dev

### creación de backend
json-server db.json --port 3001
carpera db.json en la raiz del proyecto

### creación de carpetas para entrega de FullStackOpen

part0
part1
  + courseinfo
  + unicafe
  + anecdotes
part2
  + courseinfo
  + phonebook
  + countries

### Creación de carpeta Build

npm run build = Esto crea un directorio llamado dist (que contiene el único archivo HTML de nuestra aplicación, index.html)

Se debe agregar esto en vite.config.js despues de reducir el patch http://localhost:3001/api/persons a /api/persons, enlace a la aplicación en línea  [Página desplegada en Render](https://fullstackopenb.onrender.com/)

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

  crear un archivo testSetup.js en la raíz del proyecto con el siguiente contenido

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})

archivo vite.config.js de la siguiente manera:

export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  }
})

  Eslint se queja de las palabras clave test y expect en las pruebas. El problema se puede resolver instalando eslint-plugin-vitest-globals:
  npm install --save-dev eslint-plugin-vitest-globals

nstalemos la librería user-event que facilita un poco la simulación del input del usuario:
  npm install --save-dev @testing-library/user-event

  npm test -- --coverage

 ### Pruebas de extremo a extremo: Playwright

  npm init playwright@latest
  + Do you want to use TypeScript or JavaScript? · JavaScript
  + Where to put your end-to-end tests? · tests
  + Add a GitHub Actions workflow? (Y/n) · false
  + Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true

### Installing Playwright Test 
(npm install --save-dev @playwright/test)

  "scripts": {
    "test": "playwright test",
    "test:report": "playwright show-report"
  },

  npm test = ejecución normal 
  npm run test:report = Un reporte más detallado
  npm run test -- --ui = pueden ejecutarse a través de la interfaz gráfica
  npm test -- --project chromium

### Instalación de pnpm sin borrar los archivos anteriores

Si estás trabajando en React con Vite, Express o ambos, normalmente basta con:

npm install -g pnpm
pnpm import
pnpm install

sin borrar node_modules ni package-lock.json inicialmente. Cuando confirmes que todo funciona, puedes eliminar package-lock.json para evitar mezclar gestores de paquetes.
