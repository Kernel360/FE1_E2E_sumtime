import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Container } from '../Container.styled';

//  애니메이션 정의
const loading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// TodoSkeletonComponent 컴포넌트에 애니메이션 적용
export const RectangleSkeleton = styled(Container)`
  margin: 10px;
  height: 3rem;
  background-color: #dfdfdf;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
    animation: ${loading} 2.5s infinite;
  }
`;

function Rectangle() {
  return <RectangleSkeleton />;
}

export default Rectangle;
