import { forwardRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { getLocalItem, setLocalItem } from '@/utils';
import * as CommonStyle from '@/components/common';
import * as ColorPickerStyle from './ColorPicker.styled';
import { DEFAULT_COLOR_PALETTE } from './constants';

const S = { ...CommonStyle, ...ColorPickerStyle };

interface ColorPickerProps extends React.ComponentPropsWithRef<'div'> {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  showPalette?: boolean;
}

function ColorPicker(props: ColorPickerProps, ref: React.Ref<HTMLDivElement>) {
  const { color, setColor, showPalette = false, ...otherProps } = props;
  const [localColorPalette, setLocalColorPalette] = useState<string[]>(getLocalItem<string[]>('colorPalette') ?? []);
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
    setLocalItem('colorPalette', [...updatedLocalColorPalette]);
    setColorPalette([...updatedLocalColorPalette, ...DEFAULT_COLOR_PALETTE].slice(0, 10));
  };

  return (
    <S.ColorPickerLayout {...otherProps} ref={ref}>
      <HexColorPicker color={color} onChange={setColor} />
      {showPalette && (
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
      )}
    </S.ColorPickerLayout>
  );
}

export default forwardRef(ColorPicker);
