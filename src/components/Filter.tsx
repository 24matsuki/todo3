import { Select } from "@chakra-ui/react";
import React, { FC } from "react";
import { useSetRecoilState } from "recoil";
import { filterState } from "../store/store";

export const Filter: FC = () => {
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
