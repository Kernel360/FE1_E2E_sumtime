'use client';

import { COLOR_LIST, COLOR_LIST_LENGTH } from '../constants';

let currentColorIndex = 0;
const colorMatchMap = new Map<unknown, unknown>();

const getColor = (id: unknown) => {
  if (colorMatchMap.has(id)) {
    return colorMatchMap.get(id);
  }

  currentColorIndex %= COLOR_LIST_LENGTH;
  currentColorIndex += 1;
  const color = COLOR_LIST[currentColorIndex];
  colorMatchMap.set(id, color);
  return color;
};

export { getColor };
