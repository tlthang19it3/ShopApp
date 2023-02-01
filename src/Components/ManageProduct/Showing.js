import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useToast,
  View,
} from "native-base";
import Colors from "../../color";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Storage } from "expo-storage";
import axios from "axios";
import { ActivityIndicator, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { updateStatusBlog } from "../../Redux/Actions/ProductActions";
import { useNavigation } from "@react-navigation/native";

function Showing() {
  const toast = useToast();
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();
  const Url = `https://server-shop-app.onrender.com`;
  const fetchProducts = async () => {
    try {
      const id = await Storage.getItem({ key: "userID" });
      const { data } = await axios.get(`${Url}/api/product/users/${id}`);
      if (data.length > 0) {
        setProduct(
          data.filter(
            (data) =>
              data.isShow === true &&
              data.isAccept === 1 &&
              data.isSold === false
          )
        );
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
  const dispatch = useDispatch();
  const hideBlog = (id) => {
    dispatch(updateStatusBlog(id, false));
    setRefreshing(true);
    wait(2000).then(() => {
      fetchProducts();
      setRefreshing(false);
      toast.show({
        render: () => {
          return (
            <Box bg="gray.500" px="2" py="1" rounded="md" mb={10}>
              <Text color="white">Ẩn tin thành công</Text>
            </Box>
          );
        },
      });
      wait(1000).then(() => toast.closeAll());
    });
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
        {loading ? (
          <View flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" />
          </View>
        ) : product.length > 0 ? (
          product.map((product) => (
            <View key={product._id}>
              <View
                bg={Colors.white}
                flexDirection="row"
                alignItems="center"
                mt={1}
              >
                <View
                  w="30%"
                  borderRightWidth={0.5}
                  borderRightColor="gray.400"
                >
                  <Image
                    source={{
                      uri: product.image,
                    }}
                    alt="img"
                    h={20}
                    resizeMode="contain"
                  />
                </View>

                <View ml={2} w="40%">
                  <Text isTruncated>{product.title}</Text>
                  <Text bold color={Colors.red}>
                    {currencyFormatter(product.price, defaultOptions)}đ
                  </Text>
                  <Text color="gray.500" fontSize={11}>
                    {product.createdAt}
                  </Text>
                </View>
              </View>
              <View
                flexDirection="row"
                flex={1}
                justifyContent="space-between"
                bg={Colors.white}
              >
                <Pressable
                  w="50%"
                  borderWidth={0.6}
                  borderColor="gray.300"
                  alignItems="center"
                  p={1}
                >
                  <Pressable onPress={() => hideBlog(product._id)}>
                    <HStack space={2}>
                      <Ionicons
                        name="ios-eye-off-outline"
                        size={24}
                        color="#3366FF"
                      />
                      <Text color="#3366FF">Ẩn tin</Text>
                    </HStack>
                  </Pressable>
                </Pressable>
                <Pressable
                  w="50%"
                  borderWidth={0.6}
                  borderColor="gray.300"
                  alignItems="center"
                  p={1}
                  onPress={() => {
                    navigation.navigate("EditBlog", {
                      cate: product.category,
                      info: product,
                    });
                  }}
                >
                  <HStack space={2}>
                    <Feather name="edit" size={20} color="#3366FF" />
                    <Text color="#3366FF">Chỉnh sửa</Text>
                  </HStack>
                </Pressable>
              </View>
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

export default Showing;
