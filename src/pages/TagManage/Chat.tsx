// import React, { useState, useMemo } from 'react';
// import { Input, Button, DatePicker, List, Tag, Card, Row, Col } from 'antd';
// import { SendOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

// const { RangePicker } = DatePicker;

// // 聊天消息组件
// const ChatMessage = ({ message, isUser }) => (
//   <div
//     style={{
//       textAlign: isUser ? 'right' : 'left',
//       margin: '8px 0',
//       padding: '8px',
//       backgroundColor: isUser ? '#e6f7ff' : '#f5f5f5',
//       borderRadius: '8px',
//     }}
//   >
//     <div style={{ fontSize: '0.8em', color: '#666' }}>
//       {new Date(message.timestamp).toLocaleString()}
//     </div>
//     <div>{message.text}</div>
//   </div>
// );

// // 关键字搜索组件
// const KeywordSearch = ({ keywords, onAdd, onRemove }) => {
//   const [input, setInput] = useState('');

//   const handleAdd = () => {
//     if (input.trim() && !keywords.includes(input.trim())) {
//       onAdd(input.trim());
//       setInput('');
//     }
//   };

//   return (
//     <div style={{ marginBottom: 16 }}>
//       <Input.Group compact>
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="输入关键字"
//           style={{ width: '70%' }}
//           onPressEnter={handleAdd}
//         />
//       </Input.Group>

//       <div style={{ marginTop: 8 }}>
//         {keywords.map((keyword) => (
//           <Tag
//             key={keyword}
//             closable
//             onClose={() => onRemove(keyword)}
//             style={{ margin: 4 }}
//           >
//             {keyword}
//           </Tag>
//         ))}
//       </div>
//     </div>
//   );
// };

// // 主组件
// const ChatDashboard = () => {
//   // 状态管理
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const [dateRange, setDateRange] = useState([]);
//   const [keywords, setKeywords] = useState([]);
//   const [searchComponents, setSearchComponents] = useState([[]]);

//   // 模拟数据
//   const data = useMemo(
//     () => [
//       { id: 1, content: '示例数据1', timestamp: '2024-03-01' },
//       { id: 2, content: '示例数据2', timestamp: '2024-03-05' },
//       { id: 3, content: '示例数据3', timestamp: '2024-03-10' },
//     ],
//     []
//   );

//   // 过滤数据
//   const filteredData = useMemo(() => {
//     return data.filter((item) => {
//       // 时间筛选
//       const timeValid =
//         dateRange.length === 0 ||
//         (new Date(item.timestamp) >= dateRange[0] &&
//           new Date(item.timestamp) <= dateRange[1]);

//       // 关键字筛选
//       const keywordValid = searchComponents.every(
//         (keywords) =>
//           keywords.length === 0 ||
//           keywords.some((kw) => item.content.includes(kw))
//       );

//       return timeValid && keywordValid;
//     });
//   }, [data, dateRange, searchComponents]);

//   // 处理消息发送
//   const handleSend = () => {
//     if (inputText.trim()) {
//       const newMessage = {
//         text: inputText,
//         timestamp: new Date().toISOString(),
//         isUser: true,
//       };
//       setMessages([...messages, newMessage]);
//       setInputText('');
//     }
//   };

//   // 处理搜索组件操作
//   const handleSearchChange = (index, newKeywords) => {
//     const updated = [...searchComponents];
//     updated[index] = newKeywords;
//     setSearchComponents(updated);
//   };

//   const addSearchComponent = () => {
//     setSearchComponents([...searchComponents, []]);
//   };

//   return (
//     <Card title="智能问答系统" bordered={false}>
//       {/* 筛选区域 */}
//       <Row gutter={16} style={{ marginBottom: 24 }}>
//         <Col span={12}>
//           <div style={{ marginBottom: 16 }}>
//             <RangePicker
//               style={{ width: '100%' }}
//               onChange={(dates) => setDateRange(dates)}
//             />
//           </div>
//         </Col>

//         <Col span={12}>
//           <div style={{ position: 'relative', marginBottom: 16 }}>
//             <KeywordSearch
//               keywords={keywords}
//               //   onAdd={(kw) => handleSearchChange(index, [...keywords, kw])}
//               //   onRemove={(kw) =>
//               //     handleSearchChange(
//               //       index,
//               //       keywords.filter((k) => k !== kw)
//               //     )
//               //   }
//             />
//           </div>
//         </Col>
//       </Row>

//       {/* 数据展示 */}
//       <Card title="筛选结果" style={{ marginBottom: 24 }}>
//         <List
//           dataSource={filteredData}
//           renderItem={(item) => <List.Item>{item.content}</List.Item>}
//         />
//       </Card>

//       {/* 聊天区域 */}
//       <Card title="PIR Assistant">
//         <div
//           style={{
//             height: 400,
//             overflowY: 'auto',
//             marginBottom: 16,
//             border: '1px solid #f0f0f0',
//             padding: 16,
//           }}
//         >
//           {messages.map((msg, index) => (
//             <ChatMessage key={index} message={msg} isUser={msg.isUser} />
//           ))}
//         </div>

//         <Input.Group compact>
//           <Input
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder="输入您的问题..."
//             style={{ width: '90%' }}
//             onPressEnter={handleSend}
//           />
//           <Button
//             type="primary"
//             icon={<SendOutlined />}
//             onClick={handleSend}
//             style={{ width: '10%' }}
//           >
//             {/* Send */}
//           </Button>
//         </Input.Group>
//       </Card>
//     </Card>
//   );
// };

// export default ChatDashboard;

import { useState } from 'react';
import {
  Card,
  Collapse,
  DatePicker,
  Button,
  List,
  Input,
  Tag,
  theme,
} from 'antd';
import {
  FilterOutlined,
  RobotOutlined,
  SendOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import styled, { keyframes } from 'styled-components';

// 未来感动画
const hologram = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
`;

const wave = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// 科技白主题容器
const LightSciFiCard = styled(Card)`
  background: linear-gradient(145deg, #f8f9fa, #ffffff) !important;
  border: 1px solid rgba(24, 144, 255, 0.2) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(24, 144, 255, 0.08) !important;
  color: #2c3e50 !important;

  .ant-card-head {
    border-bottom: 1px solid rgba(24, 144, 255, 0.1) !important;
    color: #1890ff !important;
  }
`;

// 透明玻璃输入框
const GlassInput = styled(Input)`
  background: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid rgba(24, 144, 255, 0.3) !important;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff !important;
    box-shadow: 0 0 12px rgba(24, 144, 255, 0.1) !important;
  }

  &:focus {
    border-color: #1890ff !important;
    animation: ${hologram} 1.5s infinite;
  }
`;

// 悬浮按钮
const HoverButton = styled(Button)`
  background: linear-gradient(45deg, #1890ff, #40a9ff) !important;
  border: none !important;
  border-radius: 8px !important;
  color: #fff !important;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: rotate(45deg);
    animation: ${wave} 3s infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(24, 144, 255, 0.2) !important;
  }
`;

// 数据面板
const DataPanel = styled.div`
  background: rgba(24, 144, 255, 0.03);
  border: 1px solid rgba(24, 144, 255, 0.15);
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  position: relative;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }
`;

// 在组件中使用
const LightThemeDashboard = () => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        background: '#f8f9fa',
        minHeight: '100vh',
        padding: 24,
      }}
    >
      <LightSciFiCard
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RadarChartOutlined
              style={{
                fontSize: 24,
                color: token.colorPrimary,
                marginRight: 12,
              }}
            />
            <span
              style={{
                fontSize: 20,
                background: 'linear-gradient(45deg, #1890ff, #40a9ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI 数据分析中枢
            </span>
          </div>
        }
      >
        {/* 筛选区域 */}
        <Collapse ghost expandIconPosition="end" defaultActiveKey={['1']}>
          <Collapse.Panel
            key="1"
            header={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FilterOutlined style={{ color: token.colorPrimary }} />
                <span style={{ marginLeft: 8, color: '#2c3e50' }}>
                  智能筛选器
                </span>
                <Tag
                  color="blue"
                  style={{
                    marginLeft: 12,
                    background: 'rgba(24, 144, 255, 0.1)',
                    borderColor: 'rgba(24, 144, 255, 0.3)',
                  }}
                >
                  v2.1.5
                </Tag>
              </div>
            }
          >
            <DataPanel>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                suffixIcon={<RobotOutlined />}
                className="glass-picker"
              />
              {/* 其他筛选组件 */}
            </DataPanel>
          </Collapse.Panel>
        </Collapse>

        {/* 聊天区域 */}
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              border: '1px solid rgba(24, 144, 255, 0.2)',
              borderRadius: 12,
              padding: 16,
              background: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <GlassInput
              placeholder="输入您的问题..."
              suffix={
                <HoverButton icon={<SendOutlined />} shape="round">
                  智能发送
                </HoverButton>
              }
            />
          </div>
        </div>
      </LightSciFiCard>
    </div>
  );
};

// 全局样式
import { createGlobalStyle } from 'styled-components';

const LightGlobalStyle = createGlobalStyle`
  .glass-picker {
    background: rgba(255, 255, 255, 0.8) !important;
    border: 1px solid rgba(24, 144, 255, 0.3) !important;
    border-radius: 8px !important;

    .ant-picker-input > input {
      color: #2c3e50 !important;
    }
  }

  .ant-collapse-content {
    background: transparent !important;
    border: none !important;
  }

  .ant-tag {
    backdrop-filter: blur(2px);
  }
`;

export default () => (
  <>
    <LightGlobalStyle />
    <LightThemeDashboard />
  </>
);
