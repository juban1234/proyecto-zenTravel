import { Request, Response } from 'express';
import { queryDatabaseFirst } from '../../services/geminiServi';
import { askGeminiWebFallback } from '../utils/gemini.api';

export const handleGeminiQuery = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  try {
    const dbResponse = await queryDatabaseFirst(message);

    if (dbResponse?.length) {
      return res.json({ source: 'database', data: dbResponse });
    }

    const geminiResponse = await askGeminiWebFallback(message);
    return res.json({ source: 'gemini-web', data: geminiResponse });

  } catch (error) {
    console.error('Error procesando consulta con Gemini:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
