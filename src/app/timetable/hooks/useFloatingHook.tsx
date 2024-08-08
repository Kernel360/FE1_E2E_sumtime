/* eslint-disable consistent-return */
import { useFloating, offset, useDismiss, useInteractions, useHover } from '@floating-ui/react';
import { useEffect, useState, useCallback } from 'react';

function useFloatingInReference() {
  const [isFloatingTargetVisible, setIsFloatingTargetVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [
      offset(
        ({ rects }) => {
          if (clickPosition) {
            const { x, y } = clickPosition;
            const { height } = rects.reference;
            const referenceClientRect = refs.reference.current?.getBoundingClientRect();
            const refY: number = referenceClientRect?.y ?? 0;
            const refX: number = referenceClientRect?.x ?? 0;

            return {
              mainAxis: y - height - refY + 10,
              crossAxis: x - refX + 10,
            };
          }

          const { x, y } = mousePosition;
          const { height } = rects.reference;
          const referenceClientRect = refs.reference.current?.getBoundingClientRect();
          const refY: number = referenceClientRect?.y ?? 0;
          const refX: number = referenceClientRect?.x ?? 0;

          return {
            mainAxis: y - height - refY + 10,
            crossAxis: x - refX + 10,
          };
        },
        [mousePosition.x, mousePosition.y],
      ),
    ],
    open: isFloatingTargetVisible,
    onOpenChange: setIsFloatingTargetVisible,
  });

  const dismiss = useDismiss(context, { outsidePress: true });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, hover]);

  const fixFloatingTargetPosition = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    const refElement = refs.reference?.current as HTMLElement | null;

    if (!refElement) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      setMousePosition({ x: clientX + 10, y: clientY + 10 });
    };

    if (refElement) {
      refElement.addEventListener('mousemove', handleMouseMove)!;

      return () => {
        refElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    fixFloatingTargetPosition,
    isFloatingTargetVisible,
  };
}

export { useFloatingInReference };
