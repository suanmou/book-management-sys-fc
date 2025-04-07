import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Button, List, Tag, Spin, Popover } from 'antd';
import { SendOutlined, LoadingOutlined, BulbOutlined } from '@ant-design/icons';
import styled, { keyframes, css } from 'styled-components';

// 光晕动画
const glowAnimation = keyframes`
  0% { box-shadow: 0 0 8px rgba(24, 144, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(24, 144, 255, 0.4); }
  100% { box-shadow: 0 0 8px rgba(24, 144, 255, 0.2); }
`;

// 玻璃质感基础样式
const GlassEffect = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(24, 144, 255, 0.3);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #40a9ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
  }

  &:focus-within {
    animation: ${glowAnimation} 1.5s infinite;
  }
`;

// 输入容器
const InputContainer = styled.div`
  position: relative;
  ${GlassEffect}
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 智能提示列表
const SuggestionList = styled.div`
  ${GlassEffect}
  position: absolute;
  bottom: calc(100% + 10px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  padding: 8px 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.visible ? 0 : '10px')});
  transition: all 0.3s ease;
`;

// 自定义输入框
const StyledInput = styled(Input.TextArea)`
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: rgba(255, 255, 255, 0.85);
  resize: none !important;
  flex: 1;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4) !important;
  }

  &:focus {
    box-shadow: none !important;
  }
`;

// 发送按钮
const SendButton = styled(Button).attrs({
  type: 'primary',
  shape: 'circle',
})`
  background: linear-gradient(45deg, #1890ff, #40a9ff) !important;
  border: none !important;
  width: 40px !important;
  height: 40px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const GlassInput = ({ onSend, contextFilters, loading, style, ...props }) => {
  const [input] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // 生成智能建议
  const generateSuggestions = useCallback(() => {
    const baseSuggestions = ['请总结...', '分析趋势...', '对比差异...'];

    if (contextFilters.keywords.length > 0) {
      return [
        `关于"${contextFilters.keywords.join(',')}"的详细分析`,
        `"${contextFilters.keywords[0]}"相关数据趋势`,
        ...baseSuggestions,
      ];
    }

    if (contextFilters.timeRange.length === 2) {
      return [
        `${contextFilters.timeRange.join('~')}期间总结`,
        '时间范围内的数据对比',
        ...baseSuggestions,
      ];
    }

    return baseSuggestions;
  }, [contextFilters]);

  // 处理发送
  const handleSend = () => {
    if (input.trim()) {
      onSend({
        content: input,
        filters: { ...contextFilters },
      });
      ('');
      setShowSuggestions(false);
    }
  };

  // 快捷选择建议
  const handleSelectSuggestion = (text) => {
    text;
    inputRef.current?.focus();
  };

  // 快捷键监听
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const inputEl = inputRef.current?.resizableTextArea?.textArea;
    inputEl?.addEventListener('keydown', handleKeyDown);

    return () => inputEl?.removeEventListener('keydown', handleKeyDown);
  }, [handleSend]);

  return (
    <div style={{ position: 'relative', ...style }}>
      {/* 智能建议 */}
      <SuggestionList visible={showSuggestions && !loading}>
        <List
          dataSource={generateSuggestions()}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(24, 144, 255, 0.1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
              onClick={() => handleSelectSuggestion(item)}
            >
              <BulbOutlined style={{ marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />
      </SuggestionList>

      {/* 输入区域 */}
      <InputContainer>
        <StyledInput
          ref={inputRef}
          value={input}
          onChange={(e) => e.target.value}
          placeholder={
            contextFilters.keywords.length > 0
              ? `当前应用 ${contextFilters.keywords.length} 个筛选条件...`
              : '输入您的问题...'
          }
          autoSize={{ minRows: 1, maxRows: 4 }}
          //   onFocus={() => setShowSuggestions(true)}
          //   onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {/* 筛选条件标签 */}
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: 8,
          }}
        >
          {contextFilters.timeRange.length === 2 && (
            <Tag color="blue">{contextFilters.timeRange.join(' ~ ')}</Tag>
          )}
          {contextFilters.keywords.map((keyword) => (
            <Tag key={keyword} color="geekblue">
              {keyword}
            </Tag>
          ))}
        </div>

        {/* 发送按钮 */}
        <Popover content="发送消息 (Ctrl + Enter)">
          <SendButton
            onClick={handleSend}
            icon={
              loading ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                <SendOutlined />
              )
            }
            disabled={!input.trim()}
          />
        </Popover>
      </InputContainer>
    </div>
  );
};

export default GlassInput;
