import { useState } from "react";
import axios from "axios";
import { Input, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const WriteComment = ({ postId, setSendComment }: { postId: string | undefined, setSendComment: Function }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const insertComment = async () => {
    if (!comment.trim()) return; // пустые не отправляем
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}board/${postId}/comments`,
        { content: comment },
        { withCredentials: true }
      );
      console.log("Комментарий отправлен:", response.data);
      setComment("");
        setSendComment((prev: boolean) => !prev)
    } catch (err) {
      console.error("Ошибка при отправке комментария:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-2xs md:w-2xl mx-auto flex flex-col p-3 border-1 border-solid border-gray-100 rounded-xl mt-3">
      <div className="flex items-center gap-3 mb-8">
        <Avatar size="large" icon={<UserOutlined />} className="shrink-0"/>
      <TextArea
      placeholder="Введите ваш комментарий..."
      value={comment}
      showCount
      maxLength={1000}
      onChange={(e) => setComment(e.target.value)}
      style={{ height: 60, resize: 'none' }}
    />
      </div>
      <div className="flex justify-end">
        <Button 
          type="primary" 
          onClick={insertComment} 
          loading={loading}
          disabled={!comment.trim()}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default WriteComment;