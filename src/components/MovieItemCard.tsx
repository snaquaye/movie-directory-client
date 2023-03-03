import { Box, Image, Text } from "@chakra-ui/react";
import { SearchResultItem } from "MovieDirectory";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  data: SearchResultItem;
  setSelectedMovieId: (id: string) => void;
};

export const MovieItemCard = ({
  data: { imdbId, title, poster, type, year },
  setSelectedMovieId
}: Props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Box
      minW="xs"
      key={imdbId}
      __css={{ cursor: "pointer" }}
      onClick={() => {
        setSelectedMovieId(imdbId);
        navigate(
          `/movie/detail/${imdbId}?searchTerm=${searchParams.get("searchTerm")}`
        );
      }}
    >
      <Image
        src={poster !== "N/A" ? poster : require("../assets/images/movie.jpg")}
        maxW={poster !== "N/A" ? undefined : "300px"}
      />
      <Text color="white">{title}</Text>
      <Text fontSize={10} color="whiteAlpha.400">
        {type} - {year}
      </Text>
    </Box>
  );
};
