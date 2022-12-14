import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  useToast,
  View,
} from "native-base";
import Colors from "../../color";
import { FontAwesome } from "@expo/vector-icons";
import { Storage } from "expo-storage";
import axios from "axios";
import { RefreshControl, ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";
import { updateStatusBlog } from "../../Redux/Actions/ProductActions";

function Other() {
  const toast = useToast();
  const [product, setProduct] = useState([]);
  const Url = `http://192.168.1.7:5000`;
  const fetchProducts = async () => {
    try {
      const id = await Storage.getItem({ key: "userID" });
      const { data } = await axios.get(`${Url}/api/product/users/${id}`);
      if (data.length > 0) {
        setProduct(
          data.filter((data) => data.isShow === false || data.isAccept === 0)
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
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
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
              <Text color="white">???n tin th??nh c??ng</Text>
            </Box>
          );
        },
      });
      wait(1000).then(() => toast.closeAll());
    });
  };
  const showBlog = (id) => {
    dispatch(updateStatusBlog(id, true));
    setRefreshing(true);
    wait(2000).then(() => {
      fetchProducts();
      setRefreshing(false);
      toast.show({
        render: () => {
          return (
            <Box bg="gray.500" px="2" py="1" rounded="md" mb={10}>
              <Text color="white">Hi???n tin th??nh c??ng</Text>
            </Box>
          );
        },
      });
      wait(1000).then(() => toast.closeAll());
    });
  };
  return (
    <Box h="full" bg={Colors.gray}>
      <Pressable
        bg={Colors.white}
        p={2}
        alignItems="center"
        shadow={1}
        onPress={() => (show ? setShow(false) : setShow(true))}
      >
        <HStack>
          <Text fontSize={16}>L???c tin</Text>
          <FontAwesome
            name="sort-down"
            size={16}
            color="black"
            style={{ marginLeft: 5 }}
          />
        </HStack>
      </Pressable>
      {show && (
        <View bg={Colors.white} mt={1}>
          <Pressable
            p={3}
            borderBottomWidth={0.5}
            w="full"
            alignItems="center"
            borderBottomColor={Colors.deepestGray}
            onPress={() => {
              setShow(false);
              setValue(2);
            }}
          >
            <Text>Tin ???? ???n</Text>
          </Pressable>
          <Pressable
            p={3}
            w="full"
            alignItems="center"
            borderBottomWidth={0.5}
            borderBottomColor={Colors.deepestGray}
            onPress={() => {
              setShow(false);
              setValue(1);
            }}
          >
            <Text>Tin ?????i duy???t</Text>
          </Pressable>
          <Pressable
            p={3}
            w="full"
            alignItems="center"
            onPress={() => {
              setShow(false);
              setValue(0);
            }}
          >
            <Text>Hi???n t???t c???</Text>
          </Pressable>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {product.length > 0 ? (
          value === 0 ? (
            product.map((product) => (
              <View
                key={product._id}
                mt={2}
                bg={Colors.white}
                flexDirection="row"
                alignItems="center"
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
                  {/* {product.isAccept === 0 ? (
                    <Text color={product.isShow ? Colors.red : "gray.500"} bold>
                      {product.isShow ? "?????i duy???t" : "Tin ???? ???n"}
                    </Text>
                  ) : (
                    <Text color={Colors.red} bold>
                      Tin ???? duy???t
                    </Text>
                  )} */}
                  <Text color={product.isShow ? Colors.red : "gray.500"} bold>
                    {product.isShow ? "?????i duy???t" : "Tin ???? ???n"}
                  </Text>
                  <Text isTruncated>{product.title}</Text>
                  <Text bold>
                    {currencyFormatter(product.price, defaultOptions)}??
                  </Text>
                  <Text color="gray.500" fontSize={11}>
                    {product.createdAt}
                  </Text>
                </View>
                <Spacer />
                <Pressable
                  borderWidth={0.8}
                  borderColor={product.isShow ? "black" : "gray.300"}
                  mr={5}
                  rounded={10}
                  pr={4}
                  pl={4}
                  pt={1}
                  pb={1}
                  onPress={() => {
                    product.isShow
                      ? hideBlog(product._id)
                      : showBlog(product._id);
                  }}
                >
                  <Text color={product.isShow ? "black" : "gray.300"}>
                    {product.isShow ? "???n tin" : "Hi???n tin"}
                  </Text>
                </Pressable>
              </View>
            ))
          ) : value === 1 ? (
            product
              .filter(
                (product) => product.isAccept === 0 && product.isShow === true
              )
              .map((product) => (
                <View
                  key={product._id}
                  mt={2}
                  bg={Colors.white}
                  flexDirection="row"
                  alignItems="center"
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
                    <Text color={Colors.red} bold>
                      ?????i duy???t
                    </Text>
                    <Text isTruncated>{product.title}</Text>
                    <Text bold>
                      {currencyFormatter(product.price, defaultOptions)}??
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
                    onPress={() => hideBlog(product._id)}
                  >
                    <Text>???n tin</Text>
                  </Pressable>
                </View>
              ))
          ) : (
            product
              .filter((product) => product.isShow === false)
              .map((product) => (
                <View
                  key={product._id}
                  mt={2}
                  bg={Colors.white}
                  flexDirection="row"
                  alignItems="center"
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
                    <Text color="gray.500" bold>
                      Tin ???? ???n
                    </Text>
                    <Text isTruncated>{product.title}</Text>
                    <Text bold>
                      {currencyFormatter(product.price, defaultOptions)}??
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
                    onPress={() => {
                      showBlog(product._id);
                    }}
                  >
                    <Text>Hi???n tin</Text>
                  </Pressable>
                </View>
              ))
          )
        ) : (
          <View flex={1} mt={20} alignItems="center">
            <Text fontSize={15}>B???n ch??a c?? tin n??o trong m???c n??y</Text>
          </View>
        )}
      </ScrollView>
    </Box>
  );
}

export default Other;
