import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

export const clasificarIntencionConIA = async (pregunta: string): Promise<string> => {
  try {
    const prompt = `
Clasifica la siguiente intención del usuario en una sola palabra clave, SIN justificar y sin explicar. 
Usa solo una de estas categorías predefinidas:

- aventura
- relajación
- historia
- naturaleza
- cultural
- romántico
- playa
- gastronomía
- viaje_familiar
- viaje_pareja
- viaje_solo
- paquetes
- hoteles
- transporte

Ejemplos:
Pregunta: Quiero ir a caminar por la montaña → naturaleza  
Pregunta: Algo con mi pareja → viaje_pareja  
Pregunta: Me interesa el carnaval de Barranquilla → cultural  
Pregunta: Busco un lugar para descansar → relajación  
Pregunta: Quiero ir a la playa → playa  

Pregunta: ${pregunta}
`.trim();

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const texto = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase() || "general";
    return texto.replace(/\s+/g, "_");
  } catch (error) {
    console.error("Error en clasificador IA:", error);
    return "general";
  }
};
