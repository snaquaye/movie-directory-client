import {
  Badge,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Table,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail } from "../api/movies-service";
import { StatBox } from "../components/StatBox";

export const DetailPage = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { movieId } = useParams<{ movieId: string }>();

  let stat: { title: string; value: string }[] = [];

  const { data, status } = useQuery(["movie-detail", movieId], () =>
    getMovieDetail(movieId!)
  );

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const navigate = useNavigate();

  if (status === "loading" || data === undefined) {
    return <Spinner size="xl" />;
  }

  if (data) {
    stat = [
      { title: "Released", value: data.released },
      { title: "Box Office", value: data.boxOffice },
      { title: "Type", value: data.type.toUpperCase() },
      { title: "Rated", value: data.rated },
      { title: "IMDB Rating", value: data.imdbRating },
      { title: "IMDB Votes", value: data.imdbVotes },
    ];
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        navigate(-1);
        onClose();
      }}
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="black">
          <Heading>{data.title}</Heading>
          <Text>
            {data.director} - {data.country}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack alignItems={"start"} justifyItems={"start"}>
            <HStack spacing={6}>
              {stat.map((item, index) => (
                <StatBox title={item.title} value={item.value} key={index} />
              ))}
            </HStack>
            <HStack
              alignItems="start"
            >
              <Image src={data?.poster} />
              <Text>{data.plot}</Text>
            </HStack>
          </Stack>
          <HStack>
            <Stack flex={1}>
              <Heading size="md">Ratings</Heading>
              <Table alignContent={"start"} alignItems={"start"}>
                {data.ratings.map((rating, index) => {
                  return (
                    <Tr>
                      <Th color={"black"}>{rating.source}</Th>
                      <Td>{rating.value}</Td>
                    </Tr>
                  );
                })}
              </Table>
            </Stack>

            <Stack flex={1} alignItems="start">
              <Heading size="md">Info</Heading>
              <Table>
                <Tr>
                  <Th color={"seagreen"}>Awards</Th>
                  <Td>{data.awards}</Td>
                </Tr>
                <Tr>
                  <Th color={"seagreen"}>Writer</Th>
                  <Td>
                    {data.writer.split(",").map((item, index) => (
                      <Badge key={index}>{item}</Badge>
                    ))}
                  </Td>
                </Tr>
                <Tr>
                  <Th color={"seagreen"}>Actors</Th>
                  <Td>
                    {data.actors.split(",").map((item, index) => (
                      <Badge key={index}>{item}</Badge>
                    ))}
                  </Td>
                </Tr>
                <Tr>
                  <Th color={"seagreen"}>Language</Th>
                  <Td>
                    {data.language.split(",").map((item, index) => (
                      <Badge key={index}>{item}</Badge>
                    ))}
                  </Td>
                </Tr>
              </Table>
            </Stack>
          </HStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
