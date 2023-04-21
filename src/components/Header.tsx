import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { ModeSwitch } from "./ModeSwitch";

const Header = () => {
  return (
    <HStack justifyContent={"space-between"} padding={"10px"}>
      <Image src={logo} boxSize={"60px"}></Image>
      <Text fontSize={"4xl"} color={"blue.400"}>
        BHYC Wufoo Forms
      </Text>
      <ModeSwitch />
    </HStack>
  );
};

export default Header;
