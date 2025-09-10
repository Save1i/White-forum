import { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import NavBar from "../components/NavBar";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  password_hash: string;
  role: string;
};

const Profile = () => {
    const { user } = useAuth();

      const [form] = Form.useForm<User>();

        useEffect(() => {
            if (user) {
            form.setFieldsValue(user); // обновляем поля, когда user изменился
            }
        }, [user, form]);

    const handleSubmit = async (values: User) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}user/${user?.id}`, values, {
                withCredentials: true
            })
            console.log("Updated user:", values);
            message.success("Изменения сохранены");
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
        }
    }

    console.log(user)

  return (
    <>
    <NavBar/>
    <div style={{ padding: "16px" }}>
      <Card
        title="Профиль"
        style={{
          maxWidth: 500,
          margin: "0 auto",
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Адрес" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Пароль" name="password_hash" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </>
  );
};

export default Profile;