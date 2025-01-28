// theme.js
import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: '#1A202C' },
        secondary: { value: '#2D3748' },
        background: { value: '#F7FAFC' }, // light gray background
      },
      fonts: {
        heading: { value: 'Arial, sans-serif' },
        body: { value: 'Verdana, sans-serif' },
      },
      sizes: {
        container: { value: '1200px' },
      },
      shadows: {
        card: { value: '0 2px 4px rgba(0,0,0,0.1)' },
      },
    },
    semanticTokens: {
      colors: {
        error: { value: 'red.500' },
        success: { value: 'green.500' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

export default system;
