import { useNavigation } from "@react-navigation/native";
import { Flex, ScrollView, Text, Image, Box, HStack } from "native-base";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Colors from "../color";
import Rating from "./Rating";
import axios from "axios";
const Url = `https://server-shop-app.onrender.com`;
function HomeProducts({ products }) {
  const navigation = useNavigation();
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "",
  };

  const currencyFormatter = (value, options) => {
    if (typeof value !== "number") value = 0.0;
    options = { ...defaultOptions, ...options };
    value = value.toFixed(options.significantDigits);

    const [currency, decimal] = value.split(".");
    return `${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
    )}`;
  };

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Flex flexWrap="wrap" direction="row" px={2}>
        {products.map((product) => (
          <TouchableOpacity
            key={product._id}
            style={{
              width: "50%",
              backgroundColor: Colors.white,
              borderStyle: "solid",
              borderWidth: 0.2,
              borderColor: "#E8E8E8",
              paddingBottom: 15,
              overflow: "hidden",
            }}
            onPress={() => navigation.navigate("Single", product)}
          >
            <Image
              source={{ uri: product.image }}
              alt={product.title}
              w="full"
              h={24}
              resizeMode="contain"
            />
            <Box px={4} pt={1}>
              <Text fontSize={15} isTruncated>
                {product.title}
              </Text>
              <HStack justifyContent="space-between">
                <Text fontSize={15} color={Colors.red} bold mt={1}>
                  {currencyFormatter(product.price, defaultOptions)}đ
                </Text>
              </HStack>
              <HStack alignItems="center">
                <FontAwesome name="user-circle-o" size={15} color="#A9A9A9" />
                <Text fontSize={10} color={Colors.deepestGray} mt={1} ml={1}>
                  {product.createdAt}
                </Text>
                <Text fontSize={10} color={Colors.deepestGray} mt={1} ml="auto">
                  tại {product.city}
                </Text>
              </HStack>
            </Box>
          </TouchableOpacity>
        ))}
      </Flex>
    </ScrollView>
  );
}

export default HomeProducts;
