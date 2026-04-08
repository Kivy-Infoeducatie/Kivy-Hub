import { useRef } from 'react';

function useHold(duration = 500, onHold: () => void) {
  const timer = useRef<NodeJS.Timeout>();
  const start = () => (timer.current = setTimeout(onHold, duration));
  const stop = () => clearTimeout(timer.current);
  return { onMouseDown: start, onMouseUp: stop, onMouseLeave: stop };
}

export default useHold;
