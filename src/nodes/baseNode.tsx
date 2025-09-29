import React, { type ReactNode } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type IconType } from 'react-icons';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';

// Base configuration for handles (connection points)
export interface HandleConfig {
  id: string;
  type: 'source' | 'target';
  position: Position;
  className?: string;
  style?: React.CSSProperties;
}

// Base configuration for node content
export interface NodeContentConfig {
  title: string;
  description?: string;
  icon?: IconType;
  iconColor?: string;
  children?: ReactNode;
  className?: string;
}

// Base node data interface
export interface BaseNodeData {
  id: string;
  nodeType: string;
  [key: string]: unknown; // Allow additional properties for specific node types
}

// Props for the BaseNode component
export interface BaseNodeProps extends Partial<NodeProps> {
  id: string;
  data: BaseNodeData;
  handles?: HandleConfig[];
  content?: NodeContentConfig;
  className?: string;
  style?: React.CSSProperties;
  onDataChange?: (newData: Partial<BaseNodeData>) => void;
}

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  handles = [],
  content,
  className = "",
  style = {},
}) => {
  const { deleteNode } = useStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };
  return (
    <Card className={`w-64 min-h-24 hover:shadow-lg transition-all duration-200 hover:border-primary/50 ${className}`} style={style}>
      {/* Render handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={`w-3 h-3 border-2 border-background shadow-md ${handle.className || ''}`}
          style={{
            backgroundColor: handle.type === 'source' ? '#3b82f6' : '#10b981',
            ...handle.style
          }}
        />
      ))}

      {/* Render content */}
      {content && (
        <>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              {content.icon && (
                <div className={`p-1.5 rounded-lg ${content.iconColor || 'bg-primary/10'}`}>
                  <content.icon className={`w-4 h-4 ${content.iconColor ? 'text-slate-700' : 'text-primary'}`} />
                </div>
              )}
              <CardTitle className="text-sm">{content.title}</CardTitle>
            </div>
            {content.description && (
              <CardDescription className="text-xs">
                {content.description}
              </CardDescription>
            )}
            {/* Delete button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleDelete}
            >
              <RiDeleteBin5Fill className="h-3 w-3" />
            </Button>
          </CardHeader>
          
          {/* Custom content */}
          {content.children && (
            <CardContent className="pt-0">
              {content.children}
            </CardContent>
          )}
        </>
      )}
    </Card>
  );
};

export default BaseNode;
