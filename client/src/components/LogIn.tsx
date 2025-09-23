// src/pages/LogIn.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Input, Button, Form, Card, Typography, message as antdMessage } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";
import { logIn, register } from "../api/auth";

const { Title, Text } = Typography;

const LogIn = () => {
  const [isRegistration, setIsRegistration] = useState(false)
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("WOWOWOWOWO")

    try {
      if (isRegistration) {
        await register(username, email, password);
        antdMessage.success("Регистрация прошла успешно!");
        setIsRegistration(false);
      } else {
        await logIn(username, password);
        antdMessage.success("Добро пожаловать!");
        navigate("/board");
      }
    } catch (err) {
      console.error(err);
      antdMessage.error(
        isRegistration ? "Ошибка при регистрации" : "Неверные данные для входа"
      );
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
          <Title level={3}>{isRegistration ? "Register" : "Log In"}</Title>
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
          {
            isRegistration && 
          <Input
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
            className="rounded-lg"
          />
          }
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg"
          />

          <Form.Item>
            <Button
              block
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              className="mt-2 rounded-xl hover:scale-105 transition-transform"
            >
              {isRegistration ? "Registration" : "Log in"}
            </Button>
            or {
              isRegistration ? <a href="#" onClick={(e)=>{
              e.preventDefault();
              setIsRegistration(isReg=>!isReg)
            }}>Login</a> : 
              <a href="#" onClick={(e)=>{
              e.preventDefault();
              setIsRegistration(isReg=>!isReg)
            }}>Register</a>
            }
          </Form.Item>
        </form>
      </Card>
    </div>
  );
};

export default LogIn;
