import { Rol } from './Rol';

export interface IUser {
  id: string;
  email: string;
  password: string;
  rol: Rol;
}