/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

interface TextProps {
  $position?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $display?: string;
  $width?: string;
  $height?: string;
  $lineHeight?: string;
  $fontSize?: string;
  $fontWeight?: string;
  $color?: string;
  $decorationLine?: string;
  theme?: {
    fontSize: {
      s: string;
    };
    fontWeight: {
      bold: string;
    };
    color: {
      fontColor: string;
    };
  };
}

const Text = styled.span<TextProps>`
  position: ${(props) => (props?.$position ? props.$position : 'relative')};
  top: ${(props) => (props?.$top ? props.$top : 'auto')};
  bottom: ${(props) => (props?.$bottom ? props.$bottom : 'auto')};
  left: ${(props) => (props?.$left ? props.$left : 'auto')};
  right: ${(props) => (props?.$right ? props.$right : 'auto')};
  display: ${(props) => (props?.$display ? props.$display : 'block')};
  width: ${(props) => (props?.$width !== undefined ? props.$width : 'fit-content')};
  height: ${(props) => (props?.$height !== undefined ? props.$height : 'auto')};
  line-height: ${(props) => (props?.$lineHeight ? props.$lineHeight : '100%')};
  font-size: ${(props) => (props?.$fontSize ? props.$fontSize : props.theme?.fontSize.s)};
  font-weight: ${(props) => (props?.$fontWeight ? props.$fontWeight : props.theme?.fontWeight.bold)};
  color: ${(props) => (props?.$color ? props.$color : props.theme?.color.fontColor)};
  text-decoration-line: ${(props) => (props?.$decorationLine ? props.$decorationLine : 'none')};
`;

export { Text };
