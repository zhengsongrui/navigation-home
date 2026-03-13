import React from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { DisplayProject } from '../../types/display';
import './ProjectCard.less';

interface ProjectCardProps {
  project: DisplayProject;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  active,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`project-card ${active ? 'active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ '--card-color': project.color } as React.CSSProperties}
    >
      <div className="project-card-header">
        <div className="project-icon-wrapper">
          {project.icon}
        </div>
        <div className="project-title-wrapper">
          <h3 className="project-title">{project.name}</h3>
          {/* 技术标签暂时注释掉 */}
          {/* <div className="project-tech-tags">
            {project.tech.map((tech: string) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div> */}
        </div>
      </div>

      <p className="project-description">{project.description}</p>
      
      <div className="project-status">
        <div className="status-item">
          <span className={`status-indicator ${project.online ? 'online' : 'offline'}`}></span>
          <span className="status-label">
            {project.online ? '在线' : '离线'}
          </span>
        </div>
        <div className="status-item">
          <span className="write-status-label">写作状态:</span>
          <span className={`write-status ${project.writeStatus}`}>
            {project.writeStatus}
          </span>
        </div>
      </div>

      <div className="project-card-footer">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <ExternalLink />
          访问
          <ChevronRight className="link-arrow" />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <ExternalLink />
          源码
          <ChevronRight className="link-arrow" />
        </a>
      </div>
      <div className="project-card-bg"></div>
    </div>
  );
};

export default ProjectCard;