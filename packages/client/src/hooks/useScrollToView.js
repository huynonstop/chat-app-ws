import { useRef, useEffect } from 'react';

export default () => {
  const elRef = useRef(null);
  useEffect(() => {
    elRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return elRef;
};
