import { defineConfig } from 'vite';
import { resolve } from 'path';

// Include a plugin for copying assets if necessary
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    // Use the copy plugin to include your PDF in the build output
    copy({
      targets: [
        { src: 'src/assets/CalebJackson_SoftwareEngineer.pdf', dest: 'dist/assets' }
      ],
      hook: 'writeBundle' // or 'writeBundle' for rollup
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'),
        about: resolve(__dirname, 'src', 'about.html'), // Add about.html as an entry
        // Include other HTML files as needed
      },
      // Other Rollup options as needed
    }
  }
});
