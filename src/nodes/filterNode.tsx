// filterNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiFilter } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FilterNodeData extends BaseNodeData {
  filterType?: string;
  fieldName?: string;
  filterValue?: string;
  caseSensitive?: boolean;
}

interface FilterNodeProps extends NodeProps {
  data: FilterNodeData;
}

export const FilterNode = ({ id, data }: FilterNodeProps) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'Contains');
  const [fieldName, setFieldName] = useState(data?.fieldName || 'content');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldName(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleCaseSensitiveChange = (value: string) => {
    setCaseSensitive(value === 'true');
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
    title: 'Filter',
    icon: FiFilter,
    iconColor: 'bg-pink-200',
    description: 'Data filtering and validation',
    children: (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="filter-type" className="text-xs">
            Filter Type
          </Label>
          <Select value={filterType} onValueChange={handleFilterTypeChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Contains">Contains</SelectItem>
              <SelectItem value="Starts With">Starts With</SelectItem>
              <SelectItem value="Ends With">Ends With</SelectItem>
              <SelectItem value="Regex">Regex</SelectItem>
              <SelectItem value="Length">Length</SelectItem>
              <SelectItem value="Not Empty">Not Empty</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="filter-field" className="text-xs">
            Field Name
          </Label>
          <Input
            id="filter-field"
            type="text"
            value={fieldName}
            onChange={handleFieldChange}
            placeholder="Enter field to filter"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="filter-value" className="text-xs">
            Filter Value
          </Label>
          <Input
            id="filter-value"
            type="text"
            value={filterValue}
            onChange={handleValueChange}
            placeholder="Enter filter value"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="filter-case" className="text-xs">
            Case Sensitive
          </Label>
          <Select value={caseSensitive.toString()} onValueChange={handleCaseSensitiveChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select case sensitivity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">No</SelectItem>
              <SelectItem value="true">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2 p-2 bg-muted/50 rounded-md">
          <div className="text-xs font-medium text-foreground mb-1">Filter:</div>
          <Badge variant="outline" className="text-xs">
            {fieldName} {filterType.toLowerCase()} "{filterValue}"
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
