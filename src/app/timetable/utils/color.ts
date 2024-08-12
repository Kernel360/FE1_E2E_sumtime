'use client';

import randomColors from 'randomcolor';
import { Task, TaskThemeType } from '../components/Timetable.type';

const getRandomColor = (task: Task, theme?: TaskThemeType) => {
  const { id, seed: taskSeed } = task;
  const seed = taskSeed ?? id;

  return randomColors({ seed, hue: theme });
};

export { getRandomColor };
