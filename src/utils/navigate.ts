export const navegarA = (ruta: string): void => {
  window.location.href = ruta;
};

export const rutas = {
  login: '/src/pages/auth/login/login.html',
  registro: '/src/pages/auth/registro/registro.html',
  admin: '/src/pages/admin/admin.html',  
  client: '/src/pages/client/home/home.html',
  cart: '/src/pages/client/cart/cart.html',
};