import axios from "axios";
import { useEffect, useState } from "react";

export type User = {
  id: number;
  username: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
    try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}user/me`,
            { withCredentials: true }
          );
          setUser(response.data);
        } catch (err) {
          console.error("Ошибка при получении пользователя:", err);
          setUser(undefined);
        } finally {
          setLoading(false);
        }
      }

    fetchUser();
  }, []);

  return { user, loading };
}
