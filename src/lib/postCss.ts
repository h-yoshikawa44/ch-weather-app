import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';

export const processedCss = (css: string) => {
  return postcss([
    postcssPresetEnv({ enableClientSidePolyfills: true }),
  ]).process(css).css;
};
