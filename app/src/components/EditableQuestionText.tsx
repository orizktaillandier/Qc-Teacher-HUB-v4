'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Move,
  Edit3,
  Check,
  X,
  RotateCcw,
  Maximize2,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Copy,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EditableQuestionTextProps {
  text: string
  onTextChange: (text: string) => void
  fontSettings: {
    fontFamily: string
    fontSize: number
    fontWeight: number
    isBold: boolean
    isItalic: boolean
    isUnderline: boolean
    textAlign: 'left' | 'center' | 'right'
    textBackground: number
  }
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  containerBounds?: { width: number; height: number }
  onPositionChange?: (position: { x: number; y: number; width: number; height: number }) => void
  isEditMode?: boolean
  onEditModeChange?: (isEditing: boolean) => void
  cardIndex?: number
  className?: string
  onBulkAction?: (action: 'position' | 'size', sourceCardIndex: number) => void
}

export function EditableQuestionText({
  text,
  onTextChange,
  fontSettings,
  initialPosition = { x: 20, y: 20 },
  initialSize = { width: 300, height: 100 },
  containerBounds = { width: 520, height: 350 },
  onPositionChange,
  isEditMode = false,
  onEditModeChange,
  cardIndex = 0,
  className,
  onBulkAction
}: EditableQuestionTextProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(text)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 })
  const [showControls, setShowControls] = useState(false)

  const textRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update edited text when prop changes
  useEffect(() => {
    setEditedText(text)
  }, [text])

  // Update position and size when props change (for bulk actions)
  useEffect(() => {
    if (initialPosition && (
      position.x !== initialPosition.x ||
      position.y !== initialPosition.y
    )) {
      setPosition(initialPosition)
    }
  }, [initialPosition?.x, initialPosition?.y])

  useEffect(() => {
    if (initialSize && (
      size.width !== initialSize.width ||
      size.height !== initialSize.height
    )) {
      setSize(initialSize)
    }
  }, [initialSize?.width, initialSize?.height])

  // Mouse move handler for dragging and resizing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y
      const newX = Math.max(0, Math.min(containerBounds.width - size.width, position.x + deltaX))
      const newY = Math.max(0, Math.min(containerBounds.height - size.height, position.y + deltaY))

      setPosition({ x: newX, y: newY })
      setDragStart({ x: e.clientX, y: e.clientY })
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      const newWidth = Math.max(150, Math.min(containerBounds.width - position.x, resizeStart.width + deltaX))
      const newHeight = Math.max(50, Math.min(containerBounds.height - position.y, resizeStart.height + deltaY))

      setSize({ width: newWidth, height: newHeight })
    }
  }, [isDragging, isResizing, dragStart, position, size, resizeStart, containerBounds])

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    if (isDragging || isResizing) {
      setIsDragging(false)
      setIsResizing(false)
      onPositionChange?.({ x: position.x, y: position.y, width: size.width, height: size.height })
    }
  }, [isDragging, isResizing, position, size, onPositionChange])

  // Set up mouse event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    if (!isEditMode || isEditing) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent) => {
    if (!isEditMode) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY
    })
  }

  // Edit handlers
  const startEditing = () => {
    setIsEditing(true)
    onEditModeChange?.(true)
    setTimeout(() => {
      textRef.current?.focus()
    }, 100)
  }

  const saveEdit = () => {
    setIsEditing(false)
    onEditModeChange?.(false)
    onTextChange(editedText)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    onEditModeChange?.(false)
    setEditedText(text)
  }

  const resetPosition = () => {
    setPosition(initialPosition)
    setSize(initialSize)
    onPositionChange?.({ x: initialPosition.x, y: initialPosition.y, width: initialSize.width, height: initialSize.height })
  }

  // Determine text alignment classes
  const getTextAlignClass = () => {
    switch (fontSettings.textAlign) {
      case 'left': return 'text-left'
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute group",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isEditing ? 1000 : (isDragging || isResizing ? 999 : 100),
      }}
      onMouseEnter={() => isEditMode && setShowControls(true)}
      onMouseLeave={() => !isEditing && !isDragging && !isResizing && setShowControls(false)}
    >
      {/* Control Panel */}
      <AnimatePresence>
        {isEditMode && showControls && !isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 left-0 flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-1 z-50"
          >
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={startEditing}
              title="Edit text"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={resetPosition}
              title="Reset position"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <div className="w-px bg-gray-200 dark:bg-gray-600 my-1" />
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onBulkAction?.('position', cardIndex)}
              title="Copy position to all other cards"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onBulkAction?.('size', cardIndex)}
              title="Copy size to all other cards"
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
            <div className="w-px bg-gray-200 dark:bg-gray-600 my-1" />
            <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 flex items-center">
              <Type className="h-3 w-3 mr-1" />
              {Math.round(size.width)}×{Math.round(size.height)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Controls */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 left-0 flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-1 z-50"
          >
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              onClick={saveEdit}
              title="Save changes"
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              onClick={cancelEdit}
              title="Cancel"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag Handle */}
      {isEditMode && showControls && !isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-6 left-0 right-0 h-4 bg-blue-500 rounded-t opacity-75 hover:opacity-100 transition-opacity cursor-move flex items-center justify-center"
          onMouseDown={handleDragStart}
        >
          <Move className="h-3 w-3 text-white" />
        </motion.div>
      )}

      {/* Main Text Container */}
      <div
        ref={textRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
        className={cn(
          "w-full h-full p-3 rounded-lg outline-none overflow-auto resize-none",
          getTextAlignClass(),
          isEditing
            ? "ring-2 ring-blue-400 shadow-lg cursor-text"
            : isEditMode
            ? "hover:shadow-md transition-all duration-200 cursor-move border-2 border-transparent hover:border-blue-200"
            : "cursor-default",
          isDragging && "cursor-grabbing shadow-lg",
          isResizing && "cursor-se-resize"
        )}
        style={{
          fontFamily: fontSettings.fontFamily,
          fontSize: `${fontSettings.fontSize}px`,
          fontWeight: fontSettings.fontWeight,
          fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
          textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
          lineHeight: 1.4,
          userSelect: isEditing ? 'text' : 'none',
          WebkitUserSelect: isEditing ? 'text' : 'none',
          color: '#1f2937',
          backgroundColor: isEditMode ? `rgba(255, 255, 255, ${fontSettings.textBackground / 100})` : 'transparent',
        }}
        onInput={(e) => {
          if (isEditing) {
            setEditedText(e.currentTarget.textContent || '')
          }
        }}
        onMouseDown={!isEditing ? handleDragStart : undefined}
        onKeyDown={(e) => {
          if (isEditing && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            saveEdit()
          } else if (isEditing && e.key === 'Escape') {
            cancelEdit()
          }
        }}
      >
        {isEditing ? editedText : text}
      </div>

      {/* Resize Handle */}
      {isEditMode && showControls && !isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-tl opacity-75 hover:opacity-100 transition-opacity cursor-se-resize flex items-center justify-center"
          onMouseDown={handleResizeStart}
        >
          <Maximize2 className="h-2 w-2 text-white" />
        </motion.div>
      )}

      {/* Size Indicator */}
      {(isDragging || isResizing) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-0 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg"
        >
          {Math.round(position.x)}, {Math.round(position.y)} • {Math.round(size.width)}×{Math.round(size.height)}
        </motion.div>
      )}
    </div>
  )
}