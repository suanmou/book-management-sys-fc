import { Button, Card, Form, Input, message, Popconfirm } from 'antd';
import './index.css';
import { useEffect, useState } from 'react';
import { deleteBook, list } from '../../interfaces';
import { CreateaBookModal } from './CreateBookModal';
import { UpdateBookModal } from './UpdateBookModal';

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export function BookManage() {
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [name, setName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [updateNum, setUpdateNum] = useState(0);

  const fetchData = async (searchText: string) => {
    try {
      const res = await list(searchText);
      if (res.status === 201 || res.status === 200) {
        setBookList(res.data);
      }
    } catch (e: any) {
      message.error(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData(name);
  }, [name, updateNum]);

  const searchBook = async (values: { name: string }) => {
    setName(values.name);
  };

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setUpdateNum(Math.random());
  };
  const handleOpen = () => {
    setIsCreateModalOpen(true);
  };

  async function handleDelete(id: number) {
    try {
      await deleteBook(id);
      message.success('删除成功');
      setUpdateNum(Math.random());
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }

  return (
    <div className="bookManage">
      <CreateaBookModal isOpen={isCreateModalOpen} handleClose={handleClose} />
      <UpdateBookModal
        id={updateId}
        isOpen={isUpdateBookModalOpen}
        handleClose={() => {
          setUpdateBookModalOpen(false);
          setUpdateNum(Math.random());
        }}
      ></UpdateBookModal>
      <h1>图书管理系统</h1>
      <div className="content">
        <div className="book-search">
          <Form
            name="search"
            layout="inline"
            colon={false}
            onFinish={searchBook}
          >
            <Form.Item label="图书名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                搜索图书
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: 'green' }}
                onClick={handleOpen}
              >
                添加图书
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="book-list">
          {bookList.map((book) => {
            return (
              <Card
                className="card"
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src={`http://localhost:3000/${book.cover}`}
                  />
                }
              >
                <h2>{book.name}</h2>
                <div>{book.author}</div>
                <div className="links">
                  <a href="#">详情</a>
                  <a
                    href="#"
                    onClick={() => {
                      setUpdateId(book.id);
                      setUpdateBookModalOpen(true);
                    }}
                  >
                    编辑
                  </a>
                  <Popconfirm
                    title="图书删除"
                    description="确认删除吗？"
                    onConfirm={() => handleDelete(book.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">删除</a>
                  </Popconfirm>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
