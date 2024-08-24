import styled from '@emotion/styled';
import { Flex, Container } from '../common';

export const TodoSection = styled(Flex)`
  flex-direction: column;
  width: 50%;
  height: 100%;
  position: relative;
  padding: 20px;
  border-left: 2px solid whitesmoke;
`;

export const TodoComponentsSection = styled(Container)`
  height: 100%;
  overflow-y: auto; /* scrolling */
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px lightgrey;
`;

export const TodoWrapper = styled(Container)`
  margin: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
`;

interface TodoContainerProps {
  endTime: string | null;
}

export const TodoContainer = styled(Flex)<TodoContainerProps>`
  display: flex;
  z-index: 1;
  position: relative;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 100%;
  height: 44px;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: ${(props) => (props.endTime ? 'none' : '1px 1px 5px lightgrey')};
  border: ${(props) => (props.endTime ? '1px solid #e3e3e3' : 'none')};
  cursor: pointer;
`;

export const FloatingButton = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
`;

// mui TodoModal에만 쓰이는 Style
export const TodoModalStyle = {
  outline: 'none',
  position: 'absolute' as const,
  width: 400,
  top: 'calc(50% - (530px/2))',
  left: 'calc(50% - (400px/2))',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 3.7,
};
