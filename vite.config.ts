import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        login: resolve(import.meta.dirname, 'src/pages/auth/login/login.html'),
        registro: resolve(import.meta.dirname, 'src/pages/auth/registro/registro.html'),
        admin: resolve(import.meta.dirname, 'src/pages/admin/admin.html'),
        clientHome: resolve(import.meta.dirname, 'src/pages/client/home/home.html'),
        clientCart: resolve(import.meta.dirname, 'src/pages/client/cart/cart.html'),
      },
    },
  },
  base: './',
});