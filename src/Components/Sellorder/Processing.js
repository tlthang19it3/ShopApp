import React, { useEffect, useState } from "react";
import { Box, Image, Pressable, ScrollView, Text, View } from "native-base";
import Colors from "../../color";
import axios from "axios";
import { ActivityIndicator, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateOrderStatus } from "../../Redux/Actions/OrderActions";

function Processing() {
  const navigation = useNavigation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [order, setOrder] = useState([]);
  const Url = `http://192.168.1.7:5000`;
  const fetchProducts = async () => {
    try {
      //   const id = await Storage.getItem({ key: "userID" });
      const { data } = await axios.get(
        `${Url}/api/order/seller/${userInfo._id}`
      );
      if (data.length > 0) {
        setOrder(data.filter((data) => data.status === "Đang xử lý"));
      } else {
        setOrder([]);
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
  const shippingHandler = (oid) => {
    setRefreshing(true);
    dispatch(updateOrderStatus(oid, "Đang giao hàng"));
    setTimeout(() => {
      setRefreshing(false);
      fetchProducts();
    }, 1500);
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
        ) : order.length > 0 ? (
          order.map((order) => (
            <Pressable
              onPress={() => {
                navigation.navigate("SellerOrderInfo", order);
              }}
              key={order._id}
            >
              <View
                bg={Colors.white}
                flexDirection="row"
                mt={1}
                p={2}
                borderBottomWidth={1}
                borderStyle="dashed"
              >
                <View
                  w="20%"
                  borderRightWidth={0.5}
                  borderRightColor="gray.400"
                >
                  <Image
                    source={{
                      uri: order.blog.image,
                    }}
                    alt="img"
                    h={20}
                    resizeMode="stretch"
                  />
                </View>

                <View ml={2} w="70%">
                  <Text bold fontSize={17} isTruncated>
                    {order.blog.title}
                  </Text>
                  <Text bold>
                    <Text>Thanh toán COD: </Text>
                    <Text color="green.600">
                      {currencyFormatter(order.blog.price, defaultOptions)}đ
                    </Text>
                  </Text>
                </View>
              </View>
              <View bg={Colors.white} pt={1} px={2}>
                <Text color="#0099CC">Đơn hàng đang xử lý</Text>
                <Text
                  bg={Colors.white}
                  color="gray.500"
                  fontSize={13}
                  textAlign="right"
                >
                  {order.createdAt} - {order.timeCreated}
                </Text>
              </View>

              <View
                flexDirection="row"
                flex={1}
                bg={Colors.white}
                justifyContent="center"
                pb={2}
                pt={2}
              >
                <Pressable
                  w="80%"
                  alignItems="center"
                  p={1}
                  bg="#FFA500"
                  rounded={5}
                  onPress={() => {
                    shippingHandler(order._id);
                  }}
                >
                  <Text color="white">Giao hàng</Text>
                </Pressable>
              </View>
            </Pressable>
          ))
        ) : (
          <View flex={1} mt={20} alignItems="center">
            <Text fontSize={15}>Bạn chưa có đơn hàng nào</Text>
          </View>
        )}
      </ScrollView>
    </Box>
  );
}

export default Processing;
