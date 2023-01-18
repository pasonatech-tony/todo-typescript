import { Todo } from "../types/Todo";

// 1つのTodo、内容と移動・削除ボタン // 1 Todo, content and move/delete buttons
export const TodoItem = ({
  todo,
  toggleTodoListItemStatus,
  deleteTodoListItem,
}: {
  todo: Todo;
  toggleTodoListItemStatus: any;
  deleteTodoListItem: any;
}) => {
  // onClickイベントが発生したら、useTodoフックを呼び出す
  // Call the useTodo hook when the onClick event fires
  const handleToggleTodoListItemStatus = () =>
    toggleTodoListItemStatus(todo.id, todo.done);
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {todo.content}
      </div>
      <div className="">
        <button
          onClick={handleToggleTodoListItemStatus}
          className="rounded border border-pink-500 bg-transparent py-2 px-4 font-semibold hover:border-transparent hover:bg-pink-500 hover:text-white"
        >
          {todo.done ? "To incomplete list" : "To complete list"}
        </button>
        <button
          onClick={handleDeleteTodoListItem}
          className="rounded border border-pink-500 bg-transparent py-2 px-4 font-semibold hover:border-transparent hover:bg-pink-500 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
