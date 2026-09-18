import { getUsers, setSession } from '../../../utils/auth';
import { navegarA, rutas } from '../../../utils/navigate';
import { Rol } from '../../../types/Rol';

const form = document.querySelector<HTMLFormElement>('#form-login');
const emailInput = document.querySelector<HTMLInputElement>('#email');
const passwordInput = document.querySelector<HTMLInputElement>('#password');
const errorMsg = document.querySelector<HTMLParagraphElement>('#error-msg');

form?.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  if (!emailInput || !passwordInput || !errorMsg) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const users = getUsers();
  const usuario = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!usuario) {
    errorMsg.textContent = 'Credenciales inválidas. Verifica tu correo y contraseña.';
    errorMsg.style.display = 'block';
    return;
  }

  setSession(usuario);

  if (usuario.rol === Rol.ADMIN) {
    navegarA(rutas.admin);
  } else {
    navegarA(rutas.client);
  }
});