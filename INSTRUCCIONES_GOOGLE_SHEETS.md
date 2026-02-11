# Guía de Configuración de Google Sheets

Para gestionar el contenido de tu web (Promociones, Categorías y Productos) desde Google Sheets, sigue estos pasos:

## 1. Crear la Hoja de Cálculo
Crea una nueva hoja de cálculo en Google Sheets.

## 2. Crear las Pestañas
Debes crear exactamente **3 pestañas** con los siguientes nombres (en mayúsculas):
1. `PROMO`
2. `CATEGORIAS`
3. `PRODUCTOS`

## 3. Configurar Columnas (Copiar y Pegar)

### Pestaña: `PROMO`
En la fila 1, copia estos encabezados:
`titulo, subtitulo, imagen_url, item1_nombre, item1_precio, item2_nombre, item2_precio, item3_nombre, item3_precio`

**Ejemplo de datos (Fila 2):**
- titulo: `MIÉRCOLES DE POLLITO`
- subtitulo: `¡PROMO DE LA SEMANA!`
- imagen_url: `https://tu-imagen.com/banner.jpg` (o dejar vacío para usar el default)
- item1_nombre: `Pollo entero`
- item1_precio: `50.00`
- ...

### Pestaña: `CATEGORIAS`
En la fila 1, copia estos encabezados:
`id, nombre, descripcion, imagen_url, orden`

**Ejemplo:**
- id: `pollos`
- nombre: `Pollos a la Brasa`
- descripcion: `Nuestros deliciosos pollos...`
- imagen_url: `https://...`
- orden: `1`

### Pestaña: `PRODUCTOS`
En la fila 1, copia estos encabezados:
`categoria_id, nombre, descripcion, precio, imagen_url, disponible`

**Ejemplo:**
- categoria_id: `pollos` (Debe coincidir con el `id` de la categoría)
- nombre: `1/4 de Pollo`
- descripcion: `Con papas y ensalada`
- precio: `18.00`
- disponible: `TRUE`

## 4. Publicar en la Web (Importante)
Para que la web pueda leer los datos:
1. Ve a **Archivo** > **Compartir** > **Publicar en la web**.
2. En "Vincular", selecciona **Todo el documento**.
3. Haz clic en **Publicar**.
4. Asegúrate de que los permisos de la hoja (botón Compartir arriba a la derecha) estén en **"Cualquier persona con el enlace"** puede ver (Lector).

## 5. Conectar con la Web
1. Copia el **ID** de tu hoja de cálculo.
   - El ID es la parte larga de la URL entre `/d/` y `/edit`.
   - Ejemplo: `https://docs.google.com/spreadsheets/d/`**`1xXyYzZ_ejemplo_ID_largo_12345`**`/edit...`
   
2. Abre el archivo `.env.local` en tu proyecto.
3. Agrega o modifica la línea:
   ```
   VITE_GOOGLE_SHEET_ID=TU_ID_AQUI
   ```
4. Reinicia la terminal (`ctrl + c` y `npm run dev`) si es necesario.
