import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../types";
import { Card, Avatar, Tooltip, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";
import NavBar from "../components/NavBar";
import ChangeUserForm from "../components/ChangeUserForm";
import { useAuth } from "../hooks/useAuth";

const { Meta } = Card;

const AllUsers = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isUpdated, setisUpdated] = useState<boolean>(false);
  const [chosenUser, setChosenUser] = useState<User | undefined>(undefined)

  const fetchUsers = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}user`, {
        withCredentials: true,
      })
      .then((response) => setUsers(response.data))
      .catch((err) =>
        console.error("Ошибка при получении пользователй:", err)
      );
  };

  useEffect(() => {
    fetchUsers();
    setIsOpenForm(false)
  }, [isUpdated]);

    if (!loading && user?.role !== "admin") {
        return <p className="text-red-500 text-center mt-10">Доступ запрещён</p>;
    }


  const openForm = (el: User) => {
    setChosenUser(el)
    setIsOpenForm(true)
  }

  return (
    <>
  {isOpenForm && chosenUser && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
        <ChangeUserForm
          user={chosenUser}
          onSuccess={setisUpdated}
          closeForm={setIsOpenForm}
        />
      </div>
    </div>
  )}
    <NavBar/>
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {users && users.length > 0 ? (
        users.map((el) => (
          <Card
            key={el.id}
            style={{
              minWidth: 300,
              width: 300,
              border: el.role === "admin" ? "2px solid #f5222d" : "1px solid #f0f0f0",
            }}
            className="shadow-md hover:shadow-xl transition-shadow duration-300"
            actions={[
              <Tooltip title="Редактировать" key="edit">
                <EditOutlined onClick={(e) => {
                    e.stopPropagation(),
                    openForm(el)
                }}/>
              </Tooltip>,
              <Tooltip title="Удалить" key="delete">
                <DeleteOutlined />
              </Tooltip>,
              <Tooltip title="Подробнее" key="ellipsis">
                <EllipsisOutlined />
              </Tooltip>,
            ]}
          >
            <Meta
              avatar={
                <Avatar
                  icon={<UserOutlined />}
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${el.username}`}
                />
              }
              title={
                <div className="flex items-start flex-col">
                  <span>{el.name}</span>
                  {el.role === "admin" ? <Tag color="red">admin</Tag> : <Tag color="blue">user</Tag>}
                </div>
              }
              description={
                <div>
                  <p className="text-gray-600">@{el.username}</p>
                  <p className="text-sm text-gray-500">{el.email}</p>
                  <p className="text-sm text-gray-500">{el.adress}</p>
                </div>
              }
            />
          </Card>
        ))
      ) : (
        <p className="text-gray-500 text-lg">Нет пользователей</p>
      )}
    </div>
    </>
  );
};

export default AllUsers;