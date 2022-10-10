import { Select } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { filterState } from "../store/store";

const Filter = () => {
  const setFilterState = useSetRecoilState(filterState);

  return (
    <Select
      _hover={{ backgroundColor: "gray.700" }}
      focusBorderColor="teal.500"
      w="40"
      rounded="lg"
      onChange={(e) => setFilterState(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Incomplete">Incomplete</option>
      <option value="Completed">Completed</option>
    </Select>
  );
};

export default Filter;
