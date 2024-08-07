import { useFloating, offset, useDismiss, useInteractions } from '@floating-ui/react';
import { useState } from 'react';

function useFloatingHook() {
  const [isFloatingTargetVisible, setIsTooltipVisible] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [
      offset(
        ({ rects }) => {
          const { x, y } = clickPosition;
          const { height, y: refY, x: refX } = rects.reference;

          return {
            mainAxis: y - height - refY,
            crossAxis: x - refX,
          };
        },
        [clickPosition.x, clickPosition.y],
      ),
    ],
    open: isFloatingTargetVisible,
    onOpenChange: setIsTooltipVisible,
  });

  const dismiss = useDismiss(context, { outsidePress: true });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const onFloating = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
    setIsTooltipVisible(true);
  };

  return { refs, floatingStyles, getReferenceProps, getFloatingProps, onFloating, isFloatingTargetVisible };
}

export { useFloatingHook };
