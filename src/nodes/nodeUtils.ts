import {  type ReactNode } from 'react';
import type { HandleConfig, NodeContentConfig } from './baseNode';
import { Position } from '@xyflow/react';

// Utility function to create handle configurations
export const createHandle = (
  id: string,
  type: 'source' | 'target',
  position: Position,
  className?: string,
  style?: React.CSSProperties
): HandleConfig => ({
  id,
  type,
  position,
  className,
  style,
});

// Utility function to create content configurations
export const createContent = (
  title: string,
  description?: string,
  children?: ReactNode,
  className?: string
): NodeContentConfig => ({
  title,
  description,
  children,
  className,
});

// Common handle configurations
export const CommonHandles = {
  // Input handles
  leftInput: (id: string, className?: string) => 
    createHandle(`${id}-input`, 'target', Position.Left, className),
  
  // Output handles  
  rightOutput: (id: string, className?: string) => 
    createHandle(`${id}-output`, 'source', Position.Right, className),
  
  // Multiple input handles for LLM nodes
  leftSystemInput: (id: string) => 
    createHandle(`${id}-system`, 'target', Position.Left, 'top-1/3'),
  
  leftPromptInput: (id: string) => 
    createHandle(`${id}-prompt`, 'target', Position.Left, 'top-2/3'),
  
  // Value-based handles
  valueInput: (id: string) => 
    createHandle(`${id}-value`, 'target', Position.Left),
  
  valueOutput: (id: string) => 
    createHandle(`${id}-value`, 'source', Position.Right),
  
  responseOutput: (id: string) => 
    createHandle(`${id}-response`, 'source', Position.Right),
};
