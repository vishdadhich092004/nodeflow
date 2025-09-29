// textNode.tsx

import { useState, useEffect, useMemo } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiType } from 'react-icons/fi';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store';

interface TextNodeData extends BaseNodeData {
  text?: string;
}

interface TextNodeProps extends NodeProps {
  data: TextNodeData;
}

// Function to extract variable names from text
const extractVariables = (text: string): string[] => {
  const variableRegex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
  const matches = text.match(variableRegex);
  if (!matches) return [];
  
  return matches.map(match => match.slice(2, -2)); // Remove {{ and }}
};

// Function to calculate dynamic dimensions based on text content
const calculateDimensions = (text: string) => {
  const lines = text.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length));
  
  // Base dimensions
  const baseWidth = 256; // w-64 = 16rem = 256px
  const baseHeight = 96; // min-h-24 = 6rem = 96px
  
  // Calculate width based on content (with reasonable limits)
  const charWidth = 8; // Approximate character width
  const minWidth = baseWidth;
  const maxWidth = 400;
  const calculatedWidth = Math.max(minWidth, Math.min(maxWidth, maxLineLength * charWidth + 32));
  
  // Calculate height based on number of lines
  const lineHeight = 20; // Approximate line height
  const minHeight = baseHeight;
  const maxHeight = 300;
  const calculatedHeight = Math.max(minHeight, Math.min(maxHeight, lines.length * lineHeight + 80));
  
  return {
    width: calculatedWidth,
    height: calculatedHeight
  };
};

export const TextNode = ({ id, data }: TextNodeProps) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const { updateNodeField } = useStore();

  // Sync local state when external node data changes (e.g., via Settings Panel)
  useEffect(() => {
    const incoming = data?.text ?? '{{input}}';
    if (incoming !== currText) {
      setCurrText(incoming);
    }
  }, [data?.text, currText]);

  // Extract variables from current text
  const variables = useMemo(() => extractVariables(currText), [currText]);
  
  // Calculate dynamic dimensions
  const dimensions = useMemo(() => calculateDimensions(currText), [currText]);

  // Update node data when text changes
  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrText(e.target.value);
  };

  // Configure handles - dynamic based on variables
  const handles: HandleConfig[] = useMemo(() => {
    const handleList: HandleConfig[] = [
      {
        id: `${id}-output`,
        type: 'source',
        position: Position.Right,
      }
    ];

    // Add input handles for each variable
    variables.forEach((variable, index) => {
      handleList.push({
        id: `${id}-input-${variable}`,
        type: 'target',
        position: Position.Left,
        className: 'mt-2',
        style: {
          top: `${60 + index * 20}px` // Position handles vertically
        }
      });
    });

    return handleList;
  }, [id, variables]);

  // Configure content
  const content: NodeContentConfig = {
    title: 'Text',
    icon: FiType,
    iconColor: 'bg-blue-200',
    description: 'Text processing and manipulation',
    children: (
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="text-content" className="text-xs">
            Text Content
          </Label>
          <textarea
            id="text-content"
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text or use {{variableName}} for variables"
            className="w-full min-h-16 p-2 text-xs border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            style={{ 
              height: `${Math.max(64, Math.min(200, currText.split('\n').length * 20 + 16))}px` 
            }}
          />
        </div>
        {variables.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Variables: {variables.map(v => (
              <span key={v} className="bg-muted px-1 rounded text-xs mr-1">
                {v}
              </span>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Use <code className="bg-muted px-1 rounded text-xs">{'{{variableName}}'}</code> for dynamic values
        </div>
      </div>
    )
  };

  return (
    <BaseNode
      id={id}
      data={data}
      handles={handles}
      content={content}
      style={{
        width: dimensions.width,
        minHeight: dimensions.height
      }}
    />
  );
};