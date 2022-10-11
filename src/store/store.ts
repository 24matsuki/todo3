import { atom, selector } from "recoil";

export type TodoItemType = {
  id: string;
  text: string;
  status: string;
};

const todoListState = atom<TodoItemType[]>({
  key: "todoListState",
  default: [],
});

const currentTodoItemState = atom<TodoItemType>({
  key: "currentTodoItemState",
  default: {
    id: "",
    text: "",
    status: "",
  },
});

const filterState = atom({
  key: "filterState",
  default: "All",
});

const filteredTodoListState = selector<TodoItemType[]>({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(filterState);
    const todoList = get(todoListState);

    switch (filter) {
      case "Incomplete":
        return todoList.filter((todoItem) => todoItem.status === "Incomplete");
      case "Completed":
        return todoList.filter((todoItem) => todoItem.status === "Completed");
      default:
        return todoList;
    }
  },
});

export {
  todoListState,
  currentTodoItemState,
  filterState,
  filteredTodoListState,
};
