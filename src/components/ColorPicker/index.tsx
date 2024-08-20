import { forwardRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { getLocalItem, setLocalItem } from '@/utils';
import * as CommonStyle from '@/components/common';
import * as ColorPickerStyle from './ColorPicker.styled';
import { DEFAULT_COLOR_PALETTE } from './constants';
import ColorPalette from './ColorPalette';

const S = { ...CommonStyle, ...ColorPickerStyle };

interface ColorPickerProps extends React.ComponentPropsWithRef<'div'> {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  showPalette?: boolean;
}

function ColorPicker(props: ColorPickerProps, ref: React.Ref<HTMLDivElement>) {
  const { color, setColor, showPalette = false, ...otherProps } = props;

  return (
    <S.ColorPickerLayout {...otherProps} ref={ref}>
      <HexColorPicker color={color} onChange={setColor} />
      {showPalette && <ColorPalette color={color} setColor={setColor} />}
    </S.ColorPickerLayout>
  );
}

export default forwardRef(ColorPicker);
