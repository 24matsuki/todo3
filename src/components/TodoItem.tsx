import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { FC } from "react";
import { useSetRecoilState } from "recoil";
import { db } from "../firebase";
import { currentTodoItemState, TodoItemType } from "../store/store";
import { UpdateTaskModal } from "./UpdateTaskModal";

const completedTodoText = {
  decoration: "line-through",
  color: "gray.400",
};

type Props = {
  todoItem: TodoItemType;
};

export const TodoItem: FC<Props> = ({ todoItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setCurrentTodoItem = useSetRecoilState(currentTodoItemState);

  const handleDeleteTodo = () => {
    deleteDoc(doc(db, "todos", todoItem.id));
  };

  const toggleTodoStatus = () => {
    updateDoc(doc(db, "todos", todoItem.id), {
      status: todoItem.status === "Completed" ? "Incomplete" : "Completed",
    });
  };

  const handleEditTodo = () => {
    setCurrentTodoItem(todoItem);
    onOpen();
  };

  return (
    <>
      <Flex
        _hover={{ bg: "gray.600" }}
        bg="gray.700"
        p="5"
        rounded="xl"
        gap="2"
        align="center"
      >
        <Checkbox
          icon={<CheckIcon />}
          colorScheme="teal"
          size="lg"
          isChecked={todoItem.status === "Completed"}
          onChange={toggleTodoStatus}
        />
        <Text
          flex="1"
          noOfLines={1}
          {...(todoItem.status === "Completed" && completedTodoText)}
        >
          {todoItem.text}
        </Text>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Edit Task"
          rounded="lg"
          icon={<EditIcon />}
          onClick={handleEditTodo}
        />
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Delete Task"
          rounded="lg"
          icon={<DeleteIcon />}
          onClick={handleDeleteTodo}
        />
      </Flex>
      <UpdateTaskModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
