import type { IUser } from '../types/IUser';
import { Rol } from '../types/Rol';
import { navegarA, rutas } from './navigate';

const USERS_KEY = 'users';
const USER_DATA_KEY = 'userData';

export const getUsers = (): IUser[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  if (!usersJson) return [];
  try {
    return JSON.parse(usersJson) as IUser[];
  } catch {
    return [];
  }
};

export const saveUser = (user: IUser): boolean => {
  const users = getUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === user.email.toLowerCase()
  );

  if (exists) {
    return false; // Evita registros duplicados (Rúbrica Excelente)
  }

  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const getCurrentUser = (): IUser | null => {
  const sessionJson = localStorage.getItem(USER_DATA_KEY);
  if (!sessionJson) return null;
  try {
    return JSON.parse(sessionJson) as IUser;
  } catch {
    return null;
  }
};

export const setSession = (user: IUser): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
  navegarA(rutas.login);
};

export const verificarAcceso = (rolesPermitidos?: Rol[]): void => {
  const usuario = getCurrentUser();

  if (!usuario) {
    navegarA(rutas.login);
    return;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    alert('Acceso no autorizado: No posee permisos suficientes.');
    if (usuario.rol === Rol.CLIENT) {
      navegarA(rutas.client);
    } else {
      navegarA(rutas.admin);
    }
  }
};