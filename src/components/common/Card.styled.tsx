import styled from '@emotion/styled';

interface CardProps {
  $position?: string;
  $width?: string;
  $height?: string;
  $border?: string;
  $radius?: string;
  $backgroundColor?: string;
  $color?: string;
  $textAlign?: string;
  theme?: {
    color: {
      fontColor: string;
    };
  };
}

const Card = styled.div<CardProps>`
  position: ${(props) => props.$position || 'relative'};
  width: ${(props) => props.$width || 'auto'};
  height: ${(props) => props.$height || 'auto'};
  border: ${(props) => props.$border || 'none'};
  border-radius: ${(props) => props.$radius || '0px'};
  background-color: ${(props) => props.$backgroundColor || 'transparent'};
  color: ${(props) => props.$color || props.theme?.color};
  text-align: ${(props) => props.$textAlign || 'start'};
`;

export { Card };
