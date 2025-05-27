// db.ts
// Datos de ejemplo
const paquetesDB = [
  { id: 1, destino: 'cartagena', descripcion: 'Paquete playa en Cartagena, 5 días' },
  { id: 2, destino: 'medellin', descripcion: 'Paquete cultural en Medellín, 3 días' },
];

const hotelesDB = [
  { id: 1, departamento: 'cartagena', nombre: 'Hotel Caribe', estrellas: 4 },
  { id: 2, departamento: 'medellin', nombre: 'Hotel Andes', estrellas: 3 },
];

const informacionDB = [
  { destino: 'cartagena', info: 'Cartagena es una ciudad histórica y turística en Colombia.' },
  { destino: 'medellin', info: 'Medellín es conocida por su clima agradable y cultura vibrante.' },
];

// Funciones simuladas async (puedes cambiar por consultas reales)
export const getPaquetesPorDestino = async (pregunta: string) => {
  return paquetesDB.filter(p => pregunta.includes(p.destino.toLowerCase()));
};

export const getHotelesPorDepartamento = async (pregunta: string) => {
  return hotelesDB.filter(h => pregunta.includes(h.departamento.toLowerCase()));
};

export const getInformacionDestino = async (pregunta: string) => {
  return informacionDB.filter(i => pregunta.includes(i.destino.toLowerCase()));
};
