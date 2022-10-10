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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../firebase";
import { useForm } from "react-hook-form";

const CreateTask = (props) => {
  const initialRef = useRef();
  const { isOpen, onClose } = props;
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todoSelectStatus, setTodoSelectStatus] = useState("Incomplete");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitTodo = async (e) => {
    e.preventDefault();

    onClose();

    console.log(initialRef.current.value);
    // Firestoreへ追加
    await addDoc(collection(db, "todos"), {
      text: todoInputValue,
      status: todoSelectStatus,
      createdAt: serverTimestamp(),
    });

    setTodoInputValue("");
  };

  const handleCloseModal = () => {
    onClose();
    setTodoInputValue("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent backgroundColor="gray.700" color="teal.500">
        <ModalHeader textAlign="center" fontSize="3xl" p="2" textShadow="lg">
          Create Task
        </ModalHeader>
        <ModalCloseButton _hover={{ opacity: 0.7 }} />
        <form onSubmit={handleSubmitTodo}>
          <ModalBody pb="4">
            <Stack spacing="4" color="white">
              <FormControl>
                <FormLabel>Task</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="teal.500"
                  ref={initialRef}
                  value={todoInputValue}
                  onChange={(e) => setTodoInputValue(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
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
            <Button colorScheme="teal" mr="2" type="submit">
              Create
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateTask;
