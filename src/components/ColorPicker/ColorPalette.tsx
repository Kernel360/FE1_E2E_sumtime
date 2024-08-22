import { useState } from 'react';
import { getItemFromLocalStorage, setItemFromLocalStorage } from '@/utils';
import * as CommonStyle from '@/components/common';
import * as ColorPickerStyle from './ColorPicker.styled';
import { DEFAULT_COLOR_PALETTE } from './constants';

const S = { ...CommonStyle, ...ColorPickerStyle };

interface ColorPickerProps extends React.ComponentPropsWithRef<'div'> {
  color: string;
  setColor: (newColor: string) => void;
}

function ColorPalette({ color, setColor }: ColorPickerProps) {
  const [localColorPalette, setLocalColorPalette] = useState<string[]>(getItemFromLocalStorage<string[]>('colorPalette') ?? []);
  const [colorPalette, setColorPalette] = useState<string[]>([...localColorPalette, ...DEFAULT_COLOR_PALETTE].slice(0, 10));

  const handleSaveColor = () => {
    if (localColorPalette.includes(color)) {
      return;
    }

    if (localColorPalette.length >= 10) {
      localColorPalette.pop();
    }

    const updatedLocalColorPalette = [color, ...localColorPalette];
    setLocalColorPalette([...updatedLocalColorPalette]);
    setItemFromLocalStorage('colorPalette', [...updatedLocalColorPalette]);
    setColorPalette([...updatedLocalColorPalette, ...DEFAULT_COLOR_PALETTE].slice(0, 10));
  };

  return (
    <>
      <S.SaveBarLayout $justify="space-between" $align="center">
        <S.Text $fontSize="14px">Saved color:</S.Text>
        <S.SaveButton type="button" onClick={handleSaveColor}>
          save
        </S.SaveButton>
      </S.SaveBarLayout>
      <S.ColorPaletteLayout>
        {colorPalette.map((paletteColor) => (
          <S.PaletteColorButton
            $backgroundColor={paletteColor}
            type="button"
            key={paletteColor}
            onClick={() => {
              setColor(paletteColor);
            }}
          />
        ))}
      </S.ColorPaletteLayout>
    </>
  );
}

export default ColorPalette;
