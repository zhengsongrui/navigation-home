import React, { useState } from 'react';
import dogIcon from '../../assets/img/dog.png'
import './Helper.less';

// 第三方 AI 接口（demo 用途，直接前端调用）
const AI_API_URL = 'http://live2d.zhengsongrui.life/asrText';

const Helper: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [aiReply, setAiReply] = useState('您好，我是您的AI小助手，有问题可以点我。');

  // 调用 AI 聊天接口，返回值填入 helper-say-view
  const fetchAiReply = async (text: string) => {
    setAiReply('思考中…');
    try {
      const response = await fetch(`${AI_API_URL}?text=${encodeURIComponent(text)}`);
      const result = await response.text();
      // 简单兼容 JSON 返回（demo 用途）
      try {
        const json = JSON.parse(result);
        setAiReply(typeof json === 'string' ? json : (json.data ?? json.reply ?? json.content ?? json.message ?? JSON.stringify(json)));
      } catch {
        setAiReply(result || 'AI 没有返回内容');
      }
    } catch (error) {
      setAiReply('哎呀，出错了：' + (error instanceof Error ? error.message : '网络异常'));
    }
  };

  // 提交：关闭对话框并调用接口
  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;
    setDialogVisible(false);
    setInputValue('');
    fetchAiReply(text);
  };

  return <div className="helper-view">
    <div className='helper-icon-view' onClick={() => setDialogVisible(true)}>
        <img src={dogIcon} alt=""/>
    </div>
    <div className='helper-say-view'>
        {aiReply}
    </div>
    {dialogVisible && (
      <div className="helper-dialog-mask" onClick={() => setDialogVisible(false)}>
        <div className="helper-dialog" onClick={(e) => e.stopPropagation()}>
          <textarea
            className="helper-dialog-textarea"
            placeholder="输入你想问的问题…"
            value={inputValue}
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="helper-dialog-buttons">
            <button className="helper-dialog-btn cancel" onClick={() => setDialogVisible(false)}>取消</button>
            <button className="helper-dialog-btn send" onClick={handleSubmit}>发送</button>
          </div>
        </div>
      </div>
    )}
  </div>;
};

export default Helper;
