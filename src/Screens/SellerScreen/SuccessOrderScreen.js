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
} from "native-base";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Url = `https://server-shop-app.onrender.com`;

function SuccessOrderScreen({ data }) {
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
              <AntDesign name="checkcircleo" size={30} color="green" />
              <Text color="green.700" fontSize={10}>
                Chốt đơn
              </Text>
            </VStack>
            <Divider orientation="horizontal" w={10} my={5} borderWidth={0.8} />
            <VStack alignItems="center">
              <AntDesign name="checkcircleo" size={30} color="green" />
              <Text color="green.700" fontSize={10}>
                Giao hàng
              </Text>
            </VStack>
            <Divider orientation="horizontal" w={10} my={5} borderWidth={0.8} />
            <VStack alignItems="center">
              <MaterialCommunityIcons
                name="archive-check"
                size={30}
                color="green"
              />
              <Text color="green.700" fontSize={10}>
                Hoàn tất
              </Text>
            </VStack>
          </HStack>
        </View>
        <Text textAlign="center" bold mt={2}>
          Đơn hàng hoàn tất
        </Text>
        <View alignItems="center" mt={10}>
          <Image
            alt="a"
            size={200}
            source={{
              uri: "https://www.pngall.com/wp-content/uploads/5/Open-Box-PNG-File.png",
            }}
          />
          <View position="absolute" top={0} bg="white" rounded="full">
            <Image
              alt="a"
              size={20}
              source={require("../../../assets/check.png")}
            />
          </View>
          <Text bold mt={2} fontSize={16}>
            Người mua đã nhận được hàng
          </Text>
          <Text>Đơn hàng đã được giao đến người mua</Text>
        </View>

        <Divider orientation="horizontal" my={5} bg="gray.300" />
        <View px={5}>
          <HStack>
            <Text fontSize={14} bg="#33CC66" color="white" p={1} rounded={3}>
              Đã giao
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
          <View flexDirection="row">
            <Text color="gray.500">Ngày nhận hàng: </Text>
            <Text bold>{order.timeReceived}</Text>
          </View>
        </View>
        <Divider orientation="horizontal" my={5} bg="gray.300" />
        <Text bold fontSize={17} px={5}>
          Thông tin đơn hàng
        </Text>
        <View borderWidth={0.5} marginX={5} p={3} mt={3} rounded={8}>
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
          <View mt={3}>
            <View flexDirection="row" alignItems="center">
              <MaterialIcons name="place" size={24} color="red" />
              <Text>GIAO ĐẾN</Text>
            </View>
            <Text px={3} bold>
              {order.address}, phường {order.ward}, quận {order.district}, TP{" "}
              {order.city}
            </Text>
          </View>
        </View>
        <Divider orientation="horizontal" my={5} bg="gray.300" />
        <View px={5}>
          <Text bold fontSize={17}>
            Thông tin người mua
          </Text>
          <View mt={2}>
            <Text>
              Họ và tên: <Text bold>{order.name}</Text>
            </Text>
            <Text>
              Số điện thoại: <Text bold>{order.phone}</Text>
            </Text>
            <Text>
              Địa chỉ:{" "}
              <Text bold>
                {order.address}, phường {order.ward}, quận {order.district}, TP{" "}
                {order.city}
              </Text>
            </Text>
          </View>
          <View pb={5} mt={2}>
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
          <View pb={5}>
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
        </View>
      </ScrollView>
    </Box>
  );
}

export default SuccessOrderScreen;
