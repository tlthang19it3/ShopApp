import { Box, Text, ScrollView, HStack, Pressable, View } from "native-base";
import React from "react";
import Colors from "../color";
import { Ionicons } from "@expo/vector-icons";
import HomeProducts from "../Components/HomeProducts";

function SimiliarProductScreen({ navigation, route }) {
  const pro = route.params;
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
          Tin đăng tương tự
        </Text>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false} py={3}>
        <HomeProducts products={pro} />
        <View pb={20}></View>
      </ScrollView>
    </Box>
  );
}

export default SimiliarProductScreen;
