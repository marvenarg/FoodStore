import { saveUser } from '../../../utils/auth';
import { navegarA, rutas } from '../../../utils/navigate';
import type { IUser } from '../../../types/IUser';
import { Rol } from '../../../types/Rol';

const form = document.querySelector<HTMLFormElement>('#form-registro');
const emailInput = document.querySelector<HTMLInputElement>('#email');
const passwordInput = document.querySelector<HTMLInputElement>('#password');
const errorMsg = document.querySelector<HTMLParagraphElement>('#error-msg');

form?.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  if (!emailInput || !passwordInput || !errorMsg) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorMsg.textContent = 'Por favor completa todos los campos.';
    errorMsg.style.display = 'block';
    return;
  }

  const nuevoUsuario: IUser = {
    id: crypto.randomUUID(),
    email,
    password,
    rol: Rol.CLIENT,
  };

  const guardado = saveUser(nuevoUsuario);

  if (!guardado) {
    errorMsg.textContent = 'El correo ya se encuentra registrado.';
    errorMsg.style.display = 'block';
    return;
  }

  alert('Registro exitoso. Ahora podés iniciar sesión.');
  navegarA(rutas.login);
});