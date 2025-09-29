
import { useState, useRef, useCallback } from 'react';
import { ReactFlow, Controls, Background, MiniMap, type ReactFlowInstance, type Node, type Edge, ConnectionLineType } from '@xyflow/react';
import { useStore, type PipelineStore as StoreShape } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DataNode } from './nodes/dataNode';
import '@xyflow/react/dist/style.css';
import { AggregateNode } from './nodes/aggregateNode';
import { FilterNode } from './nodes/filterNode';
import { ConditionNode } from './nodes/conditionNode';
import { APINode } from './nodes/apiNode';
import CustomEdge from './components/custom-edge';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  data: DataNode,
  filter: FilterNode,
  aggregate: AggregateNode,
  condition: ConditionNode,
  api: APINode
};

const edgeTypes = {
  custom: CustomEdge,
};

// intentionally use individual selectors to avoid creating new objects each render
// store shape is imported as StoreShape; no local duplicate type needed

export const PipelineUI = () => {
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<Node, Edge> | null>(null);
    const nodes = useStore((s: StoreShape) => s.nodes);
    const edges = useStore((s: StoreShape) => s.edges);
    const getNodeID = useStore((s: StoreShape) => s.getNodeID);
    const addNode = useStore((s: StoreShape) => s.addNode);
    const onNodesChange = useStore((s: StoreShape) => s.onNodesChange);
    const onEdgesChange = useStore((s: StoreShape) => s.onEdgesChange);
    const onConnect = useStore((s: StoreShape) => s.onConnect);
    const setSelectedNodeId = useStore((s: StoreShape) => s.setSelectedNodeId);

    const getInitNodeData = (nodeID: string, type: string) => {
      const nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            if (!reactFlowBounds || !reactFlowInstance) return;
            const position = reactFlowInstance.screenToFlowPosition({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} className="w-full h-full">
            <ReactFlow
                key={nodes.length + edges.length}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={(instance) => setReactFlowInstance(instance)}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType={ConnectionLineType.SmoothStep}
                onNodeClick={(_, node) => setSelectedNodeId(node.id)}
                onPaneClick={() => setSelectedNodeId(null)}
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
