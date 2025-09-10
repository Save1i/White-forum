import { Avatar, Card, Button, Tooltip, Tag } from "antd";
import { UserOutlined, LikeOutlined, StarOutlined, FireOutlined, StarFilled, LikeFilled, DeleteOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router";
import type { Msg } from "../types";
import axios from "axios";
import { useState } from "react";
import { message as antdMessage } from "antd";

const Message = ({ message, fetchMessages }: { message: Msg, fetchMessages: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [liked, setLiked] = useState(message.liked_by_user);
  const [likeCount, setLikeCount] = useState(message.like_count ?? 0);

  const [favorite, setFavorite] = useState(message.favorited_by_user);
  const [favoriteCount, setFavoriteCount] = useState(message.favorite_count ?? 0);
  const [priorityCount, setPriorityCount] = useState(message.priority ?? 0);

  console.log(message)

  const handleClick = () => {
    const target = `/board/${message.id}/comments`;
    if (location.pathname !== target) {
      navigate(target);
    }
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    axios.post(`${import.meta.env.VITE_API_URL}board/${message.id}/like`, 
      {}, // empty body
      {withCredentials: true}
    ).then(response => {
      console.log(response.data)

      const { liked_by_user, like_count } = response.data;
      console.log(liked_by_user)

      setLiked(liked_by_user);
      setLikeCount(like_count);
    }).catch(err => {
      console.error("Ошибка при лайке:", err);
    });
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    axios.post(`${import.meta.env.VITE_API_URL}board/${message.id}/favorite`, 
      {}, // empty body
      {withCredentials: true}
    ).then(response => {
      console.log(response.data, "f")

      const { favorited_by_user, favorite_count } = response.data;

      setFavorite(favorited_by_user);
      setFavoriteCount(favorite_count);
    }).catch(err => {
      console.error("Ошибка при добавлении в избранное:", err);
    });
  }

  const togglePriority = (e: React.MouseEvent) => {
    e.stopPropagation()
    axios.post(`${import.meta.env.VITE_API_URL}board/${message.id}/priority`, 
      {}, // empty body
      {withCredentials: true}
    ).then(response => {
      console.log(response.data, 'p')

      const { newPriority } = response.data;

      setPriorityCount(newPriority)
    }).catch(err => {
      console.error("Ошибка при добавлении приоритета:", err);
    });
  }

  const deleteMessage = (e: React.MouseEvent) => {
    e.stopPropagation()
    axios.delete(`${import.meta.env.VITE_API_URL}board/${message.id}`,
      {withCredentials: true}
    ).then(response => {
      console.log(response.data)
        antdMessage.success("Пост успешно удален");
        fetchMessages()
    }).catch(err => {
      console.error("Ошибка при удалении поста:", err);
      antdMessage.error("Ошибка при удалении поста");
    });
  }

  return (
      <Card
        className="w-2xs md:w-2xl cursor-pointer"
        onClick={handleClick}
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="large" icon={<UserOutlined />} />
              <span className="font-semibold text-lg">{message.username}</span>
            </div>
            <Tooltip title="Удалить">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMessage(e);
                }}
              />
            </Tooltip>
          </div>
        }
        actions={[
          <Tooltip title="Лайк" key="like">
            <div className="flex items-center justify-center gap-1" onClick={toggleLike}>
              <Button type="text"
                icon={
                liked 
                  ? <LikeFilled className="!text-blue-500"/>
                  : <LikeOutlined className="!text-gray-400"/>}
              />
              <span>{likeCount ?? 0}</span>
            </div>
          </Tooltip>,
          <Tooltip title="В избранное" key="star">
            <div className="flex items-center justify-center gap-1" onClick={toggleFavorite}>
              <Button type="text" icon={
                favorite
                  ? <StarFilled className="!text-yellow-500" />
                  : <StarOutlined className="!text-gray-400" />
              } />
              <span>{favoriteCount ?? 0}</span>
            </div>
          </Tooltip>,
          <Tooltip title="Приоритет" key="priority">
            <Tag color="red" icon={<FireOutlined />} onClick={togglePriority}>
              <span>{priorityCount ?? 0}</span>
            </Tag>
          </Tooltip>,
        ]}
      >
        <p className="text-2xl mb-3">{message.title}</p>
        <p>{message.content}</p>
      </Card>
  );
};

export default Message;
