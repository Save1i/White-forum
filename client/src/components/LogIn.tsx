// src/pages/LogIn.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Input, Button, Card, Typography, message as antdMessage } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("WOWOWOWOWO")

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}user/log-in`,
        { username, password },
        { withCredentials: true }
      );

      console.log("Login success:", res.data);
      antdMessage.success("Добро пожаловать!");
      navigate("/board");
    } catch (err: any) {
      console.error("Login error:", err);
      antdMessage.error("Неверные данные для входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Card
        className="shadow-2xl rounded-2xl w-[350px]"
      >
        <div className="text-center mb-6">
          <Title level={3}>Log In</Title>
          <Text type="secondary">Введите данные для входа</Text>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg"
          />
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg"
          />

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            icon={<LoginOutlined />}
            className="mt-2 rounded-xl hover:scale-105 transition-transform"
          >
            Войти
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LogIn;
