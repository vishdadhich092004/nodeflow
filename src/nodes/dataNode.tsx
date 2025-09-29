// dataNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiDatabase } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface DataNodeData extends BaseNodeData {
  operation?: string;
  fieldName?: string;
  dataType?: string;
}

interface DataNodeProps extends NodeProps {
  data: DataNodeData;
}

export const DataNode = ({ id, data }: DataNodeProps) => {
  const [operation, setOperation] = useState(data?.operation || 'Transform');
  const [fieldName, setFieldName] = useState(data?.fieldName || 'data_field');
  const [dataType, setDataType] = useState(data.dataType || 'String');

  const handleOperationChange = (value: string) => {
    setOperation(value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldName(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setDataType(value);
  };

  // Configure handles
  const handles: HandleConfig[] = [
    {
      id: `${id}-input`,
      type: 'target',
      position: Position.Left,
    },
    {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right,
    }
  ];

  // Configure content
  const content: NodeContentConfig = {
    title: 'Data',
    icon: FiDatabase,
    iconColor: 'bg-cyan-200',
    description: 'Data processing and transformation',
    children: (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="data-operation" className="text-xs">
            Operation
          </Label>
          <Select value={operation} onValueChange={handleOperationChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Transform">Transform</SelectItem>
              <SelectItem value="Convert">Convert</SelectItem>
              <SelectItem value="Parse">Parse</SelectItem>
              <SelectItem value="Format">Format</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="data-field" className="text-xs">
            Field Name
          </Label>
          <Input
            id="data-field"
            type="text"
            value={fieldName}
            onChange={handleFieldChange}
            placeholder="Enter field name"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="data-type" className="text-xs">
            Data Type
          </Label>
          <Select value={dataType} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="String">String</SelectItem>
              <SelectItem value="Number">Number</SelectItem>
              <SelectItem value="Boolean">Boolean</SelectItem>
              <SelectItem value="JSON">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2 p-2 bg-muted/50 rounded-md">
          <div className="text-xs font-medium text-foreground mb-1">Status:</div>
          <Badge variant="secondary" className="text-xs">Ready</Badge>
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
};
