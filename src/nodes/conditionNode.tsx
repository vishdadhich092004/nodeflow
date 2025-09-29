// conditionNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiGitBranch } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ConditionNodeData extends BaseNodeData {
  condition?: string;
  operator?: string;
  value?: string;
}

interface ConditionNodeProps extends NodeProps {
  data: ConditionNodeData;
}

export const ConditionNode = ({ id, data }: ConditionNodeProps) => {
  const [condition, setCondition] = useState(data?.condition || 'status');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || 'active');

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(e.target.value);
  };

  const handleOperatorChange = (value: string) => {
    setOperator(value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Configure handles
  const handles: HandleConfig[] = [
    {
      id: `${id}-input`,
      type: 'target',
      position: Position.Left,
    },
    {
      id: `${id}-true`,
      type: 'source',
      position: Position.Right,
      className: 'top-1/3',
    },
    {
      id: `${id}-false`,
      type: 'source',
      position: Position.Right,
      className: 'top-2/3',
    }
  ];

  // Configure content
  const content: NodeContentConfig = {
    title: 'Condition',
    icon: FiGitBranch,
    iconColor: 'bg-yellow-200',
    description: 'Conditional logic and branching',
    children: (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="condition-field" className="text-xs">
            Field
          </Label>
          <Input
            id="condition-field"
            type="text"
            value={condition}
            onChange={handleConditionChange}
            placeholder="Enter field name"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="condition-operator" className="text-xs">
            Operator
          </Label>
          <Select value={operator} onValueChange={handleOperatorChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equals">Equals</SelectItem>
              <SelectItem value="not_equals">Not Equals</SelectItem>
              <SelectItem value="greater_than">Greater Than</SelectItem>
              <SelectItem value="less_than">Less Than</SelectItem>
              <SelectItem value="contains">Contains</SelectItem>
              <SelectItem value="exists">Exists</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="condition-value" className="text-xs">
            Value
          </Label>
          <Input
            id="condition-value"
            type="text"
            value={value}
            onChange={handleValueChange}
            placeholder="Enter comparison value"
            className="h-8 text-xs"
          />
        </div>
        <div className="mt-2 p-2 bg-muted/50 rounded-md">
          <div className="text-xs font-medium text-foreground mb-1">Branches:</div>
          <div className="flex gap-1">
            <Badge variant="default" className="text-xs">True</Badge>
            <Badge variant="secondary" className="text-xs">False</Badge>
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
};
