import { Box, Text, HStack } from "native-base";
import React from "react";
import Colors from "../color";
import Tabs from "../Components/ManageProduct/Tabs";

function ManageProductScreen() {
  return (
    <Box safeAreaTop flex={1} bg={Colors.white}>
      <HStack
        space={3}
        w="full"
        px={4}
        bg="#FFA500"
        py={3}
        alignItems="center"
        safeAreaTop
      >
        <Text bold fontSize={17} color="white">
          Quản lý tin đăng
        </Text>
      </HStack>
      <Tabs />
    </Box>
  );
}

export default ManageProductScreen;
