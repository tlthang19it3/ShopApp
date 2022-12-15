import { Box, Text, HStack, Pressable } from "native-base";
import React from "react";
import Tabs from "../Components/BuyOrder/Tabs";
import Colors from "../color";
import { Ionicons } from "@expo/vector-icons";
function ManageBuyOrderScreen({ navigation }) {
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
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text bold fontSize={17} color="white">
          Đơn mua
        </Text>
      </HStack>
      <Tabs />
    </Box>
  );
}

export default ManageBuyOrderScreen;
