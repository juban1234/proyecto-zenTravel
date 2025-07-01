import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
  files?: Express.Multer.File[]; // Para multer .array
}