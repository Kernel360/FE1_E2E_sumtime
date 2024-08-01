import styled from '@emotion/styled';
import { Flex, Container, Input, Text } from '../common';

export const TodoSection = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  width: 50%;
  height: 100%;
  border: 1px solid #000000;
  border-radius: 5px;
  position: relative;
`;

export const TodoComponentsSection = styled(Container)`
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: #e5e5e5;
  width: 90%;
  max-height: 50%;
  overflow-y: auto; /* scrolling */
  border-radius: 5px;
  border: 1px solid red;
  margin: 10px;
  padding: 10px;
  border-style: none;
  position: relative;
`;

export const ATodoComponentContainer = styled(Container)`
  margin: 10px;
  height: auto;
  background-color: whitesmoke;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  box-sizing: border-box;
`;

// export const TodoDeleteBtnContainer = styled(Flex)`
//   justify-content: flex-end;
//   //flex: 1;
//   width: 100%;
//   // border: 1px solid #000000;
//   button {
//     width: 20px;
//     height: 20px;
//   }
// `;

export const TodoContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  min-height: 30px;
  max-height: fit-content input {
    flex-grow: 1;
    background-color: none;
  }

  button {
    width: 20px;
    height: 100%;
    font-size: small;
  }

  button + button {
    margin-left: 10px; // 버튼 사이의 간격을 위한 마진
  }
`;

export const FloatingButton = styled.div`
  position: absolute;
  bottom: 400px;
  right: 50px;
  z-index: 1500;
`;
