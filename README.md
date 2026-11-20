# Rick and Morty: Prueba Técnica 

Aplicación para explorar los personajes de la serie, ver su detalle y gestionar una lista de favoritos.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Vitest + React Testing Library
- ESLint + Prettier

## Cómo ejecutarlo

Requisitos: Node 20.19+ o 22+

```bash
npm install
cp .env.example .env # Windows: copy .env.example .env
npm run dev
```

Abrir http://localhost:5173

## Pruebas

```bash
npm run test:run
```

Cubren tres niveles:

- Funciones puras: lógica de paginación y reducer de favoritos
- Componentes: paginación y botón de favoritos (con Context y `localStorage`)
- Página principal: listado, modal, buscador y manejo de errores, con la API simulada




## Funcionalidades

### Requeridas

- Consumo del endpoint `/character` de la API
- Listado inicial de 20 personajes
- Modal con el detalle del personaje
- Botón para agregar o quitar de favoritos
- Sección de favoritos en una vista aparte
- Modal de detalle desde favoritos
- Eliminar personajes de favoritos

### Deseables

| Requisito                   | Implementación                                               |
| --------------------------- | ------------------------------------------------------------ |
| Paginación                  | Del servidor en el listado y del cliente en favoritos        |
| Buscador                    | Por nombre en tiempo real, con debounce de 400 ms            |
| Arquitectura de componentes | Componentes genéricos en `ui/` y de dominio en `characters/` |
| Estado global               | Context API con `useReducer`                                 |
| Pruebas unitarias           | Vitest y React Testing Library                               |

### Extras

- Los favoritos se conservan al recargar la página (`localStorage`)
- Rutas con React Router (`/` y `/favoritos`)
- Skeletons mientras cargan los personajes
- Mensaje de error con botón para reintentar si falla la API
- Imagen de respaldo cuando una imagen no carga
- Diseño responsive (1, 2 o 4 columnas)
- Accesibilidad: etiquetas ARIA, navegación con teclado y cierre del modal con `Esc`

## Autor

Alberto Lloyd Hernandez Rivera

- [GitHub](https://github.com/LLOOHER)