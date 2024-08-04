import React from "react";
import { Container, Flex, Text, Hstack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        alignitems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <Hstack spaceing={2} alignitems={"center"}>
          <Link to={"/create"}>
          <Button></Button></Link>
        </Hstack>
      </Flex>
    </Container>
  );
};

export default Navbar;
