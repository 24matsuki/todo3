import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Stack,
  FormLabel,
  Input,
  Select,
  ModalFooter,
} from "@chakra-ui/react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../firebase";
import { currentTodoItemState } from "../store/store";

const UpdateTaskModal = (props) => {
  const { isOpen, onClose } = props;
  const currentTodoItem = useRecoilValue(currentTodoItemState);
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todoSelectStatus, setTodoSelectStatus] = useState("");

  useEffect(() => {
    setTodoInputValue(currentTodoItem.text);
    setTodoSelectStatus(currentTodoItem.status);
  }, [currentTodoItem]);

  const handleSubmitTodo = async (e) => {
    e.preventDefault();

    onClose();
    // Firestoreの更新
    await updateDoc(doc(db, "todos", currentTodoItem.id), {
      text: todoInputValue,
      status: todoSelectStatus,
      updatedAt: serverTimestamp(),
    });

    setTodoInputValue("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="gray.800">
        <ModalHeader
          textAlign="center"
          fontSize="3xl"
          p="2"
          color="teal.500"
          textShadow="lg"
        >
          Update Task
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmitTodo}>
          <ModalBody pb="4">
            <Stack spacing="4" color="white">
              <FormControl>
                <FormLabel>Task</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="teal.500"
                  value={todoInputValue}
                  onChange={(e) => setTodoInputValue(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={todoSelectStatus}
                  focusBorderColor="teal.500"
                  onChange={(e) => setTodoSelectStatus(e.target.value)}
                >
                  <option value="Incomplete">Incomplete</option>
                  <option value="Completed">Completed</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr="3" type="submit">
              Update
            </Button>
            <Button colorScheme="teal" variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTaskModal;
