import { atom, selector } from "recoil";

const todoListState = atom({
  key: "todoListState",
  default: [],
});

const currentTodoItemState = atom({
  key: "currentTodoItemState",
  default: {},
});

const filterState = atom({
  key: "filterState",
  default: "All",
});

const filteredTodoListState = selector({
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
