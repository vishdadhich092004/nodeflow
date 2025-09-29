import { RxCross2 } from "react-icons/rx";
import {
  BezierEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getBezierPath,
  useReactFlow,
  type Edge,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";

export default function CustomEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <Button
          aria-label="Delete Edge"
          variant="ghost"
          className="absolute"
          size="sm"
          style={{ 
            color: 'red', 
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`, 
            pointerEvents: 'all', 
            background: 'transparent' 
          }}
          onClick={() =>
            setEdges((prevEdges) => prevEdges.filter((edge: Edge) => edge.id !== id))
          }
        >
          <RxCross2 />
        </Button>
      </EdgeLabelRenderer>
    </>
  );
}