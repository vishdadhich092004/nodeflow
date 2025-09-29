// inputNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiUpload } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InputNodeData extends BaseNodeData {
  inputName?: string;
  inputType?: string;
}

interface InputNodeProps extends NodeProps {
  data: InputNodeData;
}

export const InputNode = ({ id, data }: InputNodeProps) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setInputType(value);
  };

  // Configure handles
  const handles: HandleConfig[] = [
    {
      id: `${id}-value`,
      type: 'source',
      position: Position.Right,
    }
  ];

  // Configure content
  const content: NodeContentConfig = {
    title: 'Input',
    icon: FiUpload,
    iconColor: 'bg-green-200',
    description: 'Configure input parameters',
    children: (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="input-name" className="text-xs">
            Name
          </Label>
          <Input
            id="input-name"
            type="text"
            value={currName}
            onChange={handleNameChange}
            placeholder="Enter input name"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="input-type" className="text-xs">
            Type
          </Label>
          <Select value={inputType} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
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
