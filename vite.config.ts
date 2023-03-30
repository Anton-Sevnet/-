// vite.config.ts

import UnoCSS from 'unocss/vite'
import presetUno from "@unocss/preset-uno"

export default {
  plugins: [
    UnoCSS({
      presets: [
        presetUno()
      ], // disable default preset
      rules: [
        // your custom rules
      ],
    }),
  ],
}