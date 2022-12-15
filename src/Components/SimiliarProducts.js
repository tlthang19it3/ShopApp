import React from "react";
import { View, Text, Center, ScrollView, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import Colors from "../color";
import products from "../data/Products";
import Rating from "../Components/Rating";
import { useNavigation } from "@react-navigation/native";
function SimiliarProducts() {
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
    return `${options.symbol} ${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
    )}`;
  };
  return (
    <View pb={10}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        borderBottomColor="#B5B5B5"
        borderBottomWidth={0.2}
        pb={2}
      >
        <Text bold>Tin đăng tương tự</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Single")}>
          <Text bold color="#436EEE">
            Xem tất cả {">"}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <TouchableOpacity
            key={product._id}
            alignItems="center"
            style={{
              marginRight: 30,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate("Single", product)}
          >
            <Center>
              <Image
                source={{
                  uri: product.image,
                }}
                alt="product"
                h={120}
                flex={1}
                w="full"
                resizeMode="cover"
                rounded={3}
              />
            </Center>
            <Text flex={1} numberOfLines={2} isTruncated w={110} fontSize={16}>
              {product.name}
            </Text>
            <Text color={Colors.red} bold>
              {currencyFormatter(product.price, defaultOptions)}{" "}
              <Text underline>đ</Text>
            </Text>
            <Rating value={product.rating} />
            <Text color={Colors.deepestGray}>tại Đồng Nai</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default SimiliarProducts;
