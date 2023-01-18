import React, { useState, useEffect } from "react";
import { ulid } from "ulid";

import * as todoData from "../apis/todos";
import { Todo } from "../types/Todo";

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      console.log(...todo);
      setTodoList([...todo].reverse());
    });
  }, []);

  // todoのdoneを反転させる - Invert done of todo
  const toggleTodoListItemStatus = (id: string, done: boolean) => {
    // todoListから、idが一致する1件を取り出す - Extract one item with matching id from todoList
    const todoItem = todoList.find((item: Todo) => item.id === id);
    // doneを反転させて、新たなitemを作成 - Invert done to create a new item
    const newTodoItem: Todo = { ...todoItem!, done: !done };
    // サーバに更新API呼ぶ - Call update API to server
    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      // 成功したら、todoListを更新。idが一致しているものを、サーバーから返ってきたupdatedTodoで更新する
      // If successful, update todoList. Update the matching id with updatedTodo returned from the server
      const newTodoList = todoList.map((item) => (item.id !== updatedTodo.id ? item : updatedTodo));
      // 新しいtodoListをstateにセットする
      // set the new todoList to state
      setTodoList(newTodoList);
    });
  };

  const addTodoListItem = (todoContent: string) => {
    // あたらしいitemを作成する // create a new item
    const newTodoItem = { id: ulid(), content: todoContent, done: false };

    // サーバーの追加APIを呼ぶ call the server's additional API
    todoData.addTodoData(newTodoItem).then((addTodo) => {
      // addTodoをtodoListに追加してstateにセットする
      // Add addTodo to todoList and set it to state
      setTodoList([addTodo, ...todoList]);
    });
  };

  const deleteTodoListItem = (id: string) => {
    // サーバーの削除APIを呼ぶ
    todoData.deleteTodoData(id).then((deletedid) => {
      const newTodoList = todoList.filter((item) => item.id !== deletedid);
      // 1件削除された新しいtodoListに追加してstateにセットする
      // Add to new todoList with one item removed and set to state
      setTodoList(newTodoList);
    });
  };

  // 作成した関数を返す - return the created function
  return { todoList, toggleTodoListItemStatus, addTodoListItem, deleteTodoListItem };
};
