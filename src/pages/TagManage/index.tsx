import { Button, Col, Row } from 'antd';
import { CommonSearch } from './CommonSearch';
import { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
export type SearchConfig = {
  id: string;
  title: string;
  keywords: string[];
  dataKey: string;
};
import Chat from './Chat';
// 增强版 DemoPage
export const TagManage = () => {
  const [configs, setConfigs] = useState<SearchConfig[]>(() => {
    const saved = localStorage.getItem('searchConfigs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchConfigs', JSON.stringify(configs));
  }, [configs]);

  const [searchComponents, setSearchComponents] = useState([Date.now()]);
  const testData = [
    { id: 1, content: 'Ant Design 是一个优秀的 React UI 库' },
    { id: 2, content: 'React 是一个用于构建用户界面的 JavaScript 库' },
    { id: 3, content: '前端开发需要掌握 JavaScript 和 CSS' },
    { id: 4, content: 'TypeScript 是 JavaScript 的超集' },
  ];

  // 添加新的搜索组件
  const addSearchComponent = () => {
    const newConfig: SearchConfig = {
      id: Date.now().toString(),
      title: `搜索组 ${configs.length + 1}`,
      keywords: [],
      dataKey: 'content',
    };
    setConfigs([...configs, newConfig]);
    // const newKey = Date.now();
    // setSearchComponents([...searchComponents, newKey]);
  };

  const updateConfig = (id: string, updates: Partial<SearchConfig>) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.id === id ? { ...config, ...updates } : config
      )
    );
  };

  const deleteConfig = (id: string) => {
    setConfigs((prev) => prev.filter((config) => config.id !== id));
  };
  // 移除指定搜索组件
  const removeSearchComponent = (key) => {
    setSearchComponents((prev) => prev.filter((k) => k !== key));
  };

  return (
    <div style={{ padding: 24 }}>
      <Chat></Chat>
      {/* <Button
        type="primary"
        onClick={addSearchComponent}
        style={{ marginBottom: 24 }}
      >
        添加新的搜索组件
      </Button> */}
      <Row gutter={[24, 32]} justify="start" style={{ marginTop: '24px' }}>
        {configs.map((config, index) => (
          <Col
            key={config.id}
            xs={24} // 超小屏幕（<576px）：1列
            sm={12} // 小屏幕（≥576px）：2列
            md={8} // 中等屏幕（≥768px）：3列
            lg={8} // 大屏幕（≥992px）：3列
            xl={6} // 超大屏幕（≥1200px）：4列
            style={{ minWidth: 300 }}
          >
            <div
              key={config.id}
              style={{ position: 'relative', marginBottom: 32 }}
            >
              <Button
                type="link"
                danger
                style={{ position: 'absolute', right: 0, top: 10 }}
                onClick={() => deleteConfig(config.id)}
              >
                <DeleteOutlined />
              </Button>
              <CommonSearch
                key={config.id}
                data={testData}
                config={config}
                onUpdate={(updates) => updateConfig(config.id, updates)}
              />
            </div>
          </Col>
        ))}
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={6}
          style={{
            minWidth: 300,
            // 根据最后一个元素的位置决定是否显示在新行
            order: searchComponents.length + 1,
          }}
        >
          <div
            onClick={addSearchComponent}
            style={{
              height: '100%',
              border: '2px dashed #d9d9d9',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 16,
              // backgroundColor: '#fafafa',
              ':hover': {
                borderColor: '#1890ff',
                color: '#1890ff',
              },
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <PlusCircleOutlined style={{ fontSize: 30, marginBottom: 8 }} />
              {/* <PlusCircleTwoTone style={{ fontSize: 30, marginBottom: 8 }} /> */}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
