import { Stack, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  value: string;
}

export const StatBox = ({ title, value }: Props) => {
  return (
    <Stack p={5} bgColor="black" minW={150} borderRadius="md" minH="120px">
      <Text fontWeight={"bold"} color="blue.300">
        {title}
      </Text>
      <Text color={"white"} fontWeight="bold" fontSize={25}>{value}</Text>
    </Stack>
  );
}