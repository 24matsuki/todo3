import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  useDisclosure,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { Filter } from "./components/Filter";
import { TodoList } from "./components/TodoList";

export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" py="20" bg="gray.800" color="gray.200">
      <Container>
        <VStack spacing="4">
          <Heading
            fontSize="4xl"
            borderBottom="1px"
            borderBottomColor="teal"
            bgGradient="linear(to-b, teal, gray.200)"
            bgClip="text"
            _hover={{ opacity: 0.7, transition: "opacity .5s" }}
          >
            TODO List
          </Heading>
          <Flex w="100%" pt="4">
            <Button
              focusBorderColor="teal.500"
              _hover={{ backgroundColor: "gray.700" }}
              w="40"
              variant="outline"
              rounded="lg"
              onClick={onOpen}
            >
              Create Task
            </Button>
            <Spacer />
            <Filter />
          </Flex>
          <Box w="full">
            <TodoList />
          </Box>
          <CreateTaskModal isOpen={isOpen} onClose={onClose} />
        </VStack>
      </Container>
    </Box>
  );
};
