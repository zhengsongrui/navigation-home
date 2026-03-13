import React from 'react';
import './MouseFollower.less';

interface MouseFollowerProps {
  x: number;
  y: number;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ x, y }) => {
  return (
    <div
      className="mouse-follower"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );
};

export default MouseFollower;