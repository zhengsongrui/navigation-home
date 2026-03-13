import React from 'react';
import ProjectsSection from '../projects/ProjectsSection';
import { DisplayProject } from '../../types/display';
import './MainContent.less';

interface MainContentProps {
  projects: DisplayProject[];
  loading: boolean;
  error: string | null;
  activeProject: number | null;
  handleProjectHover: (id: number | null) => void;
}

const MainContent: React.FC<MainContentProps> = (props) => {
  return (
    <main className="main-content">
      <ProjectsSection {...props} />
    </main>
  );
};

export default MainContent;