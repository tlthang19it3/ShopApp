import { Box, Text, HStack, Pressable } from "native-base";
import React from "react";
import Colors from "../../color";
import { Ionicons } from "@expo/vector-icons";
import Tabs from "../../Components/Sellorder/Tabs";
function ManageSellOrderScreen({ navigation }) {
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
          Đơn bán
        </Text>
      </HStack>
      <Tabs />
    </Box>
  );
}

export default ManageSellOrderScreen;
