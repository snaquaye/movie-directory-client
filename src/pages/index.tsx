import {
  Button,
  Center,
  Stack,
  Input,
  Box,
  Heading,
  Text,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { SearchFormType } from "MovieDirectory";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getLastFiveQueries } from "../api/movies-service";

export const Landing = () => {
  const lastFiveSearch = useQuery(["lastFive"], () => getLastFiveQueries());
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<SearchFormType>();

  const doSubmit = (data: SearchFormType) => {
    navigate(`/movie?searchTerm=${data.searchTerm}`);
  };

  return (
    <Center minH="100vh">
      <Box minW={"2xl"}>
        <Heading color="white" pb={10} textAlign="center">
          Movie Directory
        </Heading>
        <form onSubmit={handleSubmit(doSubmit)}>
          <Stack>
            <Input
              {...register("searchTerm")}
              bgColor={"blue.700"}
              color={"white"}
              placeholder="Search for a movie by title"
              size="lg"
            />
            <Button
              type="submit"
              maxW={"xs"}
              alignSelf="center"
              bgColor={"blue.700"}
              color="white"
            >
              Search
            </Button>
          </Stack>
        </form>
        <Text textAlign={"center"} color="white" pt="3">
          Recent search
        </Text>
        <HStack justifyContent={"center"}>
          {lastFiveSearch.data === undefined
            ? []
            : lastFiveSearch.data.data.map((item, index) => (
                <Badge
                  key={index}
                  px={4}
                  py={2}
                  bgColor="yellow"
                  color="#000"
                  size="sm"
                >
                  {item.query}
                </Badge>
              ))}
        </HStack>
      </Box>
    </Center>
  );
};
