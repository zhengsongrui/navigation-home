import React from 'react';
import { Github } from 'lucide-react';
import './Header.less';

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;