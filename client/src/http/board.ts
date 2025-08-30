import { $host } from "./index";

export const fetchMessages = async () => {
  const { data } = await $host.get("board/");
  return data;
};