'use client';

import React from 'react';
import Todo from '@/components/todo';
import { BasicContainer } from '@/components/common';


export default function mainTestPage() {
  return (
    <BasicContainer>
      <div>타임테이블 영역</div>
      <Todo />
    </BasicContainer>
  );
}
