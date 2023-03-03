import { Button, Center, HStack, SimpleGrid, Spinner, Text, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useSearchParams } from "react-router-dom";
import { search } from "../api/movies-service";
import Header from "../components/Header";
import { MovieItemCard } from "../components/MovieItemCard";

export const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<string | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  const searchQuery = useQuery(["movies", searchTerm, page], () => {
    return search(searchTerm!, page);
  });

  return (
    <>
      <Header />
      {searchQuery.status === "loading" && (
        <Center pt="10">
          <Spinner color="white" size="xl" />
        </Center>
      )}

      <HStack pt="10" pr="10" pl="10" justifyContent={"start"}>
        <SimpleGrid columns={5} spacing={10}>
          {(searchQuery.data ? searchQuery.data.data : []).map(
            (item, index) => (
              <MovieItemCard
                key={index}
                data={item}
                setSelectedMovieId={setSelectedMovieId}
              />
            )
          )}
        </SimpleGrid>
        <Outlet />
      </HStack>

        <HStack pb="10" pl="10" pr="10">
          <Button disabled={page === 1} onClick={() => setPage(previousPage => previousPage - 1)}>Previous Page</Button>
          <Spacer />
          <Text fontWeight="bold" color="white">
            Showing Page {page}
          </Text>
          <Spacer />
          <Button onClick={() => setPage((currentPage) => currentPage + 1)}>Next Page</Button>
        </HStack>
    </>
  );
};
