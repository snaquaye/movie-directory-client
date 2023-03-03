import { Box, Button, Container, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { SearchFormType } from "MovieDirectory";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  setSearchParams: (query: Record<"searchTerm", string>) => void;
};

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<SearchFormType>({
    defaultValues: {
      searchTerm: searchParams.get("searchTerm"),
    },
  });

  const doSubmit = (data: SearchFormType) => {
    navigate(`/movie?searchTerm=${data.searchTerm}`);
  };

  return (
    <Box
      bgColor={"#000"}
      __css={{
        bgImage: require("../assets/images/header_bg.jpg"),
        bgPosition: "center",
      }}
    >
      <Box bgColor={"rgba(0,0,0, .7)"} p="10">
        <Container maxWidth={"container.2xl"}>
          <Flex>
            <Heading color="white">Movie Directory</Heading>
            <Flex minW="70%" alignContent={"center"} justifyContent="center">
              <form onSubmit={handleSubmit(doSubmit)}>
                <Stack spacing={3}>
                  <Input
                    placeholder="Search By Movie Title"
                    alignSelf={"center"}
                    bgColor={"whiteAlpha.800"}
                    color="#000"
                    maxW="sm"
                    {...register("searchTerm")}
                  />
                  <Button
                    h="1.75rem"
                    size="lg"
                    type="submit"
                    alignSelf="center"
                    p="3"
                    ml="1"
                    minW="full"
                  >
                    Search
                  </Button>
                </Stack>
              </form>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default memo(Header);
