import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  return dimensions;
}
export default useWindowDimensions;
