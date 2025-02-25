import React, { useState, useMemo } from 'react';
import { Input, Button, Tag, List } from 'antd';

// 正则表达式特殊字符转义
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const CommonSearch = ({ data = [], dataKey = 'content' }) => {
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 过滤后的数据
  const filteredData = useMemo(() => {
    if (!keywords.length) return [];
    return data.filter((item) =>
      keywords.some((kw) => item[dataKey].includes(kw))
    );
  }, [keywords, data, dataKey]);

  // 关键字统计
  const keywordStats = useMemo(() => {
    return keywords.reduce((stats, kw) => {
      stats[kw] = filteredData.filter((item) =>
        item[dataKey].includes(kw)
      ).length;
      return stats;
    }, {});
  }, [keywords, filteredData, dataKey]);

  // 添加关键字
  const handleAddKeyword = () => {
    const kw = inputValue.trim();
    if (kw && !keywords.includes(kw)) {
      setKeywords([...keywords, kw]);
      setInputValue('');
    }
  };

  // 移除关键字
  const handleRemoveKeyword = (removedKw) => {
    setKeywords(keywords.filter((kw) => kw !== removedKw));
  };

  // 高亮文本
  const highlightText = (text) => {
    if (!keywords.length) return text;

    const regex = new RegExp(`(${keywords.map(escapeRegExp).join('|')})`, 'g');

    return text.split(regex).map((part, index) => {
      return keywords.includes(part) ? (
        <span key={index} style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Input.Group compact style={{ marginBottom: 8 }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入搜索关键字"
          style={{ width: '60%' }}
          onPressEnter={handleAddKeyword}
        />
        <Button
          type="primary"
          onClick={handleAddKeyword}
          style={{ width: '40%' }}
        >
          添加搜索条件
        </Button>
      </Input.Group>

      <div style={{ marginBottom: 8 }}>
        {keywords.map((keyword) => (
          <Tag
            key={keyword}
            closable
            onClose={() => handleRemoveKeyword(keyword)}
            style={{ marginBottom: 4 }}
          >
            {keyword} (命中: {keywordStats[keyword] || 0})
          </Tag>
        ))}
      </div>

      <List
        bordered
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item>{highlightText(item[dataKey])}</List.Item>
        )}
      />
    </div>
  );
};
