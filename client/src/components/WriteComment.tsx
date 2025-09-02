import { useState } from "react";
import axios from "axios";
import { Input, Button, Card } from "antd";

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
    <Card className="w-full max-w-xl mx-auto mt-4 shadow-md rounded-2xl">
      <h3 className="text-lg font-semibold mb-2">Написать комментарий</h3>
      <TextArea
        rows={3}
        placeholder="Введите ваш комментарий..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mb-3"
      />
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
    </Card>
  );
};

export default WriteComment;