import {
  Box,
  Text,
  ScrollView,
  Image,
  Heading,
  HStack,
  View,
  Input,
  Pressable,
  VStack,
  Center,
  Avatar,
  Divider,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import Rating from "../Components/Rating";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
const Url = `https://server-shop-app.onrender.com`;
function SingleProductScreen({ route }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [imgActive, setImageActive] = useState(0);
  const [owner, setOwner] = useState({});
  const navigation = useNavigation();
  const product = route.params;
  const [saveBlog, setSaveBlog] = useState(0);
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setImageActive(slide);
      }
    }
  };

  const fetchProfileOwner = async () => {
    try {
      const { data } = await axios.get(
        `${Url}/api/users/profile/${product.userId}`
      );
      setOwner(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [pro, setPro] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      fetchProfileOwner();
      const { data } = await axios.get(`${Url}/api/product/show/accept`);
      setPro(data.filter((data) => data.category === product.category));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
            variant="filled"
            onPressIn={() => {
              navigation.navigate("Search");
            }}
          />
        </View>
      </HStack>
      {loading ? (
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView px={3} showsVerticalScrollIndicator={false}>
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled
              onScroll={({ nativeEvent }) => onchange(nativeEvent)}
              bg="white"
            >
              {product.imageList.map((image, index) => (
                <Image
                  key={index}
                  resizeMode="contain"
                  alt="slide"
                  source={{ uri: image }}
                  w={400}
                  h={300}
                />
              ))}
            </ScrollView>
            <View
              position="absolute"
              flexDirection="row"
              alignSelf="center"
              bottom={0}
            >
              {product.imageList.map((e, index) => (
                <Text
                  key={index}
                  fontSize={30}
                  style={
                    imgActive == index
                      ? { color: "black", margin: 3 }
                      : { color: "white", margin: 3 }
                  }
                >
                  •
                </Text>
              ))}
            </View>
          </View>
          <View borderBottomWidth={0.2} borderBottomColor="#B5B5B5" pb={3}>
            <Heading bold fontSize={15} mb={2} lineHeight={22}>
              {product.title}
            </Heading>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack>
                <Heading bold color={Colors.red} fontSize={15}>
                  {currencyFormatter(product.price, defaultOptions)}đ
                </Heading>
                <Rating value={owner.rating} />
              </VStack>
              <Pressable
                p={1.5}
                rounded={30}
                borderWidth={0.5}
                borderColor={Colors.red}
                flexDirection="row"
                onPress={() => {
                  saveBlog === 0 ? setSaveBlog(1) : setSaveBlog(0);
                }}
              >
                <Text color={Colors.red} mr={2}>
                  {saveBlog === 0 ? "Lưu tin" : "Đã lưu"}
                </Text>
                <Ionicons
                  name={saveBlog === 0 ? "heart-outline" : "heart"}
                  size={20}
                  color={Colors.red}
                />
              </Pressable>
            </View>
          </View>
          <HStack
            alignItems="center"
            borderBottomColor="#B5B5B5"
            borderBottomWidth={0.2}
            pb={3}
          >
            <Box flex={1} flexDirection="row" pt={3} alignItems="center">
              <Pressable>
                <Image
                  source={{ uri: owner.avatar }}
                  alt="avatar"
                  h={10}
                  w={10}
                  resizeMode="contain"
                  rounded="full"
                />
              </Pressable>
              <Text ml={3} bold>
                {owner.name}
              </Text>
            </Box>
            <Pressable
              mt={3}
              p={1.5}
              rounded={30}
              borderWidth={0.5}
              borderColor="#EE9A00"
              onPress={() => {
                navigation.navigate("OwnerProfile", owner);
              }}
            >
              <Text color="#EE9A00">Xem trang</Text>
            </Pressable>
          </HStack>

          <View>
            <Text lineHeight={24} textAlign="justify" mt={3}>
              {product.description}
            </Text>
            <Text underline color="#00405d" mt={5}>
              Liên hệ ngay: {owner.phone}
            </Text>
            <View flexDirection="row" alignItems="center" mt={1}>
              <Image
                source={require("../../assets/tinhtrang.png")}
                alt="tinhtrang"
                h={5}
                w={5}
              />
              <Text ml={1}>
                Tình trạng: {product.isNew === false ? "Đã sử dụng" : "Mới"}
              </Text>
            </View>
          </View>

          <View borderBottomColor="#B5B5B5" borderBottomWidth={0.2} mt={2}>
            <Text fontSize={18} bold color="#363636">
              Khu vực
            </Text>
          </View>

          <View flexDirection="row" alignItems="center" mt={2}>
            <EvilIcons name="location" size={24} color="black" />
            <Text>
              Phường {product.ward}, Quận {product.district}, {product.city}
            </Text>
          </View>
          <View pb={10} mt={10}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              borderBottomColor="#B5B5B5"
              borderBottomWidth={0.2}
              pb={2}
            >
              <Text bold>Tin đăng tương tự</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SimiliarProduct", pro)}
              >
                <Text bold color="#436EEE">
                  Xem tất cả {">"}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {pro.slice(0, 10).map((product) => (
                <TouchableOpacity
                  key={product._id}
                  alignItems="center"
                  style={{
                    marginHorizontal: 15,
                    marginTop: 10,
                  }}
                  onPress={() => navigation.push("Single", product)}
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
                  <Text
                    flex={1}
                    numberOfLines={2}
                    isTruncated
                    w={110}
                    fontSize={16}
                  >
                    {product.title}
                  </Text>
                  <Text color={Colors.red} bold>
                    {currencyFormatter(product.price, defaultOptions)}
                    <Text underline>đ</Text>
                  </Text>
                  <Text color={Colors.deepestGray}>tại Đồng Nai</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text bold fontSize={18} pb={5} textAlign="center">
            Đánh giá từ người mua đối với {owner.name}
          </Text>
          <Divider orientation="horizontal" />
          {owner.numReviews > 0 ? (
            owner.reviews.map((review, index) => (
              <View
                p={3}
                key={index}
                borderBottomWidth={0.8}
                borderColor={"gray.300"}
                flexDirection="row"
                alignItems="center"
              >
                <Avatar source={{ uri: review.avatar }} />
                <View ml={3}>
                  <Text bold fontSize={15} color={Colors.black}>
                    {review.name}
                  </Text>

                  <Text w="100%">{review.comment}</Text>
                  <View alignItems="center" flexDirection="row">
                    <Rating value={review.rating} />
                    <Text color="gray.500" fontSize={10}>
                      {" "}
                      | {review.date}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View flex={1} p={10} alignItems="center">
              <Text fontSize={15}>Chưa có đánh giá nào</Text>
            </View>
          )}
        </ScrollView>
      )}
      {userInfo ? (
        userInfo._id === owner._id ? (
          <View mt={1}>
            <Pressable
              bg="#589f39"
              color={Colors.black}
              p={3}
              onPress={() =>
                navigation.navigate("EditBlog", {
                  cate: product.category,
                  info: product,
                })
              }
            >
              <Center flexDirection="row">
                <AntDesign name="edit" size={24} color="white" />
                <Text fontSize={17} ml={1} color="white" bold>
                  SỬA TIN
                </Text>
              </Center>
            </Pressable>
          </View>
        ) : (
          <View mt={1}>
            <Pressable
              bg="#589f39"
              color={Colors.black}
              p={3}
              onPress={() =>
                navigation.navigate("Checkout", {
                  product: product,
                  owner: owner,
                })
              }
            >
              <Center flexDirection="row">
                <Text fontSize={17} ml={1} color="white" bold>
                  {product.isSold === true ? "SẢN PHẨM ĐÃ ẨN/BÁN" : "MUA NGAY"}
                </Text>
              </Center>
            </Pressable>
          </View>
        )
      ) : (
        <View mt={1}>
          <Pressable
            bg="#589f39"
            color={Colors.black}
            p={3}
            onPress={() => navigation.navigate("Login")}
          >
            <Center flexDirection="row">
              <Text fontSize={17} ml={1} color="white" bold>
                MUA NGAY
              </Text>
            </Center>
          </Pressable>
        </View>
      )}
    </Box>
  );
}

export default SingleProductScreen;
