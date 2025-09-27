import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface DraggableQuestionTextProps {
  children: ReactNode;
  cardNumber: number;
  isDraggable?: boolean;
  onPositionChange?: (cardNumber: number, position: { x: number; y: number; width: number; height: number }) => void;
  initialPosition?: { x: number; y: number; width: number; height: number };
}

export function DraggableQuestionText({
  children,
  cardNumber,
  isDraggable = false,
  onPositionChange,
  initialPosition
}: DraggableQuestionTextProps) {
  const [position, setPosition] = useState(initialPosition?.x && initialPosition?.y
    ? { x: initialPosition.x, y: initialPosition.y }
    : { x: 0, y: 0 });
  const [size, setSize] = useState(initialPosition?.width && initialPosition?.height
    ? { width: initialPosition.width, height: initialPosition.height }
    : { width: 'auto', height: 'auto' });
  const [initialSize, setInitialSize] = useState<{ width: number; height: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && isDraggable) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        const newPosition = {
          x: position.x + deltaX,
          y: position.y + deltaY
        };
        setPosition(newPosition);
        setDragStart({ x: e.clientX, y: e.clientY });

        if (onPositionChange && typeof size.width === 'number' && typeof size.height === 'number') {
          onPositionChange(cardNumber, { ...newPosition, width: size.width, height: size.height });
        }
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newSize = {
          width: Math.max(100, resizeStart.width + deltaX),
          height: Math.max(30, resizeStart.height + deltaY)
        };
        setSize(newSize);

        if (onPositionChange) {
          onPositionChange(cardNumber, { ...position, ...newSize });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, position, size, resizeStart, isDraggable, cardNumber, onPositionChange]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });

    // Initialize size if it's still auto
    if (size.width === 'auto' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
      setResizeStart({ width: rect.width, height: rect.height, x: 0, y: 0 });
      if (!initialSize) {
        setInitialSize({ width: rect.width, height: rect.height });
      }
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    // Initialize size if it's still auto
    if (size.width === 'auto' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
      setResizeStart({ width: rect.width, height: rect.height, x: e.clientX, y: e.clientY });
      if (!initialSize) {
        setInitialSize({ width: rect.width, height: rect.height });
      }
    } else {
      setResizeStart({
        width: typeof size.width === 'number' ? size.width : 200,
        height: typeof size.height === 'number' ? size.height : 60,
        x: e.clientX,
        y: e.clientY
      });
      if (!initialSize && typeof size.width === 'number' && typeof size.height === 'number') {
        setInitialSize({ width: size.width, height: size.height });
      }
    }
  };

  if (!isDraggable) {
    // If not draggable, just render children normally
    return <>{children}</>;
  }

  // Calculate scale factor based on current size vs initial size
  const scaleFactor = initialSize && typeof size.width === 'number'
    ? Math.min(size.width / initialSize.width, size.height / initialSize.height)
    : 1;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: size.width,
        height: size.height,
        display: 'inline-block'
      }}
      className={`group ${isDragging ? 'cursor-move' : ''}`}
    >
      {/* Drag handle bar at top */}
      <div
        className="absolute -top-5 left-0 right-0 h-4 bg-blue-500 rounded-t opacity-0 group-hover:opacity-100 transition-opacity cursor-move flex items-center justify-center"
        onMouseDown={handleDragStart}
        style={{ zIndex: 1000 }}
      >
        <div className="flex gap-0.5">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Content with scaling */}
      <div style={{
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'top left',
        width: initialSize ? `${initialSize.width}px` : 'auto',
        height: initialSize ? `${initialSize.height}px` : 'auto'
      }}>
        {children}
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"
        onMouseDown={handleResizeStart}
        style={{ zIndex: 1000 }}
      >
        <svg
          className="w-3 h-3 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M15 9L17 9L17 17L9 17L9 15L15 15L15 9Z" />
        </svg>
      </div>

      {/* Size indicator */}
      {(isDragging || isResizing) && typeof size.width === 'number' && typeof size.height === 'number' && (
        <div className="absolute -bottom-6 left-0 text-xs bg-gray-800 text-white px-2 py-0.5 rounded z-50">
          {Math.round(size.width)} × {Math.round(size.height)}
        </div>
      )}
    </div>
  );
}