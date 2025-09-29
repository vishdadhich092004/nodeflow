// outputNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiDownload } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OutputNodeData extends BaseNodeData {
  outputName?: string;
  outputType?: string;
}

interface OutputNodeProps extends NodeProps {
  data: OutputNodeData;
}

export const OutputNode = ({ id, data }: OutputNodeProps) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  };    

  const handleTypeChange = (value: string) => {
    setOutputType(value);
  };

  // Configure handles
  const handles: HandleConfig[] = [
    {
      id: `${id}-value`,
      type: 'target',
      position: Position.Left,
    }
  ];

  // Configure content
  const content: NodeContentConfig = {
    title: 'Output',
    icon: FiDownload,
    iconColor: 'bg-orange-200',
    description: 'Configure output parameters',
    children: (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="output-name" className="text-xs">
            Name
          </Label>
          <Input
            id="output-name"
            type="text"
            value={currName}
            onChange={handleNameChange}
            placeholder="Enter output name"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="output-type" className="text-xs">
            Type
          </Label>
          <Select value={outputType} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">Image</SelectItem>
            </SelectContent>
          </Select>
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
