import React, { useState } from 'react';

function useCounter(abc) {
  const [count, setCount] = useState(abc);

  const increaseCount = () => setCount((count) => count + 1);
  const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

  return [count, increaseCount, decreaseCount];
}
export default useCounter;

<button onClick="activate()">Activate</button>;
