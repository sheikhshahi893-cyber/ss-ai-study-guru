import React from "react";
import { MathSolver } from "./MathSolver";

interface MathViewProps {
  onAskGuru?: (q: string) => void;
}

export const MathView: React.FC<MathViewProps> = () => {
  return (
    <div className="space-y-4">
      <MathSolver />
    </div>
  );
};

export default MathView;
