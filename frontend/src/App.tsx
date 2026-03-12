import { useState, useEffect } from 'react';
import { Github, ExternalLink, Code, ChevronRight, Atom, FileCode, Server } from 'lucide-react';
import { fetchProjects } from './api/projects';
import { type Project } from './types/ApiInterface';
import './App.less';

// 图标映射
const iconMap: Record<string, JSX.Element> = {
  'Atom': <Atom className="project-icon" />,
  'FileCode': <FileCode className="project-icon" />,
  'Server': <Server className="project-icon" />,
};

// 技术栈映射（根据项目名称映射）
const techMap: Record<string, string[]> = {
  '导航首页项目': ['React', 'TypeScript', 'Node.js'],
  'API 服务监控': ['Node.js', 'Express', 'MongoDB'],
  '个人博客': ['Next.js', 'React', 'Markdown'],
};

// 颜色映射
const colorMap: Record<number, string> = {
  1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
};

// 图标名称映射
const iconNameMap: Record<number, keyof typeof iconMap> = {
  1: 'Atom',
  2: 'FileCode',
  3: 'Server',
};


interface DisplayProject {
  id: number;
  name: string;
  description: string;
  url: string;
  writeStatus: string;
  online?: boolean;
  icon: JSX.Element;
  tech: string[];
  color: string;
}

function App() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const result = await fetchProjects();
        
        if (result.success && result.data) {
          // 转换 API 数据为显示格式
          const displayProjects = result.data.projects.map((project: Project) => ({
            id: project.id,
            name: project.name,
            description: project.description,
            url: project.url,
            writeStatus: project.writeStatus,
            online: project.serviceStatus?.online,
            icon: iconMap[iconNameMap[project.id] || 'Atom'] || <Atom className="project-icon" />,
            tech: techMap[project.name] || ['React', 'Node.js'],
            color: colorMap[project.id] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }));
          setProjects(displayProjects);
        } else {
          setError(result.error || '获取项目数据失败');
        }
      } catch (err) {
        setError('网络请求异常');
        console.error('加载项目数据时出错:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleProjectHover = (id: number | null) => {
    setActiveProject(id);
  };

  return (
    <div className="app">
      {/* 鼠标跟随效果 */}
      <div
        className="mouse-follower"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* 背景元素 */}
      <div className="background-elements">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
        <div className="bg-circle-3"></div>
      </div>

      <div className="container">
        {/* 头部 - 简化版 */}
        <header className="header">
          <div className="header-content">
            <h1 className="title">
              <span className="title-gradient">导航页</span>
              <div className="title-underline"></div>
            </h1>
            <p className="subtitle">
              快速访问我的项目与GitHub仓库
            </p>
            <div className="header-github-link">
              <a
                href="https://github.com/zhengsongrui/navigation-home"
                target="_blank"
                rel="noopener noreferrer"
                className="github-header-link"
              >
                <Github className="github-header-icon" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="main-content">
          {/* 项目导航模块 */}
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
                  <div
                    key={project.id}
                    className={`project-card ${activeProject === project.id ? 'active' : ''}`}
                    onMouseEnter={() => handleProjectHover(project.id)}
                    onMouseLeave={() => handleProjectHover(null)}
                    style={{ '--card-color': project.color } as React.CSSProperties}
                  >
                    <div className="project-card-header">
                      <div className="project-icon-wrapper">
                        {project.icon}
                      </div>
                      <div className="project-title-wrapper">
                        <h3 className="project-title">{project.name}</h3>
                        <div className="project-tech-tags">
                          {project.tech.map((tech: string) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
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
                        访问项目
                        <ChevronRight className="link-arrow" />
                      </a>
                      <div className="project-hover-indicator"></div>
                    </div>
                    <div className="project-card-bg"></div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </main>

      </div>
    </div>
  );
}

export default App;
