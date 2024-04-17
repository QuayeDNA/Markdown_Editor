import React, { useRef, useEffect, ReactNode } from 'react';

interface SyncScrollProps {
  children: ReactNode[];
}

const SyncScroll: React.FC<SyncScrollProps> = ({ children }) => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = (index: number) => {
      const otherIndex = (index + 1) % 2;
      const currentElement = elementsRef.current[index];
      const otherElement = elementsRef.current[otherIndex];

      if (currentElement && otherElement) {
        const scrollRatio = currentElement.scrollTop / (currentElement.scrollHeight - currentElement.clientHeight);
        otherElement.scrollTop = scrollRatio * (otherElement.scrollHeight - otherElement.clientHeight);
      }
    };

    const elements = [...elementsRef.current];

    elements[0]?.addEventListener('scroll', () => handleScroll(0));
    elements[1]?.addEventListener('scroll', () => handleScroll(1));

    return () => {
      elements[0]?.removeEventListener('scroll', () => handleScroll(0));
      elements[1]?.removeEventListener('scroll', () => handleScroll(1));
    };
  }, []);

  return React.Children.map(children, (child, index) => (
    <div ref={el => elementsRef.current[index] = el} style={{ overflow: 'auto', height: '100%' }}>
      {child}
    </div>
  ));
};

export default SyncScroll;