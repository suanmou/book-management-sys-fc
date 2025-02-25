import React, { useState } from 'react';
import { Input, Button, List, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

const SearchComponent = ({ dataSource }) => {
  const [keywords, setKeywords] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [keywordCount, setKeywordCount] = useState({});

  const handleAddKeyword = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '请输入关键字';
    document.body.appendChild(input);
    input.focus();

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const newKeyword = input.value.trim();
        if (newKeyword) {
          setKeywords([...keywords, newKeyword]);
          handleSearch([...keywords, newKeyword]);
        }
        document.body.removeChild(input);
      }
    });
  };

  const handleSearch = (newKeywords) => {
    const newSearchResult = dataSource.filter((item) =>
      newKeywords.some((keyword) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );

    const newKeywordCount = {};
    newKeywords.forEach((keyword) => {
      newKeywordCount[keyword] = newSearchResult.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(keyword.toLowerCase())
        )
      ).length;
    });

    setSearchResult(newSearchResult);
    setKeywordCount(newKeywordCount);
  };

  const renderHighlightedText = (text) => {
    return (
      <Highlighter
        highlightClassName="highlight"
        searchWords={keywords}
        autoEscape
        textToHighlight={text.toString()}
      />
    );
  };

  return (
    <div>
      <Button onClick={handleAddKeyword}>添加关键字</Button>
      <div>
        {keywords.map((keyword, index) => (
          <Tag key={index}>
            {keyword} ({keywordCount[keyword] || 0})
          </Tag>
        ))}
      </div>
      <List
        dataSource={searchResult}
        renderItem={(item) => (
          <List.Item>
            {Object.values(item).map((value, index) => (
              <span key={index}>{renderHighlightedText(value)} </span>
            ))}
          </List.Item>
        )}
      />
      <style>
        {`
          .highlight {
            background-color: yellow;
          }
        `}
      </style>
    </div>
  );
};

export default SearchComponent;
