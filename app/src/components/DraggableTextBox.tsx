import React, { useState, useRef, useEffect } from 'react';

interface DraggableTextBoxProps {
  text: string;
  onChange: (text: string) => void;
  fontSettings: {
    fontFamily: string;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
  };
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isDraggable?: boolean;
}

export function DraggableTextBox({
  text,
  onChange,
  fontSettings,
  initialPosition = { x: 10, y: 10 },
  initialSize = { width: 200, height: 60 },
  isDraggable = true
}: DraggableTextBoxProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && isDraggable) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, position.x + deltaX)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, position.y + deltaY))
        });
        setDragStart({ x: e.clientX, y: e.clientY });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        setSize({
          width: Math.max(100, resizeStart.width + deltaX),
          height: Math.max(40, resizeStart.height + deltaY)
        });
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
  }, [isDragging, isResizing, dragStart, position, size, resizeStart, isDraggable]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!isDraggable || isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleTextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTextBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    const newText = e.currentTarget.textContent || '';
    onChange(newText);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isEditing ? 1000 : 100,
        pointerEvents: isDraggable ? 'auto' : 'none',
      }}
      className={`group ${isDragging ? 'cursor-move' : ''}`}
    >
      {/* Drag handle bar at top */}
      {isDraggable && !isEditing && (
        <div
          className="absolute -top-6 left-0 right-0 h-5 bg-blue-500 rounded-t opacity-0 group-hover:opacity-100 transition-opacity cursor-move flex items-center justify-center"
          onMouseDown={handleDragStart}
        >
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      {/* Text container */}
      <div
        ref={textRef}
        contentEditable={true}
        suppressContentEditableWarning
        onClick={handleTextClick}
        onBlur={handleTextBlur}
        className={`
          w-full h-full p-2 rounded
          ${isEditing ? 'ring-2 ring-blue-400 bg-white' : 'bg-white/90'}
          ${!isEditing && isDraggable ? 'hover:ring-2 hover:ring-blue-300' : ''}
          outline-none overflow-auto
          ${!isEditing && isDraggable ? 'cursor-move' : 'cursor-text'}
        `}
        style={{
          fontFamily: fontSettings.fontFamily,
          fontSize: `${fontSettings.fontSize}px`,
          fontWeight: fontSettings.isBold ? 'bold' : 'normal',
          fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
          lineHeight: 1.4,
          cursor: isEditing ? 'text' : (isDraggable ? 'move' : 'text'),
          userSelect: isEditing ? 'text' : 'none',
        }}
        onMouseDown={(e) => {
          if (!isEditing && isDraggable) {
            handleDragStart(e);
          }
        }}
      >
        {text}
      </div>

      {/* Resize handle */}
      {isDraggable && !isEditing && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13 7L17 7L17 17L7 17L7 13L13 13L13 7Z" opacity="0.3" />
            <path d="M15 9L17 9L17 17L9 17L9 15L15 15L15 9Z" />
          </svg>
        </div>
      )}

      {/* Size indicator */}
      {isDraggable && (isDragging || isResizing) && (
        <div className="absolute -bottom-6 left-0 text-xs bg-gray-800 text-white px-2 py-1 rounded">
          {Math.round(size.width)} × {Math.round(size.height)}
        </div>
      )}
    </div>
  );
}