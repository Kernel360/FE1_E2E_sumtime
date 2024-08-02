'use client';

import { COLOR_LIST, COLOR_LIST_LENGTH } from '../constants';

let currentColorIndex = 0;
const colorMatchMap = new Map<unknown, unknown>();

const getColor = (id: unknown) => {
  if (colorMatchMap.has(id)) {
    return colorMatchMap.get(id);
  }

  const color = COLOR_LIST[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % COLOR_LIST_LENGTH;
  colorMatchMap.set(id, color);
  return color;
};

export { getColor };
