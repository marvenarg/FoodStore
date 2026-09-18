export const navegarA = (ruta: string): void => {
  window.location.href = ruta;
};

export const rutas = {
  login: '/src/pages/auth/login/index.html',
  registro: '/src/pages/auth/registro/index.html',
  admin: '/src/pages/admin/index.html',
  //client: '/src/pages/client/index.html',
  client: '/src/pages/client/home/home.html',
  cart: '/src/pages/client/cart/cart.html',
};