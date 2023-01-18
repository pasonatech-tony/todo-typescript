import axios from "axios";
import { Todo } from "../types/Todo";

const todoDataUrl = "http://localhost:3100/todos";

// 全TODOリスト取得 - Get all TODO list
export const getAllTodosData = async () => {
  const response = await axios.get(todoDataUrl);
  return response.data;
};

// 1件のTODOを追加する - Add 1 TODO
export const addTodoData = async (todo: Todo) => {
  const response = await axios.post(todoDataUrl, todo);
  return response.data;
};

// 1件のTODOを削除する - Delete 1 TODO
export const deleteTodoData = async (id: string) => {
  await axios.delete(`${todoDataUrl}/${id}`);
  return id;
};

// 1件のTODOを更新する - Update 1 TODO
export const updateTodoData = async (id: string, todo: Todo) => {
  const response = await axios.put(`${todoDataUrl}/${id}`, todo);
  return response.data;
};
