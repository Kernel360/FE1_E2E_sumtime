import React from 'react';
import useColorPickerFloating from './useColorPickerFloating';
import ColorPicker from '../ColorPicker';
import * as S from './ColorPickerBox.styled';

interface ColorPickerInputProps {
  [key: string]: any; // 나머지 props를 모두 받을 수 있도록 설정
  color: string;
  setColor: (newColor: string) => void;
}

function ColorPickerInput({ color, setColor, ...rest }: ColorPickerInputProps) {
  const { refs, floatingStyles, isOpen, getReferenceProps, getFloatingProps } = useColorPickerFloating();

  return (
    <>
      <S.ColorPickerInputLayout
        {...rest} // 나머지 props를 한꺼번에 전달
        id="color-input"
        ref={refs.setReference}
        {...getReferenceProps()}
        $backgroundColor={color}
      />
      {isOpen && (
        <ColorPicker color={color} setColor={setColor} ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} />
      )}
    </>
  );
}

export default ColorPickerInput;
