import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './ui';
import SettingsPanel from './components/SettingsPanel';
import { useStore } from './store';
import { Toaster } from './components/ui/sonner';

function App() {
  const selectedNodeId = useStore((s) => s.selectedNodeId);
  return (
    <div className="h-screen flex">
      <div className="flex-1 h-full overflow-hidden">
        <PipelineUI />
        <Toaster />
      </div>
      <div className="w-64 border-l h-full bg-card flex flex-col overflow-y-auto">
        {selectedNodeId ? <SettingsPanel /> : <PipelineToolbar />}
      </div>
    </div>
  );
}

export default App;
