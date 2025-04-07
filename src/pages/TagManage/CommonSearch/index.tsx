import React, { useState, useMemo, useEffect } from 'react';
import {
  Input,
  Button,
  Tag,
  List,
  Typography,
  message,
  Switch,
  Row,
  Col,
  DatePicker,
} from 'antd';
import { useCallback } from 'react';
import { SearchConfig } from '..';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

// 正则表达式特殊字符转义
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const CommonSearch = ({
  config,
  onUpdate,
  data,
  showDateFilter: initialShowDate = true,
  onFilterChange,
}: {
  config: SearchConfig;
  onUpdate: (updates: Partial<SearchConfig>) => void;
  data: any;
  showDateFilter: boolean;
  onFilterChange?: (data: Array<any>) => void;
}) => {
  const [keywords, setKeywords] = useState(config.keywords || []);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState(config.title);
  const [dateRange, setDateRange] = useState([]);
  const [showDateFilter, setShowDateFilter] = useState(initialShowDate);
  const { dataKey } = config;
  useEffect(() => {
    onUpdate({ keywords, title });
  }, [keywords, title, dateRange]);
  // 标题修改处理
  const handleTitleEdit = (newTitle) => {
    if (!newTitle.trim()) {
      message.error('标题不能为空');
      return;
    }
    if (newTitle.length > 20) {
      message.error('标题不能超过20字');
      return;
    }
    setTitle(newTitle);
    onTitleChange?.(newTitle); // 触发外部回调
  };
  // 处理日期范围变化
  const handleDateChange = (dates) => {
    setDateRange(dates || []);
  };
  // 过滤后的数据
  const filteredData = useMemo(() => {
    if (!keywords.length) return [];
    return data.filter((item) => {
      const dateMatch =
        !showDateFilter ||
        dateRange.length === 0 ||
        (new Date(item['createTime']) >= dateRange[0] &&
          new Date(item['createTime']) <= dateRange[1]);
      return dateMatch && keywords.some((kw) => item[dataKey].includes(kw));
    });
  }, [keywords, data, dataKey]);
  useEffect(() => {
    // 每当筛选结果变化时触发回调
    if (typeof onFilterChange === 'function') {
      onFilterChange(filteredData);
    }
  }, [filteredData]); // 依赖筛选结果数据
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

  // 标题组件
  const TitleWithCount = () => (
    <div style={{ display: 'flex', alignItems: 'end' }}>
      <Typography.Title
        level={5}
        editable={{
          onChange: handleTitleEdit,
          triggerType: ['text', 'icon'],
          maxLength: 20,
          autoSize: { maxRows: 2 },
        }}
        // style={{
        // //   marginBottom: 16,
        //   cursor: 'pointer',
        //   //   borderBottom: '2px solid #1890ff',
        //   paddingBottom: 4,
        // }}
        style={{ marginRight: 16, marginBottom: 0 }}
      >
        {title}
      </Typography.Title>
      <Tag color="blue" style={{ marginTop: 4 }}>
        匹配总数: {filteredData.length}
      </Tag>
    </div>
  );
  const tagColors = ['gold', 'geekblue', 'green'];

  // 获取每个数据项的匹配标签
  const getMatchedTags = useCallback(
    (content) => {
      return keywords.filter((kw) => content.includes(kw));
    },
    [keywords]
  );
  return (
    <div
      style={{
        marginBottom: 24,
        border: '1px solid #f0f0f0',
        borderRadius: 8,
        padding: 16,
      }}
    >
      {/* 可编辑标题 */}
      {/* <Typography.Title
        level={4}
        editable={{
          onChange: handleTitleEdit,
          triggerType: ['text', 'icon'],
          maxLength: 20,
          autoSize: { maxRows: 2 },
        }}
        style={{
          marginBottom: 16,
          cursor: 'pointer',
          //   borderBottom: '2px solid #1890ff',
          paddingBottom: 4,
        }}
      >
        {title}
        
      </Typography.Title> */}
      {/* 带统计的标题 */}
      <div style={{ marginBottom: 16 }}>
        <TitleWithCount />
      </div>
      <Row gutter={16} align="middle" style={{ marginBottom: 8 }}>
        {/* <Col>
          <Switch
            checkedChildren={<CalendarOutlined />}
            unCheckedChildren={<CalendarOutlined />}
            checked={showDateFilter}
            onChange={setShowDateFilter}
          />
        </Col> */}
        {showDateFilter && (
          <Col flex="auto">
            <RangePicker
              style={{ width: '100%', marginBottom: 8 }}
              onChange={handleDateChange}
            />
          </Col>
        )}
        <Col flex="auto">
          <Input.Group compact style={{ width: '100%', marginBottom: 8 }}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入搜索关键字"
              style={{ width: '100%' }}
              onPressEnter={handleAddKeyword}
            />
          </Input.Group>
        </Col>
      </Row>

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
          //   <List.Item>{highlightText(item[dataKey])}</List.Item>
          <List.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* 原始内容 */}
              <span>{item[dataKey]}</span>

              {/* 匹配标签 */}
              <div>
                {getMatchedTags(item[dataKey]).map((kw, index) => (
                  <Tag
                    key={kw}
                    color={tagColors[index % 3]}
                    style={{ marginLeft: 4, marginBottom: 4 }}
                  >
                    {kw}
                  </Tag>
                ))}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
