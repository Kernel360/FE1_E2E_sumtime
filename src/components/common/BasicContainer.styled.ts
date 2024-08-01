// 'use client';

import styled from '@emotion/styled';
import { Flex } from './Flex.styled';

const BasicContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  max-width: 1280px;
  //min-width: 800px;
  height: 100vh;
  //border: 5px solid green; //영역 확인용 주석 남겨둠
  margin: 0 auto; /* 가운데 정렬 */
`;

export { BasicContainer };
