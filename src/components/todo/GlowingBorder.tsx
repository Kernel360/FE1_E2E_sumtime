import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;
const customRotate = keyframes`
  0% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
  }
 
  25% {
    transform: rotate(90deg);
    animation-timing-function: ease-in;
  } 
    50% {
    transform: rotate(180deg);
        animation-timing-function: ease-out;

    }
    75% {   
    transform: rotate(270deg);
    animation-timing-function: ease-in;
  }
 
  100% {
    transform: rotate(360deg);
    animation-timing-function: ease-out;
  }
`;

const Card = styled.div`
  z-index: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background: #ffffff;
  border-radius: 8px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: calc(50% - 25px);
    width: 50px;
    height: 300px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(223, 102, 102, 0.75) 50%, rgba(255, 255, 255, 0) 100%);
    transform-origin: top center;
    transform: translate(-50%, -50%);
    animation: ${customRotate} 3s linear infinite;
  }
`;

function GlowingBorder({ children }: { children: React.ReactNode }) {
  return <Card>{children}</Card>;
}

export default GlowingBorder;
