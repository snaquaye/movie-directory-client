import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export const Layout = () => {
  return (
    <>
    <Box
        bgGradient="radial(#203354, #152238)"
        flex={1}
        minH={"100vh"}
      ><Outlet /></Box>
    </>);
};
