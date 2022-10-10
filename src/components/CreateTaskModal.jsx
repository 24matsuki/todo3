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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase";
import { useForm } from "react-hook-form";

export const CreateTaskModal = (props) => {
  const { isOpen, onClose } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      todoInput: "",
      statusSelect: "Incomplete",
    },
  });

  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, [isSubmitSuccessful, isOpen]);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    onClose();

    await addDoc(collection(db, "todos"), {
      text: data.todoInput,
      status: data.statusSelect,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent backgroundColor="gray.700" color="teal.500">
        <ModalHeader textAlign="center" fontSize="3xl" p="2" textShadow="lg">
          Create Task
        </ModalHeader>
        <ModalCloseButton tabIndex="2" _hover={{ opacity: 0.7 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb="4">
            <Stack spacing="4" color="white">
              <FormControl isInvalid={errors.todoInput}>
                <FormLabel>Task</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="teal.500"
                  tabIndex="1"
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
            <Button colorScheme="teal" mr="2" type="submit">
              Create
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
