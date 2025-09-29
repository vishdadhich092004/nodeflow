// llmNode.tsx

import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiCpu } from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';

interface LLMNodeData extends BaseNodeData {
  // LLM-specific properties can be added here in the future
  model?: string;
  temperature?: number;
}

interface LLMNodeProps extends NodeProps {
  data: LLMNodeData;
}

export const LLMNode = ({ id, data }: LLMNodeProps) => {
  // Configure handles
  const handles: HandleConfig[] = [
    {
      id: `${id}-system`,
      type: 'target',
      position: Position.Left,
      className: 'top-1/3',
    },
    {
      id: `${id}-prompt`,
      type: 'target',
      position: Position.Left,
      className: 'top-2/3',
    },
    {
      id: `${id}-response`,
      type: 'source',
      position: Position.Right,
    }
  ];

  // Configure content
  const content: NodeContentConfig = {
    title: 'LLM',
    icon: FiCpu,
    iconColor: 'bg-purple-200',
    description: 'Large Language Model for text generation and processing',
    children: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Model:</span>
          <Badge variant="secondary" className="text-xs">GPT-4</Badge>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Temperature:</span>
          <Badge variant="outline" className="text-xs">0.7</Badge>
        </div>
        <div className="mt-2 p-2 bg-muted/50 rounded-md">
          <div className="text-xs font-medium text-foreground mb-1">Inputs:</div>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div>• System prompt</div>
            <div>• User prompt</div>
          </div>
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
    />
  );
}
