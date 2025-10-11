'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Move, Maximize2, RotateCw, Copy } from 'lucide-react';

interface IllustrationTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface DraggableIllustrationProps {
  children: React.ReactNode;
  initialTransform?: IllustrationTransform;
  onTransformChange?: (transform: IllustrationTransform) => void;
  containerBounds?: { width: number; height: number };
  isDraggable?: boolean;
  onCopySettings?: (transform: IllustrationTransform) => void;
  baseSize?: number; // Base size of the illustration for dimension calculation
}

export const DraggableIllustration: React.FC<DraggableIllustrationProps> = ({
  children,
  initialTransform = { x: 10, y: 10, scale: 1, rotation: 0 },
  onTransformChange,
  containerBounds = { width: 400, height: 300 },
  isDraggable = true,
  onCopySettings,
  baseSize = 120
}) => {
  const [transform, setTransform] = useState<IllustrationTransform>(initialTransform);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const isExternalUpdateRef = useRef(false);
  const onTransformChangeRef = useRef(onTransformChange);

  // Keep the callback ref up to date
  useEffect(() => {
    onTransformChangeRef.current = onTransformChange;
  }, [onTransformChange]);

  // Update internal transform state when initialTransform prop changes
  useEffect(() => {
    if (initialTransform) {
      // Only update if values actually changed
      setTransform(prev => {
        if (
          prev.x !== initialTransform.x ||
          prev.y !== initialTransform.y ||
          prev.scale !== initialTransform.scale ||
          prev.rotation !== initialTransform.rotation
        ) {
          isExternalUpdateRef.current = true;
          return initialTransform;
        }
        return prev;
      });
    }
  }, [initialTransform?.x, initialTransform?.y, initialTransform?.scale, initialTransform?.rotation]);

  // Notify parent of transform changes (only for internal updates)
  useEffect(() => {
    if (isExternalUpdateRef.current) {
      isExternalUpdateRef.current = false;
      return;
    }
    onTransformChangeRef.current?.(transform);
  }, [transform.x, transform.y, transform.scale, transform.rotation]);

  const updateTransform = useCallback((newTransform: Partial<IllustrationTransform>) => {
    setTransform(prev => ({ ...prev, ...newTransform }));
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (!isDraggable || isResizing || isRotating) return;

    event.preventDefault();
    setIsDragging(true);

    const startX = event.clientX;
    const startY = event.clientY;
    const startTransform = transform;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const newX = startTransform.x + deltaX;
      const newY = startTransform.y + deltaY;

      // No bounds restriction - allow free positioning
      updateTransform({
        x: newX,
        y: newY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [transform, isDraggable, isResizing, isRotating, containerBounds, updateTransform]);

  const handleResize = useCallback((event: React.MouseEvent) => {
    if (!isDraggable) return;

    event.preventDefault();
    event.stopPropagation();
    setIsResizing(true);

    const startMouseX = event.clientX;
    const startMouseY = event.clientY;
    const startScale = transform.scale;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startMouseX;
      const deltaY = e.clientY - startMouseY;

      // Calculate scale change based on diagonal movement
      const delta = (deltaX + deltaY) / 200;
      const newScale = Math.max(0.3, Math.min(6, startScale + delta));

      updateTransform({ scale: newScale });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [transform, isDraggable, updateTransform]);

  const handleRotate = useCallback((event: React.MouseEvent) => {
    if (!isDraggable) return;

    event.preventDefault();
    event.stopPropagation();
    setIsRotating(true);

    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const startAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    const startRotation = transform.rotation;

    const handleMouseMove = (e: MouseEvent) => {
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const deltaAngle = currentAngle - startAngle;
      const newRotation = startRotation + (deltaAngle * 180) / Math.PI;

      updateTransform({ rotation: newRotation });
    };

    const handleMouseUp = () => {
      setIsRotating(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [transform, isDraggable, updateTransform]);

  // Use native wheel event listener with passive: false to allow preventDefault
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isDraggable) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.shiftKey) {
        // Shift + wheel = rotation
        const rotationDelta = event.deltaY > 0 ? 5 : -5;
        setTransform(prev => ({ ...prev, rotation: prev.rotation + rotationDelta }));
      } else {
        // Normal wheel = scale
        const scaleDelta = event.deltaY > 0 ? -0.1 : 0.1;
        setTransform(prev => {
          const newScale = Math.max(0.1, Math.min(6, prev.scale + scaleDelta));
          return { ...prev, scale: newScale };
        });
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [isDraggable]);

  const handleCopySettings = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onCopySettings?.(transform);
  }, [transform, onCopySettings]);

  // When not draggable, still apply transforms but without interaction
  // Convert scale to actual dimensions for print compatibility
  if (!isDraggable) {
    const scaledSize = baseSize * transform.scale;

    const styleObj = {
      left: `${transform.x}px`,
      top: `${transform.y}px`,
      width: `${scaledSize}px`,
      height: `${scaledSize}px`,
      transform: `rotate(${transform.rotation}deg)`,
      transformOrigin: 'center center' as const,
      zIndex: 10,
      pointerEvents: 'none' as const
    };
    console.log('🔒 Rendering locked illustration with dimensions:', styleObj);
    return (
      <div
        className="absolute locked-illustration"
        style={styleObj}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className="absolute"
      style={{
        left: `${transform.x}px`,
        top: `${transform.y}px`,
        transform: `scale(${transform.scale}) rotate(${transform.rotation}deg)`,
        transformOrigin: 'center center',
        zIndex: isHovered || isDragging || isResizing || isRotating ? 50 : 10,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: 'none',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main illustration content */}
      <div className="relative">
        {children}

        {/* Control handles - only show on hover or when interacting */}
        {(isHovered || isDragging || isResizing || isRotating) && (
          <div className="no-print">
            {/* Resize handle - bottom right corner */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white rounded-sm cursor-se-resize shadow-lg hover:bg-blue-600 flex items-center justify-center z-20"
              onMouseDown={handleResize}
              title="Redimensionner"
            >
              <Maximize2 size={10} className="text-white" />
            </div>

            {/* Rotation handle - top left corner */}
            <div
              className="absolute -top-1 -left-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full cursor-grab shadow-lg hover:bg-green-600 flex items-center justify-center z-20"
              onMouseDown={handleRotate}
              title="Faire pivoter"
            >
              <RotateCw size={10} className="text-white" />
            </div>

            {/* Copy settings handle - top right corner */}
            {onCopySettings && (
              <div
                className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 border-2 border-white rounded-full cursor-pointer shadow-lg hover:bg-purple-600 flex items-center justify-center z-20"
                onMouseDown={handleCopySettings}
                title="Copier les paramètres"
              >
                <Copy size={10} className="text-white" />
              </div>
            )}

            {/* Move indicator - center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Move size={16} className="text-blue-500 opacity-50" />
            </div>

            {/* Visual outline */}
            <div className="absolute inset-0 border-2 border-blue-400 border-dashed rounded-lg pointer-events-none opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableIllustration;