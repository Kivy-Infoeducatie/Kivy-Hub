import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <span className='text-2xl font-bold'>{count}</span>
      <div className='flex gap-2'>
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className='rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600'
        >
          -
        </button>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className='rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
        >
          +
        </button>
      </div>
    </div>
  );
}
