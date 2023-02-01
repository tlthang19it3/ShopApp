import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  View,
} from "native-base";
import Colors from "../../color";
import { Storage } from "expo-storage";
import axios from "axios";
import { RefreshControl } from "react-native";

function Reject() {
  const [product, setProduct] = useState([]);
  const Url = `https://server-shop-app.onrender.com`;
  const fetchProducts = async () => {
    try {
      const id = await Storage.getItem({ key: "userID" });
      const { data } = await axios.get(`${Url}/api/product/users/${id}`);
      if (data.length > 0) {
        setProduct(data.filter((data) => data.isAccept === 2));
      } else {
        setProduct([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    fetchProducts();
    wait(1000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchProducts();
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
    <Box h="full" bg={Colors.gray}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {product.length > 0 ? (
          product.map((product) => (
            <View
              key={product._id}
              mt={2}
              bg={Colors.white}
              flexDirection="row"
              alignItems="center"
            >
              <View w="30%" borderRightWidth={0.5} borderRightColor="gray.400">
                <Image
                  source={{
                    uri: product.image,
                  }}
                  alt="img"
                  h={20}
                  resizeMode="contain"
                />
              </View>

              <View ml={2} w="35%">
                <Text isTruncated>{product.title}</Text>
                <Text bold>
                  {currencyFormatter(product.price, defaultOptions)}đ
                </Text>
                <Text color="gray.500" fontSize={11}>
                  {product.createdAt}
                </Text>
              </View>
              <Spacer />
              <Pressable
                borderWidth={0.8}
                mr={5}
                rounded={10}
                pr={4}
                pl={4}
                pt={1}
                pb={1}
                borderColor="red.400"
              >
                <Text color="red.400">Đã bị từ chối</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View flex={1} mt={20} alignItems="center">
            <Text fontSize={15}>Bạn chưa có tin nào trong mục này</Text>
          </View>
        )}
      </ScrollView>
    </Box>
  );
}

export default Reject;
