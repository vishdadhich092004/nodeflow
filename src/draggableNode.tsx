import { FiType, FiDatabase, FiFilter, FiBarChart, FiGitBranch, FiGlobe, FiUpload, FiCpu, FiDownload } from 'react-icons/fi';
interface DraggableNodeProps {
  type: string;
  label: string;
}

export const DraggableNode = ({ type, label }: DraggableNodeProps) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    // Get node type specific colors - cool and subtle tones
    const getNodeColors = (nodeType: string) => {
      const colors: Record<string, string> = {
        text: 'bg-gray-600 hover:bg-gray-700 border-gray-400',
        customInput: 'bg-slate-600 hover:bg-slate-700 border-slate-400',
        llm: 'bg-slate-500 hover:bg-slate-600 border-slate-300',
        customOutput: 'bg-slate-700 hover:bg-slate-800 border-slate-500',
        data: 'bg-zinc-600 hover:bg-zinc-700 border-zinc-400',
        filter: 'bg-neutral-600 hover:bg-neutral-700 border-neutral-400',
        aggregate: 'bg-stone-600 hover:bg-stone-700 border-stone-400',
        condition: 'bg-slate-500 hover:bg-slate-600 border-slate-300',
        api: 'bg-gray-700 hover:bg-gray-800 border-gray-500',
      };
      return colors[nodeType] || 'bg-slate-600 hover:bg-slate-700 border-slate-400';
    };

    // Get node type specific icons
    const getNodeIcon = (nodeType: string) => {
      const icons: Record<string, React.ComponentType<{ className?: string }>> = {
        text: FiType,
        customInput: FiUpload,
        llm: FiCpu,
        customOutput: FiDownload,
        data: FiDatabase,
        filter: FiFilter,
        aggregate: FiBarChart,
        condition: FiGitBranch,
        api: FiGlobe,
      };
      return icons[nodeType] || FiType;
    };
  
    return (
      <div
        className={`
          ${type} cursor-grab min-w-24 h-16 flex items-center justify-center flex-colrounded-xl border-2shadow-lgtransition-all duration-200 ease-in-outtransformhover:scale-105hover:shadow-xlactive:scale-95active:cursor-grabbingselect-none rounded-md
          ${getNodeColors(type)}
        `}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
        draggable
      >
        <div className="flex flex-col items-center justify-center gap-1">
          {(() => {
            const IconComponent = getNodeIcon(type);
            return <IconComponent className="w-5 h-5 text-white" />;
          })()}
          <span className="text-white font-medium text-xs tracking-wide text-center">
            {label}
          </span>
        </div>
      </div>
    );
  };
  