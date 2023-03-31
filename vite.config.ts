// vite.config.ts

import UnoCSS from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'

export default {
  plugins: [
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons({
          /* options */

        }),
        presetWebFonts({
          provider: 'google', // default provider
          fonts: {
            // these will extend the default theme
            sans:
              {
                name: 'Noto Sans',
                weights: ['400', '700'],
                italic: false,

              },
            lobster: 'Montserrat',
            mono: ['Fira Code', 'Fira Mono:400,700'],
            // custom ones
            lato: [
              {
                name: 'Lato',
                weights: ['400', '700'],
                italic: true,
              },
              {
                name: 'sans-serif',
                provider: 'none',
              },
            ],
          },
        }),
      ], // disable default preset
      rules: [
        // your custom rules
      ],
    }),
  ],
}