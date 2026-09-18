import { getCurrentUser } from './utils/auth';
import { Rol } from './types/Rol';
import { navegarA, rutas } from './utils/navigate';

export const verificarGuardCentral = (): void => {
  const usuario = getCurrentUser();
  const path = window.location.pathname;

  const esAdmin = path.includes('/admin/');
  const esClient = path.includes('/client/');
  const esAuth = path.includes('/auth/');

  // 1. Acceso a rutas protegidas sin haber iniciado sesión
  if ((esAdmin || esClient) && !usuario) {
    navegarA(rutas.login);
    return;
  }

  // 2. Usuario con rol 'client' intentando acceder a la zona de administración
  if (esAdmin && usuario?.rol !== Rol.ADMIN) {
    alert('Acceso no autorizado: No posee permisos de administrador.');
    navegarA(rutas.client);
    return;
  }

  // 3. Usuario ya autenticado intentando ingresar a páginas de login o registro
  if (esAuth && usuario) {
    if (usuario.rol === Rol.ADMIN) {
      navegarA(rutas.admin);
    } else {
      navegarA(rutas.client);
    }
  }
};

verificarGuardCentral();