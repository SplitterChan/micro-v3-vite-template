import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify
} from 'unocss';

export const unocssPresets = [presetUno(), presetAttributify(), presetIcons()];

export default defineConfig({
  presets: unocssPresets,
  rules: [
    ['flex', { display: 'flex' }],
    [/^m-([\.\d]+)$/, ([, num]) => ({ margin: `${num}px` })],
    [/^p-([\.\d]+)$/, ([, num]) => ({ padding: `${num}px` })]
  ]
});
