/* eslint-disable consistent-return */
import { useFloating, offset, useDismiss, useInteractions, useHover } from '@floating-ui/react';
import { useEffect, useState, useCallback } from 'react';

function useFloatingInReference() {
  const [isFloatingTargetVisible, setIsTooltipVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [
      offset(
        ({ rects }) => {
          const { x, y } = clickPosition;
          const { height } = rects.reference;
          const referenceClientRect = refs.reference.current?.getBoundingClientRect();
          const refY: number = referenceClientRect?.y ?? 0;
          const refX: number = referenceClientRect?.x ?? 0;

          return {
            mainAxis: y - height - refY,
            crossAxis: x - refX,
          };
        },
        [clickPosition.x, clickPosition.y],
      ),
    ],
    open: isFloatingTargetVisible,
    onOpenChange(open, event, reason) {
      console.log('isClickedin onOpenChange', isClicked);

      if (isClicked && reason === 'hover') {
        return;
      }

      setIsTooltipVisible(open);
    },
  });

  const dismiss = useDismiss(context, { outsidePress: true });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, hover]);

  const onFloating = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
    setIsTooltipVisible(true);
    setIsClicked(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;

    if (!isClicked) {
      console.log('isClicked', isClicked);

      setIsTooltipVisible(true);
      setClickPosition({ x: clientX + 10, y: clientY + 10 });
    }
  };

  useEffect(() => {
    const refElement = refs.reference?.current as HTMLElement | null;

    if (!refElement) {
      return;
    }

    if (refElement) {
      refElement.addEventListener('mousemove', handleMouseMove)!;

      return () => {
        refElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return { refs, floatingStyles, getReferenceProps, getFloatingProps, onFloating, isFloatingTargetVisible };
}

export { useFloatingInReference };
