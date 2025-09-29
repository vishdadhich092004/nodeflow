// aggregateNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiBarChart } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface AggregateNodeData extends BaseNodeData {
  operation?: string;
  fieldName?: string;
  groupBy?: string;
  outputName?: string;
}

interface AggregateNodeProps extends NodeProps {
  data: AggregateNodeData;
}

export const AggregateNode = ({ id, data }: AggregateNodeProps) => {
  const [operation, setOperation] = useState(data?.operation || 'Count');
  const [fieldName, setFieldName] = useState(data?.fieldName || 'value');
  const [groupBy, setGroupBy] = useState(data?.groupBy || '');
  const [outputName, setOutputName] = useState(data?.outputName || 'aggregated_result');

  const handleOperationChange = (value: string) => {
    setOperation(value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldName(e.target.value);
  };

  const handleGroupByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupBy(e.target.value);
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputName(e.target.value);
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
    title: 'Aggregate',
    icon: FiBarChart,
    iconColor: 'bg-emerald-200',
    description: 'Data aggregation and summarization',
    children: (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="aggregate-operation" className="text-xs">
            Operation
          </Label>
          <Select value={operation} onValueChange={handleOperationChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Count">Count</SelectItem>
              <SelectItem value="Sum">Sum</SelectItem>
              <SelectItem value="Average">Average</SelectItem>
              <SelectItem value="Min">Min</SelectItem>
              <SelectItem value="Max">Max</SelectItem>
              <SelectItem value="Group">Group</SelectItem>
              <SelectItem value="Distinct">Distinct</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="aggregate-field" className="text-xs">
            Field Name
          </Label>
          <Input
            id="aggregate-field"
            type="text"
            value={fieldName}
            onChange={handleFieldChange}
            placeholder="Enter field to aggregate"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="aggregate-group" className="text-xs">
            Group By (optional)
          </Label>
          <Input
            id="aggregate-group"
            type="text"
            value={groupBy}
            onChange={handleGroupByChange}
            placeholder="Enter grouping field"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="aggregate-output" className="text-xs">
            Output Name
          </Label>
          <Input
            id="aggregate-output"
            type="text"
            value={outputName}
            onChange={handleOutputChange}
            placeholder="Enter output name"
            className="h-8 text-xs"
          />
        </div>
        <div className="mt-2 p-2 bg-muted/50 rounded-md">
          <div className="text-xs font-medium text-foreground mb-1">Operation:</div>
          <Badge variant="secondary" className="text-xs">
            {operation} {fieldName} {groupBy && `by ${groupBy}`}
          </Badge>
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
