import {
  Box,
  Text,
  ScrollView,
  View,
  Image,
  VStack,
  HStack,
  Spacer,
  Center,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";
import Rating from "../Components/Rating";
import axios from "axios";
const Url = `https://server-shop-app.onrender.com`;
function OwnerProfileScreen({ navigation, route }) {
  const userInfo = route.params;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${Url}/api/product/users/${userInfo._id}`
      );
      setProduct(
        data.filter(
          (data) =>
            data.isShow === true && data.isAccept === 1 && data.isSold === false
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
    <Box safeAreaTop bg={Colors.gray}>
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
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text bold fontSize={17} color="black">
          {userInfo.name}
        </Text>
      </HStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          flexDirection="row"
          bg={Colors.white}
          w="full"
          px={3}
          py={3}
          alignItems="center"
        >
          <Image
            source={{ uri: userInfo.avatar }}
            h={20}
            w={20}
            alt="avatar"
            rounded="full"
          />
          <VStack ml={5}>
            <Text bold fontSize={17}>
              {userInfo.name}
            </Text>
            {/* <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 25,
                alignItems: "center",
                textAlign: "center",
                marginTop: 2,
                color: Colors.white,
                borderColor: Colors.deepestGray,
                padding: 5,
                paddingRight: 10,
                paddingLeft: 10,
              }}
              onPress={() => {
                navigation.navigate("UpdateProfile", userInfo);
              }}
            >
              <Text fontSize={12}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity> */}
          </VStack>
        </View>
        <View bg={Colors.white}>
          <VStack>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderTopWidth: 0.6,
                borderTopColor: Colors.deepGray,
              }}
            >
              <AntDesign name="staro" size={14} color="black" />
              <Text fontSize={14} ml={2} color="gray.400">
                Đánh giá:
              </Text>
              {userInfo.numReviews === 0 ? (
                <Text fontSize={14} ml={2} color="gray.400">
                  Chưa có đánh giá
                </Text>
              ) : (
                <View ml={3} flexDirection="row" alignItems="center">
                  <Rating
                    value={(userInfo.rating / userInfo.numReviews).toFixed(1)}
                  />
                  <Text ml={1} fontSize={10}>
                    {userInfo.numReviews} đánh giá
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Fontisto name="date" size={14} color="black" />
              <Text fontSize={14} ml={2} color="gray.400">
                Ngày tham gia:
              </Text>
              <Text fontSize={14}> {userInfo.createdAt}</Text>
            </View>
          </VStack>
        </View>
        <Text color="#808080" bold fontSize={15} p={3}>
          Tin đang đăng
        </Text>
        {loading ? (
          <View flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View bg={Colors.white} mb={20}>
            <VStack>
              {product === null ? (
                <Center alignItems="center" h={100}>
                  <Text>Bạn chưa có tin nào đang bán</Text>
                </Center>
              ) : (
                product.map((product) => (
                  <TouchableOpacity
                    key={product._id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderBottomWidth: 0.6,
                      borderBottomColor: Colors.deepGray,
                    }}
                    onPress={() => {
                      navigation.navigate("Single", product);
                    }}
                  >
                    <Image
                      source={{
                        uri: product.image,
                      }}
                      alt="icon"
                      h={20}
                      w="25%"
                      resizeMode="contain"
                    />
                    <VStack>
                      <Text fontSize={15} ml={2} isTruncated w={250}>
                        {product.title}
                      </Text>
                      <Text fontSize={15} ml={2} bold color="red.500">
                        {currencyFormatter(product.price, defaultOptions)}đ
                      </Text>
                      <Spacer />
                      <Text fontSize={13} ml={2} color="gray.400">
                        {product.createdAt}
                      </Text>
                    </VStack>
                  </TouchableOpacity>
                ))
              )}
            </VStack>
          </View>
        )}
      </ScrollView>
    </Box>
  );
}

export default OwnerProfileScreen;
