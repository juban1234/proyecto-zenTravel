export const detectarIntencion = (pregunta: string): string => {
  const texto = pregunta.toLowerCase();

  if (texto.includes("playa")) return "destinos_playa";
  if (texto.includes("naturaleza") || texto.includes("montaña")) return "destinos_naturaleza";
  if (texto.includes("historia") || texto.includes("cultura")) return "destinos_cultural";
  if (texto.includes("hotel") || texto.includes("alojamiento")) return "hoteles";
  if (texto.includes("paquete") || texto.includes("promoción")) return "paquetes";
  if (texto.includes("transporte") || texto.includes("vuelo") || texto.includes("bus")) return "transporte";

  return "general";
};
