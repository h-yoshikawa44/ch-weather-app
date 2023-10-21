import createCache from '@emotion/cache';

export const createEmotionCache = () => {
  const isSSR = typeof document === 'undefined';

  return createCache({
    key: 'css',
    // autoprefixer は PostCSS の方を使うので、こちらのプラグイン空配列で上書きして無効化しておく
    stylisPlugins: [],
    ...(!isSSR && {
      container: document.head,
      insertBefore: document.head.firstElementChild,
    }),
  });
};
