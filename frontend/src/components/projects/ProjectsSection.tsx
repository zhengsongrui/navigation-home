import React from 'react';
import { Code } from 'lucide-react';
import { DisplayProject } from '../../types/display';
import ProjectCard from '../projects/ProjectCard';
import './ProjectsSection.less';

interface ProjectsSectionProps {
  projects: DisplayProject[];
  loading: boolean;
  error: string | null;
  activeProject: number | null;
  handleProjectHover: (id: number | null) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  loading,
  error,
  activeProject,
  handleProjectHover,
}) => {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">
          <Code className="section-icon" />
          个人项目导航
        </h2>
        <p className="section-description">
          点击项目卡片访问在线演示，支持响应式设计和现代化交互
        </p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>加载项目中...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">❌ {error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            重试
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              active={activeProject === project.id}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;