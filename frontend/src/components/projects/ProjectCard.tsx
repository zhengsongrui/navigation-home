import React from "react";
import { ExternalLink, ChevronRight } from "lucide-react";
import { DisplayProject } from "../../types/display";
import "./ProjectCard.less";

interface ProjectCardProps {
  project: DisplayProject;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const adjustOnlineStatus = (
  url: string | undefined,
  online: boolean | undefined,
) => {
  if (url) {
    return online ? "在线" : "离线";
  } else {
    return "无在线地址";
  }
};

const formatWriteStatus = (writeStatus: string) => {
  switch (writeStatus) {
    case "已完成":
      return "completed";
      break;
    case "未开发":
      return "no-develop";
      break;
         case "开发中":
      return "in-progress";
      break;
    case "维护中":
      return "maintenance";
      break;
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  active,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`project-card ${active ? "active" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ "--card-color": project.color } as React.CSSProperties}
    >
      <div className="project-card-header">
        <div className="project-icon-wrapper">{project.icon}</div>
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
          <span
            className={`status-indicator ${project.online ? "online" : "offline"} ${!project.url ? "no-url" : ""}`}
          ></span>
          <span className="status-label">
            {adjustOnlineStatus(project.url, project.online)}
          </span>
        </div>
        <div className="status-item">
          <span className="write-status-label">写作状态:</span>
          <span className={`write-status ${formatWriteStatus(project.writeStatus)}`}>
            {project.writeStatus}
          </span>
        </div>
      </div>

      <div className="project-card-footer">
        {project.github && (
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
        )}
        {project.url && (
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
        )}
      </div>
      <div className="project-card-bg"></div>
    </div>
  );
};

export default ProjectCard;
