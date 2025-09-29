import { DraggableNode } from '../draggableNode';
import { Button } from './ui/button';
import { useStore } from '../store';
import { FiRefreshCw, FiSave } from 'react-icons/fi';
import { toast } from 'sonner';
import type { Edge, Node } from '@xyflow/react';

export const PipelineToolbar = () => {
    const resetPipeline = useStore((state) => state.resetPipeline);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    return (
        <div className="p-2.5 h-full flex flex-col">
            <div className="mt-2 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2.5">
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='data' label='Data' />
                    <DraggableNode type='filter' label='Filter' />
                    <DraggableNode type='aggregate' label='Aggregate' />
                    <DraggableNode type='condition' label='Condition' />
                    <DraggableNode type='api' label='API' />
                </div>
            </div>
            <div className="pt-2 border-t grid grid-cols-2 gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetPipeline}
                    className="justify-center gap-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-800 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:border-orange-500 dark:hover:text-orange-300"
                >
                    <FiRefreshCw className="w-4 h-4" />
                    Reset
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                        if (nodes.length > 1) {
                            const emptyTargetCount = nodes.reduce((count: number, node: Node) => {
                                const expectsTarget = node.type !== 'customInput';
                                if (!expectsTarget) return count;
                                const incoming = edges.filter((e: Edge) => e.target === node.id);
                                return count + (incoming.length === 0 ? 1 : 0);
                            }, 0);
                            if (emptyTargetCount > 1) {
                                toast.error('Cannot save: More than one node has empty target handles.');
                                return;
                            }
                        }
                        try {
                            const payload = { nodes, edges };
                            localStorage.setItem('pipeline:flow', JSON.stringify(payload));
                            toast.success('Flow saved');
                        } catch {
                            toast.error('Failed to save flow');
                        }
                    }}
                    className="justify-center gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-950 dark:hover:border-emerald-500 dark:hover:text-emerald-300"
                >
                    <FiSave className="w-4 h-4" />
                    Save
                </Button>
            </div>
        </div>
    );
};
