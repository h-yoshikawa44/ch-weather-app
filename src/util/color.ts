import { color } from 'csx';

/**
 * 色情報 + 暗さをもとにした HEX 値を文字列で取得
 * @param colorValue - 色情報（16進数カラーコード値 or CSS カラー関数）
 * @param darkenValue - 暗さ（% or 0~1の少数値）
 * @param relative - 相対的にするか
 * @return - HEX 値の文字列
 */
export const createDarkenColor = (
  colorValue: string,
  darkenValue: number | string = 0,
  relative: boolean = false
): string => {
  return color(colorValue).darken(darkenValue, relative).toHexString();
};
