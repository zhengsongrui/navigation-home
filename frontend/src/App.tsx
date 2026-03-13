import { useState, useEffect } from 'react';
import { fetchProjects } from './api/projects';
import { type Project } from './types/ApiInterface';
import { convertToDisplayProject, DisplayProject } from './types/display';
import MouseFollower from './components/effects/MouseFollower';
import BackgroundElements from './components/effects/BackgroundElements';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import './App.less';

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
          const displayProjects = result.data.projects.map((project: Project) =>
            convertToDisplayProject(project)
          );
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
      <MouseFollower x={mousePosition.x} y={mousePosition.y} />
      <BackgroundElements />

      <div className="container">
        <Header />
        <MainContent
          projects={projects}
          loading={loading}
          error={error}
          activeProject={activeProject}
          handleProjectHover={handleProjectHover}
        />
      </div>
    </div>
  );
}

export default App;
