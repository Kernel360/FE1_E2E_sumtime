import { createContext } from 'react';
import { TimetableType, PopoverType } from './components/Timetable.type';

const TypeContext = createContext<TimetableType>('COLUMN');
const PopoverTypeContext = createContext<PopoverType>('Click');

export { TypeContext, PopoverTypeContext };
