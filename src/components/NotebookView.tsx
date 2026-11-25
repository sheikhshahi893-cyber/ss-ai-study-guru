import React from "react";
import { StudyNotebook } from "./StudyNotebook";

interface NotebookViewProps {
  onAskGuru?: (q: string) => void;
}

export const NotebookView: React.FC<NotebookViewProps> = () => {
  return (
    <div className="space-y-4">
      <StudyNotebook />
    </div>
  );
};

export default NotebookView;
