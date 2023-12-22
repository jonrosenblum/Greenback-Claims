// vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://api.greenbackclaims.com', // Replace with your backend server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite optional, if needed
      },
    },
  },
};