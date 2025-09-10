import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useState } from "react";

const WriteMessage = ({ onSuccess }: { onSuccess: () => void }) => {
      const [content, setContent] = useState("");
      const [title, setTitle] = useState("");

     const handleSubmit = async (data: { title: string; content: string }) => {
        try {
        await axios.post(`${import.meta.env.VITE_API_URL}board/create`, data, {
            withCredentials: true,
        });
        onSuccess();
        setTitle('')
        setContent('')
        } catch (err) {
        console.error("Ошибка при создании поста:", err);
        }
  };

 return (
    <div className="w-2xs md:w-2xl mx-auto flex flex-col p-3 border-1 border-solid border-gray-100 rounded-xl mt-3">
      <div className="flex items-start gap-3 mb-8">
            <Avatar size="large" icon={<UserOutlined />} className="shrink-0"/>
        <div className="flex flex-col w-full gap-3">
            <Input placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            <TextArea
                placeholder="Сообщение"
                value={content}
                required
                showCount
                maxLength={100}
                onChange={(e) => setContent(e.target.value)}
                style={{ height: 60, resize: 'none' }}
            />
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          type="primary" 
          onClick={() => handleSubmit({title: title, content: content})} 
          disabled={!content.trim()}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
}

export default WriteMessage