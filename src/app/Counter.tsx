'use client';

import { useRef } from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks';
import { increment, decrement, initializeCount } from '../lib/features/counter/counterSlice';

export default function Counter() {
  // Initialize the store with an initial count value if needed
  const store = useAppStore();
  const initialized = useRef(false);

  if (!initialized.current) {
    store.dispatch(initializeCount(10)); // 초기 값을 설정합니다.
    initialized.current = true;
  }

  // counterSlice의 value 값을 가져옵니다.
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button type="button" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button type="button" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
}
