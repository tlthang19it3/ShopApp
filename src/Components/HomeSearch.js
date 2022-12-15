import { Box, HStack, Input, View } from "native-base";
import React, { useState } from "react";
import { Pressable } from "react-native";
import Colors from "../color";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
function HomeSearch() {
  const navigation = useNavigation();
  return (
    <HStack
      space={3}
      w="full"
      px={4}
      bg="#FFA500"
      py={3}
      alignItems="center"
      safeAreaTop
    >
      <View
        flex={1}
        flexDirection="row"
        alignItems="center"
        bg={Colors.white}
        rounded={5}
      >
        <EvilIcons
          name="search"
          size={24}
          color="#8B8B7A"
          style={{ marginLeft: 5 }}
        />
        <Input
          placeholder="Tìm kiếm "
          w="85%"
          size={10}
          pl={2}
          bg={Colors.white}
          flex={1}
          type="search"
          h={9}
          borderWidth={0}
          _focus={{ bg: Colors.white }}
          onPressIn={() => {
            navigation.navigate("Search");
          }}
          variant="filled"
        />
      </View>
    </HStack>
  );
}

export default HomeSearch;
