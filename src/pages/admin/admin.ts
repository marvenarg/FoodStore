import { verificarAcceso, getCurrentUser, logout } from '../../utils/auth';
import { Rol } from '../../types/Rol';

verificarAcceso([Rol.ADMIN]);

const usuario = getCurrentUser();
const adminDisplay = document.querySelector<HTMLSpanElement>('#admin-display');
const btnLogoutAdmin = document.querySelector<HTMLAnchorElement>('#btn-logout-admin');

if (adminDisplay && usuario) {
  adminDisplay.textContent = `Admin: ${usuario.email}`;
}

btnLogoutAdmin?.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault();
  logout();
});