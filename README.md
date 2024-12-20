# Proyecto Cronómetro

Este proyecto es una aplicación de cronómetro simple. A continuación se explica la funcionalidad de cada archivo y cómo se integran entre sí.

## `index.html`
Este archivo HTML define la estructura básica de la página web. Incluye:
- Metadatos como el autor, la descripción y la configuración de la vista.
- Enlaces a Google Fonts y Bootstrap Icons para estilos adicionales.
- Un enlace al archivo CSS (`styles.css`) para los estilos personalizados.
- Un contenedor principal (`haupt-container`) que incluye:
  - Un div para mostrar el tiempo de la cronómetro (`stoppuhr`).
  - Dos botones: uno para iniciar/pausar (`button-start-pause`) y otro para reiniciar (`button-reset`).
- Un script que enlaza el archivo JavaScript (`app.js`).

## `styles.css`
Este archivo CSS define los estilos para la página web. Incluye:
- Estilos generales para eliminar márgenes y rellenos.
- Estilos para el cuerpo de la página, incluyendo una imagen de fondo.
- Estilos para el contenedor principal y los botones.
- Estilos específicos para los estados de los botones (iniciar, pausar, reiniciar).

## `app.ts`
Este archivo TypeScript contiene la lógica de la cronómetro. Incluye:
- Importación de `jsdom` para simular el entorno del navegador.
- Selección de los botones de inicio/pausa y reinicio.
- Variables para almacenar el tiempo (segundos, minutos, horas) y el estado de la cronómetro.
- Función `aktualisiereStoppuhr` para actualizar el tiempo cada segundo.
- Función `formatieren` para agregar ceros a la izquierda cuando sea necesario.
- Event listeners para los botones:
  - El botón de inicio/pausa alterna entre iniciar y pausar la cronómetro.
  - El botón de reinicio restablece el tiempo y el estado de la cronómetro.

## `app.js`
Este archivo JavaScript es la versión compilada de `app.ts`. Contiene la misma lógica pero en JavaScript.

## `package.json`
Este archivo define las dependencias y scripts del proyecto. Incluye:
- Dependencias de desarrollo como `@types/bun` y `typescript`.
- Scripts para construir y ejecutar el proyecto con `bun`.

## `package-lock.json`
Este archivo asegura que las dependencias se instalen de manera consistente en diferentes entornos. Contiene información detallada sobre las versiones de las dependencias instaladas.

## Flujo de Trabajo
1. **HTML**: Define la estructura de la página y los elementos interactivos.
2. **CSS**: Aplica estilos a los elementos HTML.
3. **TypeScript/JavaScript**: Añade funcionalidad a los elementos interactivos.
4. **Bun**: Utilizado para construir y ejecutar el proyecto.

## Ejecución
Para ejecutar el proyecto con `bun`, asegúrate de tener `bun` instalado y ejecuta el siguiente comando:
```bash
bun app.ts --watch