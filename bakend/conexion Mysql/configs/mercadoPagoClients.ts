import { Preference } from 'mercadopago/dist/clients/preference/create';
import mercadopago from './mercadoPago';

export const preferenceClient = new Preference(mercadopago);
