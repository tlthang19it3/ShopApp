import React, { useEffect, useState } from "react";
import { Box, Image, Pressable, ScrollView, Text, View } from "native-base";
import Colors from "../../color";
import axios from "axios";
import { ActivityIndicator, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateOrderStatus } from "../../Redux/Actions/OrderActions";

function Shipping() {
  const navigation = useNavigation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [order, setOrder] = useState([]);
  const Url = `https://server-shop-app.onrender.com`;
  const fetchProducts = async () => {
    try {
      //   const id = await Storage.getItem({ key: "userID" });
      const { data } = await axios.get(
        `${Url}/api/order/buyer/${userInfo._id}`
      );
      if (data.length > 0) {
        setOrder(data.filter((data) => data.status === "Đang giao hàng"));
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
    setRefreshing(true);
    setLoading(true);
    fetchProducts();
    setInterval(() => {
      setLoading(false);
      setRefreshing(false);
      setLoading(false);
    }, 1000);
  }, []);
  const getTime = () => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    return date + "/" + month + "/" + year + " - " + hours + ":" + minutes;
  };
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "",
  };

  const dispatch = useDispatch();
  const updateSold = (oid, seller) => {
    setRefreshing(true);
    dispatch(updateOrderStatus(oid, "Đã giao", getTime()));
    setTimeout(() => {
      fetchProducts();
      setRefreshing(false);
      navigation.navigate("ReviewScreen", seller);
    }, 2000);
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
            <View key={order._id}>
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
                <Text color="#0099CC">
                  Kiểm tra hàng trước khi bấm xác nhận
                </Text>
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
                  w="40%"
                  alignItems="center"
                  p={1}
                  borderWidth={0.8}
                  bg="white"
                  rounded={5}
                  onPress={() => {
                    navigation.navigate("OrderInfo", order);
                  }}
                >
                  <Text color="black">Xem đơn hàng</Text>
                </Pressable>
                <Pressable
                  w="40%"
                  alignItems="center"
                  p={1}
                  ml={2}
                  bg="#FFA500"
                  rounded={5}
                  onPress={() => {
                    updateSold(order._id, order.seller._id);
                  }}
                >
                  <Text color="white">Đã nhận hàng</Text>
                </Pressable>
              </View>
            </View>
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

export default Shipping;
