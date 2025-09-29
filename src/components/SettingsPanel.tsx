import { useMemo } from 'react';
import { useStore, type PipelineStore as StoreShape } from '../store';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FiSave } from 'react-icons/fi';
import { toast } from 'sonner';
import type { Edge, Node } from '@xyflow/react';

export const SettingsPanel = () => {
    const selectedNodeId = useStore((s: StoreShape) => s.selectedNodeId);
    const nodes = useStore((s: StoreShape) => s.nodes);
    const updateNodeField = useStore((s: StoreShape) => s.updateNodeField);

    const node = useMemo(() => nodes.find(n => n.id === selectedNodeId), [nodes, selectedNodeId]);

    type NodeData = {
        title?: string;
        description?: string;
    } & Record<string, unknown>;

    const handleSaveClick = () => {
        const nodes = useStore.getState().nodes as Node[];
        const edges = useStore.getState().edges as Edge[];
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
    };

    if (!node) {
        return null;
    }
    return (
        <div className="p-3 space-y-3">
            <div>
                <h3 className="text-sm font-semibold">Node Settings</h3>
                <p className="text-xs text-muted-foreground">Configure the selected node.</p>
            </div>

            <div className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="nodeId">ID</Label>
                    <Input id="nodeId" value={node.id} disabled />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="nodeType">Type</Label>
                    <Input id="nodeType" value={String(node.type ?? '')} disabled />
                </div>
                {node.type === 'text' && (
                    <div className="space-y-1">
                        <Label htmlFor="textContent">Text Content</Label>
                        <textarea
                            id="textContent"
                            className="w-full min-h-24 p-2 text-xs border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={String(((node.data as NodeData) ?? {})?.text ?? '')}
                            onChange={(e) => updateNodeField(node.id, 'text', e.target.value)}
                            placeholder="Enter text or use {{variableName}}"
                        />
                    </div>
                )}
            </div>
            <div className="pt-2 border-t">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSaveClick}
                    className="w-full justify-center gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-950 dark:hover:border-emerald-500 dark:hover:text-emerald-300"
                >
                    <FiSave className="w-4 h-4" />
                    Save
                </Button>
            </div>
        </div>
    );
};

export default SettingsPanel;


