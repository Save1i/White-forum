import { Button, Form, Input, message} from "antd"
import axios from "axios";
import { useEffect } from "react";
import type { User } from "../types";

const ChangeUserForm = ({user, onSuccess, closeForm} : {user: User, onSuccess: Function, closeForm: Function }) => {

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
            onSuccess((prev: boolean) => !prev)
            message.success("Изменения сохранены");
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
        }
    }
  return (
    <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className="space-y-4"
        >
        <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Введите имя" }]}
        >
            <Input size="large" placeholder="Введите имя" />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Введите корректный email" }]}
        >
            <Input size="large" placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item label="Адрес" name="address">
            <Input size="large" placeholder="Москва, ул. Ленина 10" />
        </Form.Item>

        <Form.Item
            label="Пароль"
            name="password_hash"
            rules={[{ required: true }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
            <div className="flex justify-end gap-3">
            <Button onClick={() => closeForm(false)}>Отмена</Button>
            <Button type="primary" htmlType="submit">
                Сохранить
            </Button>
            </div>
        </Form.Item>
    </Form>
  )
}

export default ChangeUserForm