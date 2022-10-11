import { Stack } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { FC, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../firebase";
import { filteredTodoListState, todoListState } from "../store/store";
import { TodoItem } from "./TodoItem";

export const TodoList: FC = () => {
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const newTodoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        status: doc.data().status,
      }));
      setTodoList(newTodoList);
    });
    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Stack>
      {todoList.length > 0 &&
        todoList.map((todoItem) => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
        ))}
    </Stack>
  );
};
