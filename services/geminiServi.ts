// services/geminiServi.ts
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import { getPaquetesPorDestino, getInformacionDestino, getHotelesPorDepartamento } from "../db";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY no está definida en el archivo .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const colombiaKeywords = [
    "colombia", "turismo", "viajar", "actividades", "sitios", "lugares",
    "destinos", "visitar", "explorar", "historia", "cultura", "gastronomía",
    "departamento", "región", "municipio", "atracción", "recreación",
    "especificaciones", "detalles", "información", "naturaleza", "paisaje", "reseñas",
    "recomendaciones", "hoteles", "restaurantes", "transporte", "clima", "festividades", "tradiciones",
    "pueblo", "ciudad", "parque", "monumento", "museo", "playa", "montaña",
    "cascada", "senderismo", "aventura", "ciclismo", "caminatas",
    "folclor", "patrimonio cultural", "diversidad cultural", "identidad cultural",
    "expresiones culturales", "cosmovisión", "música", "danza", "artesanía",
    "bailes tradicionales", "instrumentos musicales", "tejidos", "cerámica",
    "platos típicos", "bebidas tradicionales", "fiestas patronales", "carnaval",
    "lenguas indígenas", "dialectos", "creencias", "religión", "vestimenta",
    "trajes típicos", "mitos", "leyendas", "cuentos tradicionales", "arquitectura tradicional",
    "plan", "presupuesto", "costo", "precio", "gasto", "viaje", "organizar",
    "alojamiento", "transporte", "comida", "actividad", "excursión", "tour",
    "cuánto cuesta", "aproximado", "estimado", "rango de precios", "gastos", "ahorrar", "planificación",
    "itinerario", "ruta", "horarios", "reservas", "compras", "ofertas", "descuentos",
    "paquete turístico", "guía", "consejos", "sugerencias", "recomendaciones",
    "experiencias", "autenticidad", "cultura local", "interacción cultural", "comunidad",
    "interacción", "inmersión cultural", "vivencias", "tradiciones locales", "gastronomía local",
    "productos típicos", "artesanos", "ferias", "mercados", "exposiciones",
];

const isColombiaRelated = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return colombiaKeywords.some(keyword => lowerText.includes(keyword));
};

const smartTruncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }

    let endIndex = text.lastIndexOf('.', maxLength);
    if (endIndex === -1) {
        endIndex = text.lastIndexOf(' ', maxLength);
    }

    if (endIndex === -1 || endIndex < maxLength * 0.5) {
        endIndex = maxLength;
    }

    return text.substring(0, endIndex).trim() + '...';
};

const extractDepartmentOrCity = (text: string): string | null => {
    const locations = [
        "amazonas", "antioquia", "arauca", "atlántico", "bolívar", "boyacá",
        "caldas", "caquetá", "casanare", "cauca", "cesar", "choco", "córdoba",
        "cundinamarca", "guainía", "guaviare", "huila", "la guajira", "magdalena",
        "meta", "nariño", "norte de santander", "putumayo", "quindío", "risaralda",
        "san andrés y providencia", "santander", "sucre", "tolima",
        "valle del cauca", "vaupés", "vichada",
        "bogotá", "cartagena", "medellín", "cali", "santa marta", "barranquilla",
        "san andrés", "eje cafetero", "popayán", "villa de leyva", "neiva", "pereira", "manizales",
        "armenia", "zipaquirá", "taganga", "pijao"
    ];
    const lowerText = text.toLowerCase();
    for (const loc of locations) {
        if (lowerText.includes(loc)) {
            return loc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
    }
    return null;
};

const cleanResponseText = (text: string): string => {
    const withoutAsterisks = text.replace(/\*/g, '');
    const withLineBreaks = withoutAsterisks.replace(/(?:\r\n|\r|\n)/g, '\n');
    return withLineBreaks.trim();
};

export const getResponseFromAIZenTravel = async (Preguntar: string): Promise<string> => {
    if (!isColombiaRelated(Preguntar)) {
        return "Lo siento, solo puedo responder preguntas relacionadas con turismo, historia, actividades, cultura, gastronomía y detalles de Colombia y sus departamentos.";
    }

    let databaseContext = ""; // Se construirá para el prompt
    let dbDataStatusMessage = ""; // Mensaje conciso sobre el estado de la DB
    const lugarDetectado = extractDepartmentOrCity(Preguntar);

    if (lugarDetectado) {
        try {
            const infoDestino = await getInformacionDestino(lugarDetectado);
            const paquetes = await getPaquetesPorDestino(lugarDetectado);
            const hoteles = await getHotelesPorDepartamento(lugarDetectado);

            if (infoDestino.length > 0 || paquetes.length > 0 || hoteles.length > 0) {
                dbDataStatusMessage = `Se encontró información relevante en la base de datos ZenTravel para "${lugarDetectado}".`;
                databaseContext += `\n--- DETALLES DE LA BASE DE DATOS ZEN TRAVEL ---\n`;
                if (infoDestino.length > 0) {
                    databaseContext += `\nDetalles del Destino:\n`;
                    infoDestino.forEach(info => {
                        databaseContext += `- Nombre: ${info.nombreDestino}, Departamento: ${info.departamento}, Descripción: ${info.descripcionDestino}\n`;
                    });
                }
                if (paquetes.length > 0) {
                    databaseContext += `\nPaquetes Turísticos Disponibles:\n`;
                    paquetes.forEach(p => {
                        databaseContext += `- Paquete: **${p.nombrePaquete}** (${p.duracionDias} días). Destino: ${p.nombreDestino} (${p.departamentoDestino}). Descripción: ${p.descripcion}. Precio Total: **$${p.precioTotal || 'N/A'}**. Descuento: ${p.descuento || 0}%. Hotel: ${p.nombreHotel || 'No especificado'}. Transporte: ${p.tipoTransporte || 'No especificado'} (${p.empresaTransporte || 'N/A'}).\n`;
                    });
                }
                if (hoteles.length > 0) {
                    databaseContext += `\nHoteles y Habitaciones Disponibles:\n`;
                    hoteles.forEach(h => {
                        databaseContext += `- Hotel: **${h.nombreHotel}**, Ubicación: ${h.ubicacionHotel}. Descripción del hotel: ${h.descripcionHotel}. Habitaciones: ${h.habitacionesInfo}\n`;
                    });
                }
                databaseContext += `-------------------------------------------\n`;
            } else {
                dbDataStatusMessage = `La base de datos ZenTravel NO contiene información específica para "${lugarDetectado}" sobre esta consulta.`;
                databaseContext = `\n--- ESTADO DE LA BASE DE DATOS ZEN TRAVEL ---\n${dbDataStatusMessage}\n-------------------------------------------\n`;
            }

        } catch (dbError) {
            console.error("Error al consultar la base de datos en geminiServi:", dbError);
            dbDataStatusMessage = `Hubo un problema técnico al intentar consultar la base de datos ZenTravel.`;
            databaseContext = `\n--- ESTADO DE LA BASE DE DATOS ZEN TRAVEL ---\n${dbDataStatusMessage}\n-------------------------------------------\n`;
        }
    } else {
        dbDataStatusMessage = `No se detectó un lugar específico en la pregunta del usuario para consultar en la base de datos ZenTravel.`;
        databaseContext = `\n--- ESTADO DE LA BASE DE DATOS ZEN TRAVEL ---\n${dbDataStatusMessage}\n-------------------------------------------\n`;
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        tools: [{
            functionDeclarations: [{
                name: 'search',
                description: 'Search Google for current and general information not available in the database, or to get more details on topics where database information is insufficient.',
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        query: {
                            type: SchemaType.STRING,
                            description: 'The search query string, concisely formulated to get the most relevant web results.',
                        },
                    },
                    required: ['query'],
                },
            }],
        }],
    });

    // Nuevo prompt mejorado
    const basePrompt = `Eres un asistente experto en turismo, historia, actividades recreativas, cultura, gastronomía y planificación de viajes para Colombia. Tu objetivo principal es proporcionar respuestas completas, precisas y útiles.

    **INSTRUCCIONES CLAVE PARA TI:**
    1.  **VERIFICAR BASE DE DATOS (ZenTravel):** Siempre revisa la información de la base de datos ZenTravel que se te proporciona a continuación, identificada como "DETALLES DE LA BASE DE DATOS ZEN TRAVEL" o "ESTADO DE LA BASE DE DATOS ZEN TRAVEL".
    2.  **PRIORIZAR DB:** Si la base de datos contiene información RELEVANTE y SUFICIENTE para responder a la pregunta del usuario, utilízala como tu fuente principal.
    3.  **USO IMPERATIVO DE LA HERRAMIENTA 'search':**
        * **SI el 'ESTADO DE LA BASE DE DATOS ZEN TRAVEL' indica que NO hay información específica o que la información es INSUFICIENTE para responder la pregunta, DEBES usar la herramienta 'search' (búsqueda web) para obtener los datos necesarios.**
        * Utiliza 'search' también para obtener información actualizada, general o que no sea de la base de datos (ej. clima, eventos actuales, noticias, historia general, gastronomía no listada en la DB, etc.).
        * Formula tus consultas a 'search' de forma concisa y directa.
    4.  **SINTETIZAR Y RESPONDER:** Combina la información de la base de datos y los resultados de 'search' (si la usas) en una respuesta única, completa y coherente. **NO menciones explícitamente que realizaste una búsqueda web; simplemente proporciona la información como parte de tu respuesta.**
    5.  **MANEJO DE INFORMACIÓN AUSENTE TOTAL:** Si, después de consultar la base de datos Y usar 'search', aún no puedes responder a la pregunta, indícalo claramente al usuario.

    ${databaseContext}
    `;

    const prompt = `${basePrompt}\n\nPregunta del usuario: ${Preguntar}`;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const response = await result.response;
        const rawText = response?.text() || "";
        const cleanedText = cleanResponseText(rawText);
        const truncatedText = smartTruncateText(cleanedText, 1500);

        return truncatedText;
    } catch (error) {
        console.error("Error al obtener la respuesta de la IA en geminiServi:", error);
        throw new Error("Lo siento, hubo un problema al procesar tu solicitud con la IA.");
    }
};