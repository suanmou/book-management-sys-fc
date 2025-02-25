// import React, { useState } from 'react';
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Tag,
//   Space,
// } from 'antd';
// import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { CommonSearch } from './CommonSearch';

// interface Keyword {
//   key: string;
//   value: string;
// }

// interface TagItem {
//   id: string;
//   name: string;
//   keywords: Keyword[];
//   weight: number;
// }

// export const TagManage: React.FC = () => {
//   const [form] = Form.useForm();
//   const [tags, setTags] = useState<TagItem[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingTag, setEditingTag] = useState<TagItem | null>(null);

//   // 列定义
//   const columns = [
//     {
//       title: '标签名称',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: '关键字',
//       dataIndex: 'keywords',
//       key: 'keywords',
//       render: (keywords: Keyword[]) => (
//         <Space wrap>
//           {keywords.map((k, index) => (
//             <Tag color="blue" key={index}>
//               {k.value}
//             </Tag>
//           ))}
//         </Space>
//       ),
//     },
//     {
//       title: '权重',
//       dataIndex: 'weight',
//       key: 'weight',
//       sorter: (a: TagItem, b: TagItem) => a.weight - b.weight,
//     },
//     {
//       title: '操作',
//       key: 'action',
//       render: (_: any, record: TagItem) => (
//         <Space>
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record.id)}
//           />
//         </Space>
//       ),
//     },
//   ];

//   // 处理表单提交
//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       const newTag = {
//         id: editingTag?.id || String(Date.now()),
//         name: values.name,
//         keywords: values.keywords,
//         weight: values.weight,
//       };

//       if (editingTag) {
//         setTags(tags.map((t) => (t.id === editingTag.id ? newTag : t)));
//       } else {
//         setTags([...tags, newTag]);
//       }

//       setIsModalVisible(false);
//       form.resetFields();
//     } catch (error) {
//       console.error('Validation failed:', error);
//     }
//   };

//   // 处理编辑
//   const handleEdit = (tag: TagItem) => {
//     setEditingTag(tag);
//     form.setFieldsValue({
//       name: tag.name,
//       keywords: tag.keywords,
//       weight: tag.weight,
//     });
//     setIsModalVisible(true);
//   };

//   // 处理删除
//   const handleDelete = (id: string) => {
//     setTags(tags.filter((tag) => tag.id !== id));
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => {
//           setEditingTag(null);
//           setIsModalVisible(true);
//         }}
//         style={{ marginBottom: 16 }}
//       >
//         新建标签
//       </Button>

//       <Table
//         columns={columns}
//         dataSource={tags}
//         rowKey="id"
//         bordered
//         pagination={{ pageSize: 8 }}
//       />

//       <Modal
//         title={editingTag ? '编辑标签' : '新建标签'}
//         visible={isModalVisible}
//         onOk={handleSubmit}
//         onCancel={() => {
//           setIsModalVisible(false);
//           form.resetFields();
//         }}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="标签名称"
//             name="name"
//             rules={[{ required: true, message: '请输入标签名称' }]}
//           >
//             <Input placeholder="例如：科技" />
//           </Form.Item>

//           <Form.Item
//             label="关键字"
//             name="keywords"
//             rules={[{ required: true, message: '至少需要添加一个关键字' }]}
//           >
//             <Form.List name="keywords">
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, ...restField }) => (
//                     <Space
//                       key={key}
//                       style={{
//                         display: 'flex',
//                         marginBottom: 20,
//                       }}
//                     >
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'value']}
//                         rules={[{ required: true, message: '请输入关键字' }]}
//                         style={{ marginBottom: 0 }}
//                       >
//                         <Input placeholder="关键字内容" />
//                       </Form.Item>
//                       <Button
//                         type="dashed"
//                         onClick={() => remove(name)}
//                         icon={<DeleteOutlined />}
//                       />
//                     </Space>
//                   ))}
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     block
//                     icon={<PlusOutlined />}
//                   >
//                     添加关键字
//                   </Button>
//                 </>
//               )}
//             </Form.List>
//           </Form.Item>

//           <Form.Item
//             label="权重"
//             name="weight"
//             rules={[
//               { required: true, message: '请输入权重' },
//               { type: 'number', min: 1, max: 10, message: '权重范围 1-10' },
//             ]}
//           >
//             <InputNumber min={1} max={10} style={{ width: '100%' }} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// 使用示例
// export const TagManage = () => {
//   const testData = [
//     { id: 1, content: 'Ant Design 是一个优秀的 React UI 库' },
//     { id: 2, content: 'React 是一个用于构建用户界面的 JavaScript 库' },
//     { id: 3, content: '前端开发需要掌握 JavaScript 和 CSS' },
//     { id: 4, content: 'TypeScript 是 JavaScript 的超集' },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>搜索实例 1</h2>
//       <CommonSearch data={testData} />

//       <h2 style={{ marginTop: 32 }}>搜索实例 2</h2>
//       <CommonSearch data={testData} dataKey="content" />
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Button } from 'antd';
import SearchComponent from './SearchComponent';

const dataSource = [
  { id: 1, name: 'Apple', description: 'A delicious fruit' },
  { id: 2, name: 'Banana', description: 'A popular fruit' },
  { id: 3, name: 'Cherry', description: 'A small red fruit' },
];

export const TagManage = () => {
  const [searchComponents, setSearchComponents] = useState([
    <SearchComponent key={0} dataSource={dataSource} />,
  ]);

  const handleAddSearchComponent = () => {
    setSearchComponents([
      ...searchComponents,
      <SearchComponent key={searchComponents.length} dataSource={dataSource} />,
    ]);
  };

  return (
    <div>
      <Button onClick={handleAddSearchComponent}>添加搜索组件</Button>
      {searchComponents}
    </div>
  );
};
