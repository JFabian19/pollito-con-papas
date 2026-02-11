export interface SheetPromo {
    titulo: string; // "MIÉRCOLES DE POLLITO"
    subtitulo: string; // "¡PROMO DE LA SEMANA!"
    imagen_url: string; // URL for banner
    item1_nombre: string;
    item1_precio: string;
    item2_nombre: string;
    item2_precio: string;
    item3_nombre: string;
    item3_precio: string;
}

export interface SheetCategory {
    id: string; // "pollos", "parrillas"
    nombre: string; // Display name
    descripcion: string;
    imagen_url: string;
    orden: string;
}

export interface SheetProduct {
    categoria_id: string;
    nombre: string;
    descripcion: string;
    precio: string; // "50.00"
    imagen_url: string;
    disponible: string; // "TRUE" or "FALSE"
}

// Robust CSV Parser
const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const result: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const rowValues: string[] = [];
        let currentValue = '';
        let inQuote = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const nextChar = line[j + 1];

            if (char === '"') {
                if (inQuote && nextChar === '"') {
                    currentValue += '"';
                    j++; // Skip next quote
                } else {
                    inQuote = !inQuote;
                }
            } else if (char === ',' && !inQuote) {
                rowValues.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        rowValues.push(currentValue);

        // Map to headers
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
            obj[header] = rowValues[index]?.trim() || '';
        });
        result.push(obj);
    }

    return result;
};

export const fetchSheetData = async (spreadsheetId: string) => {
    const baseUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;

    try {
        // Fetch all 3 sheets in parallel
        const [promoRes, catRes, prodRes] = await Promise.all([
            fetch(`${baseUrl}&sheet=PROMO`),
            fetch(`${baseUrl}&sheet=CATEGORIAS`),
            fetch(`${baseUrl}&sheet=PRODUCTOS`)
        ]);

        if (!promoRes.ok || !catRes.ok || !prodRes.ok) {
            throw new Error(`Failed to fetch data. Status: ${promoRes.status}, ${catRes.status}, ${prodRes.status}`);
        }

        const promoText = await promoRes.text();
        const catText = await catRes.text();
        const prodText = await prodRes.text();

        const promoRows = parseCSV(promoText);
        const catRows = parseCSV(catText);
        const prodRows = parseCSV(prodText);

        // 1. Process Promo
        const promo = promoRows.length > 0 ? (promoRows[0] as unknown as SheetPromo) : null;

        // 2. Process Categories
        const categories = catRows
            .sort((a, b) => parseInt(a.orden || '0') - parseInt(b.orden || '0'))
            .map(cat => ({
                id: cat.id,
                categoria: cat.nombre, // Using 'nombre' as the key/display
                descripcion: cat.descripcion,
                // If image_url is empty, fallback? Or handle in UI
                imagen: cat.imagen_url,
                items: [] // Will populate next
            }));

        // 3. Process Products & Map to Categories
        // We need to map products to the categories we just created.
        // The link is product.categoria_id === category.id

        // Create a map for O(1) lookup of categories by ID
        const categoryMap = new Map();
        categories.forEach(cat => categoryMap.set(cat.id, cat));

        prodRows.forEach(prod => {
            const cat = categoryMap.get(prod.categoria_id);
            if (cat && prod.disponible?.toLowerCase() !== 'false') {
                cat.items.push({
                    nombre: prod.nombre,
                    descripcion: prod.descripcion,
                    precio: parseFloat(prod.precio.replace('S/', '').trim()) || 0,
                    imagen: prod.imagen_url || undefined
                });
            }
        });

        return {
            promoData: promo,
            menuData: { menu: categories }
        };

    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        return null;
    }
};
