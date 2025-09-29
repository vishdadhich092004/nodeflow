// apiNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiGlobe } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface APINodeData extends BaseNodeData {
  url?: string;
  method?: string;
  headers?: string;
  timeout?: number;
}

interface APINodeProps extends NodeProps {
  data: APINodeData;
}

export const APINode = ({ id, data }: APINodeProps) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/endpoint');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [headers, setHeaders] = useState(data?.headers || '{"Content-Type": "application/json"}');
  const [timeout, setTimeout] = useState(data?.timeout || 30);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleMethodChange = (value: string) => {
    setMethod(value);
  };

  const handleHeadersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaders(e.target.value);
  };

  const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(parseInt(e.target.value) || 30);
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
    title: 'API',
    icon: FiGlobe,
    iconColor: 'bg-indigo-200',
    description: 'External API calls and integrations',
    children: (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="api-url" className="text-xs">
            URL
          </Label>
          <Input
            id="api-url"
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter API endpoint URL"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="api-method" className="text-xs">
            Method
          </Label>
          <Select value={method} onValueChange={handleMethodChange}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="api-headers" className="text-xs">
            Headers
          </Label>
          <Input
            id="api-headers"
            type="text"
            value={headers}
            onChange={handleHeadersChange}
            placeholder="JSON format headers"
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="api-timeout" className="text-xs">
            Timeout (seconds)
          </Label>
          <Input
            id="api-timeout"
            type="number"
            value={timeout}
            onChange={handleTimeoutChange}
            placeholder="30"
            className="h-8 text-xs"
          />
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
