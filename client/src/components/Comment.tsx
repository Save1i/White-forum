import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface CommentCardProps {
  comment?: { username: string; content: string };
}

const CommentCard = ({ comment }: CommentCardProps) => {



  return (
    <Card
      className="w-2xs md:w-2xl"
      title={
        <div className="flex items-center gap-3">
          <Avatar size="large" icon={<UserOutlined />} />
          <span>{comment?.username}</span>
        </div>
      }
    >
      <p>{comment?.content}</p>
    </Card>
  );
};

export default CommentCard;