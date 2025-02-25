import { Button } from 'antd';
import { CommonSearch } from './CommonSearch';
import { useState } from 'react';

// 增强版 DemoPage
export const TagManage = () => {
  const [searchComponents, setSearchComponents] = useState([]);
  const testData = [
    { id: 1, content: 'Ant Design 是一个优秀的 React UI 库' },
    { id: 2, content: 'React 是一个用于构建用户界面的 JavaScript 库' },
    { id: 3, content: '前端开发需要掌握 JavaScript 和 CSS' },
    { id: 4, content: 'TypeScript 是 JavaScript 的超集' },
  ];

  // 添加新的搜索组件
  const addSearchComponent = () => {
    const newKey = Date.now();
    setSearchComponents([...searchComponents, newKey]);
  };

  // 移除指定搜索组件
  const removeSearchComponent = (key) => {
    setSearchComponents((prev) => prev.filter((k) => k !== key));
  };

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={addSearchComponent}
        style={{ marginBottom: 24 }}
      >
        添加新的搜索组件
      </Button>

      {searchComponents.map((key) => (
        <div key={key} style={{ position: 'relative', marginBottom: 32 }}>
          <Button
            type="link"
            danger
            style={{ position: 'absolute', right: 0, top: -10 }}
            onClick={() => removeSearchComponent(key)}
          >
            删除该搜索组件
          </Button>
          <CommonSearch data={testData} dataKey="content" />
        </div>
      ))}
    </div>
  );
};
