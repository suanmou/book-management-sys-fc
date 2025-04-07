import React, { useState, useMemo, useCallback } from 'react';
import {
  Card,
  Input,
  Button,
  List,
  Avatar,
  message,
  Collapse,
  theme,
} from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { CommonSearch } from './CommonSearch';
import Panel from 'antd/es/cascader/Panel';

// 模拟AI生成回答
const generateAIResponse = (question, filteredData) => {
  const dataCount = filteredData?.length;
  const keywords = filteredData?.flatMap(
    (item) => item.content.match(/[\u4e00-\u9fa5a-zA-Z0-9]+/g) || []
  );

  const uniqueKeywords = [...new Set(keywords)];

  return `根据当前筛选条件，共找到 ${dataCount} 条相关数据。
  主要涉及关键词：${uniqueKeywords.slice(0, 5).join('、')}${
    uniqueKeywords.length > 5 ? '等' : ''
  }。
  示例数据：${filteredData
    .slice(0, 3)
    .map((d) => d.content)
    .join('; ')}...`;
};

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // 处理消息发送
  const handleSend = () => {
    if (!inputText.trim()) return;

    // 添加用户消息
    const userMsg = {
      id: Date.now(),
      content: inputText,
      isAI: false,
      timestamp: new Date(),
    };

    // 生成AI回复
    const aiResponse = {
      id: Date.now() + 1,
      content: generateAIResponse(inputText, filteredData),
      isAI: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, aiResponse]);
    setInputText('');
  };
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  return (
    <Card
      title="智能数据分析助手"
      style={{
        width: 800,
        margin: '20px auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      {/* 集成搜索组件 */}
      <Collapse
        defaultActiveKey={['1']}
        style={{ background: token.colorBgContainer, marginBottom: '10px' }}
      >
        <Collapse.Panel key="1" header={'Data Source'} style={panelStyle}>
          <div style={{ marginBottom: 24 }}>
            <CommonSearch
              onFilterChange={setFilteredData}
              config={{ keywords: [], title: '' }}
              data={[]}
              onUpdate={(updates) => console.log(updates, '>>>>>>')}
              showDateFilter
              style={{ borderRadius: 12 }}
            />
          </div>
        </Collapse.Panel>
      </Collapse>
      {/* 聊天记录区域 */}
      <div
        style={{
          height: 400,
          overflowY: 'auto',
          border: '1px solid #f0f0f0',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <div
              style={{
                display: 'flex',
                flexDirection: msg.isAI ? 'row' : 'row-reverse',
                margin: '12px 0',
              }}
            >
              <Avatar
                size={40}
                icon={msg.isAI ? <RobotOutlined /> : <UserOutlined />}
                style={{
                  background: msg.isAI ? '#f6ffed' : '#1890ff',
                  color: msg.isAI ? '#52c41a' : '#fff',
                }}
              />
              <div
                style={{
                  maxWidth: '70%',
                  margin: '0 12px',
                  padding: 12,
                  background: msg.isAI ? '#f8f8f8' : '#1890ff',
                  borderRadius: 12,
                  color: msg.isAI ? '#333' : '#fff',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: msg.isAI ? '#666' : 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {msg.timestamp.toLocaleTimeString()}
                </div>
                <div style={{ marginTop: 8 }}>{msg.content}</div>
              </div>
            </div>
          )}
        />
      </div>

      <Input.Group compact>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入您的问题..."
          style={{ width: '90%' }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          style={{ width: '10%' }}
        >
          {/* Send */}
        </Button>
      </Input.Group>
    </Card>
  );
};

// 增强后的CommonSearch组件
const EnhancedCommonSearch = ({ onFilterChange, ...props }) => {
  const handleFilterChange = useCallback(
    (filteredData) => {
      onFilterChange?.(filteredData);
    },
    [onFilterChange]
  );

  return <CommonSearch {...props} onFilterChange={handleFilterChange} />;
};

export default ChatWindow;
