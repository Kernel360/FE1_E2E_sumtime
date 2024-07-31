/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

interface InputProps {
  $position?: string;
  $width?: string;
  $height?: string;
  $border?: string;
  $outline?: string;
  $appearance?: string;
  $letterSpacing?: string;
  $fontSize?: string;
  $backgroundColor?: string;
  $color?: string;
  theme?: {
    fontSize: {
      xs: string;
    };
    color: {
      backgroundColor: string;
      fontColor: string;
    };
  };
}

const Input = styled.input<InputProps>`
  position: ${(props) => (props?.$position ? props.$position : 'relative')};
  width: ${(props) => (props?.$width ? props.$width : 'auto')};
  height: ${(props) => (props?.$height ? props.$height : 'auto')};
  border: ${(props) => (props?.$border ? props.$border : 'none')};
  outline: ${(props) => (props?.$outline ? props.$outline : 'none')};
  appearance: ${(props) => (props?.$appearance ? props.$appearance : 'none')};
  letter-spacing: ${(props) => (props?.$letterSpacing ? props.$letterSpacing : '-0.02em')};
  font-size: ${(props) => (props?.$fontSize ? props.$fontSize : props.theme?.fontSize.xs)};
  background-color: ${(props) => (props?.$backgroundColor ? props.$backgroundColor : props.theme?.color.backgroundColor)};
  color: ${(props) => (props?.$color ? props.$color : props.theme?.color.fontColor)};
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    background: transparent;
    color: transparent;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  *::-webkit-search-results-button,
  *::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

export { Input };
