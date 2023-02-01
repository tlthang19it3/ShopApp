import React, { useState } from "react";
import {
  Text,
  Box,
  ScrollView,
  HStack,
  View,
  Pressable,
  VStack,
  Divider,
  Image,
  TextArea,
  Avatar,
} from "native-base";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Url = `https://server-shop-app.onrender.com`;

function WaitAcceptScreen({ data }) {
  const order = data;
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
    <Box flex={1} bg={"white"}>
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
          Chi tiết đơn hàng
        </Text>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View alignItems="center" mt={5}>
          <HStack>
            <VStack alignItems="center">
              <AntDesign name="checkcircleo" size={30} color="green" />
              <Text color="green.700" fontSize={10}>
                Nhận đơn
              </Text>
            </VStack>
            <Divider orientation="horizontal" w={10} my={5} borderWidth={0.8} />
            <VStack alignItems="center">
              <Ionicons name="ios-location-sharp" size={29} color="green" />
              <Text color="green.700" fontSize={10}>
                Chốt đơn
              </Text>
            </VStack>
            <Divider orientation="horizontal" w={10} my={5} borderWidth={0.8} />
            <VStack alignItems="center">
              <MaterialIcons name="delivery-dining" size={30} color="gray" />
              <Text color="gray.700" fontSize={10}>
                Giao hàng
              </Text>
            </VStack>
            <Divider orientation="horizontal" w={10} my={5} borderWidth={0.8} />
            <VStack alignItems="center">
              <MaterialCommunityIcons
                name="archive-check"
                size={30}
                color="gray"
              />
              <Text color="gray.700" fontSize={10}>
                Hoàn tất
              </Text>
            </VStack>
          </HStack>
        </View>
        <View borderWidth={0.5} marginX={5} p={3} mt={8} rounded={8}>
          <Text bold fontSize={17} pb={2} color="orange.600">
            Thông tin người bán
          </Text>
          <View flexDirection="row">
            <Avatar source={{ uri: order.seller.avatar }} />
            <View ml={5}>
              <Text fontSize={18}>{order.seller.name}</Text>
              <Text fontSize={16}>
                <Text bold>
                  Số điện thoại: <Text bold>{order.seller.phone}</Text>
                </Text>
              </Text>
            </View>
          </View>
          <Text bold fontSize={17} mt={2} pb={3} color="orange.600">
            Thông tin sản phẩm
          </Text>
          <HStack space={4} borderBottomWidth={1} borderStyle="dashed" pb={3}>
            <Image
              source={{
                uri: order.blog.image,
              }}
              height={70}
              width={70}
              alt="a"
            />
            <VStack>
              <Text fontSize={18}>{order.blog.title}</Text>
              <Text fontSize={16}>
                <Text bold color="red.700">
                  Thanh toán COD:{" "}
                  <Text bold color="green.700">
                    {currencyFormatter(order.total, defaultOptions)}đ
                  </Text>
                </Text>
              </Text>
              <Text fontSize={13} color="gray.500">
                {order.blog.ward}, {order.blog.district}, {order.blog.city}
              </Text>
            </VStack>
          </HStack>
          <View alignItems="center" mt={3}>
            <MaterialCommunityIcons
              name="clipboard-text-clock"
              size={40}
              color="gray"
            />
            <Text bold fontSize={17} color="gray.600">
              Chờ xác nhận đơn hàng
            </Text>
          </View>
        </View>
        <Divider orientation="horizontal" my={5} bg="gray.300" />
        <View px={5}>
          <HStack>
            <Text fontSize={14} bg="#CAE5E8" color="#103667" p={1} rounded={3}>
              Chờ xác nhận
            </Text>
          </HStack>
          <View flexDirection="row" mt={1}>
            <Text bold fontSize={17}>
              Thanh toán COD:{" "}
            </Text>
            <Text bold fontSize={17} color="green.600">
              {currencyFormatter(order.total, defaultOptions)}đ
            </Text>
          </View>
          <View
            flexDirection="row"
            borderBottomWidth={1}
            pb={2}
            borderStyle="dashed"
          >
            {/* <Text color="gray.500">Mã đơn hàng: </Text>
            <Text bold>XHADH12dnq</Text> */}
          </View>
          <View flexDirection="row" mt={2}>
            <Text color="gray.500">Ngày đặt hàng: </Text>
            <Text bold>
              {order.createdAt} - {order.timeCreated}
            </Text>
          </View>
        </View>
        <Divider orientation="horizontal" my={5} bg="gray.300" />
        <View px={5}>
          <HStack pb={3}>
            <MaterialIcons name="shopping-bag" size={24} color="#EC870E" />
            <Text bold ml={1} fontSize={17} color="black">
              Phương thức thanh toán
            </Text>
          </HStack>

          <View
            flexDirection="row"
            borderWidth={0.8}
            borderColor="gray.400"
            rounded={5}
            p={2}
            alignItems="center"
          >
            <FontAwesome name="credit-card" size={24} color="black" />
            <Text ml={2} fontSize={17}>
              Thanh toán COD
            </Text>
          </View>
        </View>
        <Divider orientation="horizontal" my={5} bg="gray.300" />
        <View px={5} pb={5}>
          <View flexDirection="row">
            <MaterialCommunityIcons
              name="note-text-outline"
              size={24}
              color="black"
            />
            <Text bold>Ghi chú</Text>
          </View>
          <TextArea
            value={order.note}
            mt={3}
            _disabled={{ opacity: 1 }}
            isDisabled
            _focus={{ borderColor: "gray.400", bg: "white" }}
            alignItems="stretch"
          ></TextArea>
        </View>
      </ScrollView>
    </Box>
  );
}

export default WaitAcceptScreen;
