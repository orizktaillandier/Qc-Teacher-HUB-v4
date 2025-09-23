'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Move, Maximize2, RotateCw } from 'lucide-react';

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
}

export const DraggableIllustration: React.FC<DraggableIllustrationProps> = ({
  children,
  initialTransform = { x: 10, y: 10, scale: 1, rotation: 0 },
  onTransformChange,
  containerBounds = { width: 400, height: 300 },
  isDraggable = true
}) => {
  const [transform, setTransform] = useState<IllustrationTransform>(initialTransform);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const updateTransform = useCallback((newTransform: Partial<IllustrationTransform>) => {
    const updated = { ...transform, ...newTransform };
    setTransform(updated);
    onTransformChange?.(updated);
  }, [transform, onTransformChange]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (!isDraggable || isResizing || isRotating) return;

    event.preventDefault();
    setIsDragging(true);

    const startX = event.clientX - transform.x;
    const startY = event.clientY - transform.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;

      updateTransform({
        x: Math.max(0, Math.min(containerBounds.width - 100, newX)),
        y: Math.max(0, Math.min(containerBounds.height - 100, newY))
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
      const newScale = Math.max(0.3, Math.min(3, startScale + delta));

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

  if (!isDraggable) {
    return <div>{children}</div>;
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
        transition: isDragging || isResizing || isRotating ? 'none' : 'transform 0.1s ease-out',
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
          <>
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

            {/* Move indicator - center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Move size={16} className="text-blue-500 opacity-50" />
            </div>

            {/* Visual outline */}
            <div className="absolute inset-0 border-2 border-blue-400 border-dashed rounded-lg pointer-events-none opacity-50" />
          </>
        )}
      </div>
    </div>
  );
};

export default DraggableIllustration;