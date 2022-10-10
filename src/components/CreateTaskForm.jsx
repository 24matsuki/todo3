import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

const CreateTaskForm = () => {
  return (
    <FormControl>
      <Stack spacing="4" color="white">
        <Box>
          <FormLabel>Task</FormLabel>
          <Input type="text" focusBorderColor="teal.500" />
        </Box>
        <Stack>
          <Text>Status</Text>
          <Select focusBorderColor="teal.500">
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </Select>
        </Stack>
      </Stack>
    </FormControl>
  );
};

export default CreateTaskForm;
