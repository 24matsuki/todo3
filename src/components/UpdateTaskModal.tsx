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
  FormErrorMessage,
} from "@chakra-ui/react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../firebase";
import { currentTodoItemState } from "../store/store";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  todoInput: string;
  statusSelect: string;
};

export const UpdateTaskModal: FC<Props> = ({ isOpen, onClose }) => {
  const currentTodoItem = useRecoilValue(currentTodoItemState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todoInput: "",
      statusSelect: "Incomplete",
    },
  });

  useEffect(() => {
    reset({
      todoInput: currentTodoItem.text,
      statusSelect: currentTodoItem.status,
    });
    // eslint-disable-next-line
  }, [isOpen, currentTodoItem]);

  const onSubmit: SubmitHandler<Inputs> = (data, e: any) => {
    e.preventDefault();

    onClose();
    // Firestoreの更新
    updateDoc(doc(db, "todos", currentTodoItem.id), {
      text: data.todoInput,
      status: data.statusSelect,
      updatedAt: serverTimestamp(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="gray.700" color="teal.500">
        <ModalHeader textAlign="center" fontSize="3xl" p="2" textShadow="lg">
          Update Task
        </ModalHeader>
        <ModalCloseButton tabIndex={2} _hover={{ opacity: 0.7 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb="4">
            <Stack spacing="4" color="white">
              <FormControl isInvalid={Boolean(errors.todoInput)}>
                <FormLabel>Task</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="teal.500"
                  tabIndex={1}
                  {...register("todoInput", {
                    required: "This is required",
                    maxLength: {
                      value: 50,
                      message: "Maximum length should be 50",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.todoInput && errors.todoInput.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  focusBorderColor="teal.500"
                  {...register("statusSelect")}
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
