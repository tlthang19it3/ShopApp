import React, { useState } from "react";
import {
  Text,
  Box,
  ScrollView,
  HStack,
  View,
  Input,
  Pressable,
  VStack,
  Divider,
  Avatar,
  Image,
  TextArea,
  FormControl,
  Radio,
  Select,
  CheckIcon,
  Slide,
} from "native-base";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ActivityIndicator } from "react-native";
const cities = ["Đà Nẵng", "Huế", "Quảng Nam", "Quảng Ngãi"];
const district1 = ["Hải châu", "Thanh khê", "Ngũ hành sơn", "Liên chiểu"];
const district2 = ["Nam Đông", "Phong Điền", "Phú Lộc", "Phú Vang"];
const district3 = ["Đại Lộc", "Đông Giang", "Phú Ninh", "Quế Sơn"];
const wards = ["Hải Châu 1", "Hoà Cường Bắc", "Nam Dương", "Phước Ninh"];
const Url = `https://server-shop-app.onrender.com`;

function PaymentScreen({ navigation, route }) {
  const getTime = () => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    return hours + ":" + minutes;
  };
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const { product, owner } = route.params;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [dis, setDis] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const validatePhone = (phone) => {
    let reg = /^0[0-9\-\+]{9,10}$/;
    if (reg.test(phone) === false) {
      return false;
    } else {
      setPhone(phone);
      return true;
    }
  };

  const validateForm = () => {
    if (name.trim() === "") {
      setError("Tên không được để trống");
      return false;
    } else if (phone.length < 10) {
      setError("Số điện thoại phải đúng định dạng");
      return false;
    } else if (city.trim() === "") {
      setError("Thành phố không được để trống");
      return false;
    } else if (dis.trim() === "") {
      setError("Quận, huyện không được để trống");
      return false;
    } else if (ward.trim() === "") {
      setError("Phường, xã không được để trống");
      return false;
    } else if (address.trim() === "") {
      setError("Địa chỉ không được để trống");
      return false;
    } else if (address.length < 5) {
      setError("Địa chỉ phải trên 4 kí tự");
      return false;
    } else if (name.length < 5) {
      setError("Tên phải trên 4 kí tự");
      return false;
    }
    setError("");
    return true;
  };

  const onSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      dispatch(
        createOrder(
          userInfo._id,
          owner,
          product,
          name,
          phone,
          city,
          dis,
          ward,
          address,
          product.price,
          note,
          getTime()
        )
      );
      setName("");
      setCity("");
      setDis("");
      setWard("");
      setAddress("");
      setIsOpen(true);
      setLoading(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } else {
      console.log("Validation Failed");
    }
  };

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
      <Slide in={isOpen} placement="top">
        <Box
          w="100%"
          position="absolute"
          p="2"
          h="50"
          bg="emerald.100"
          alignItems="center"
          justifyContent="center"
          _dark={{
            bg: "emerald.200",
          }}
          safeArea
        >
          <HStack space={2}>
            <CheckIcon
              size="4"
              color="emerald.600"
              mt="1"
              _dark={{
                color: "emerald.700",
              }}
            />
            <Text
              color="emerald.600"
              textAlign="center"
              _dark={{
                color: "emerald.700",
              }}
              fontWeight="medium"
              fontSize={17}
            >
              ĐẶT HÀNG THÀNH CÔNG
            </Text>
          </HStack>
        </Box>
      </Slide>
      <HStack
        space={3}
        w="full"
        px={4}
        bg="#FFA500"
        py={3}
        alignItems="center"
        safeAreaTop
      >
        <Pressable onPress={() => navigation.navigate("Bottom")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text bold fontSize={17} color="white">
          Xác nhận đơn hàng
        </Text>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View alignItems="center" mt={5}>
          <HStack>
            <VStack alignItems="center">
              <MaterialCommunityIcons
                name="clipboard-clock-outline"
                size={30}
                color="green"
              />
              <Text color="green.700" fontSize={10}>
                Nhận đơn
              </Text>
            </VStack>
            <Divider orientation="horizontal" w={10} my={5} borderWidth={0.8} />
            <VStack alignItems="center">
              <Ionicons name="ios-location-sharp" size={29} color="gray" />
              <Text color="gray.700" fontSize={10}>
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

        <Divider orientation="horizontal" my={5} bg="gray.300" />

        <View px={5}>
          <HStack>
            <View flexDirection="row">
              <SimpleLineIcons name="location-pin" size={24} color="#EC870E" />
              <Text bold ml={1} fontSize={17} color="black">
                Thông tin người nhận
              </Text>
            </View>
          </HStack>
          <FormControl
            isRequired
            mt={2}
            isInvalid={error.trim() == "" ? false : true}
          >
            <VStack space={1} w="full">
              <Input
                value={name}
                placeholder="Tên người nhận"
                fontSize={16}
                _focus={{ borderColor: "gray.300", bg: "white" }}
                onChangeText={(e) => setName(e)}
              />
              {error.includes("Tên") ? (
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
              ) : (
                <View></View>
              )}
              <Input
                placeholder="Số điện thoại"
                fontSize={16}
                keyboardType="numeric"
                _focus={{ borderColor: "gray.300", bg: "white" }}
                onChangeText={(e) => validatePhone(e)}
              />
              {error.includes("Số điện thoại") ? (
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
              ) : (
                <View></View>
              )}
              <Select
                selectedValue={city}
                fontSize={16}
                accessibilityLabel="Tỉnh, Thành phố"
                placeholder="Tỉnh, Thành phố"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                onValueChange={(itemValue) => {
                  setCity(itemValue);
                }}
              >
                {cities.map((data, index) => (
                  <Select.Item key={index} label={data} value={data} />
                ))}
              </Select>
              {error.includes("Thành phố") ? (
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
              ) : (
                <View></View>
              )}
              <Select
                fontSize={16}
                selectedValue={dis}
                accessibilityLabel="Quận, Huyện"
                placeholder="Quận, Huyện"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                isDisabled={city != "" ? false : true}
                onValueChange={(itemValue) => {
                  setDis(itemValue);
                }}
              >
                {city === "Đà Nẵng"
                  ? district1.map((data, index) => (
                      <Select.Item key={index} label={data} value={data} />
                    ))
                  : city === "Huế"
                  ? district2.map((data, index) => (
                      <Select.Item key={index} label={data} value={data} />
                    ))
                  : district3.map((data, index) => (
                      <Select.Item key={index} label={data} value={data} />
                    ))}
              </Select>
              {error.includes("Quận") ? (
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
              ) : (
                <View></View>
              )}
              <Select
                fontSize={16}
                selectedValue={ward}
                accessibilityLabel="Phường, Xã"
                placeholder="Phường, Xã"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                isDisabled={city != "" && dis != "" ? false : true}
                onValueChange={(itemValue) => {
                  setWard(itemValue);
                }}
              >
                {wards.map((data, index) => (
                  <Select.Item key={index} label={data} value={data} />
                ))}
              </Select>
              {error.includes("Phường") ? (
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
              ) : (
                <View></View>
              )}
              <Input
                value={address}
                placeholder="Địa chỉ cụ thể"
                fontSize={16}
                _focus={{ borderColor: "gray.300", bg: "white" }}
                onChangeText={(e) => setAddress(e)}
              />
              {error.includes("Địa chỉ") ? (
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
              ) : (
                <View></View>
              )}
            </VStack>
          </FormControl>
        </View>
        <Divider orientation="horizontal" my={5} bg="gray.300" />

        <View px={5}>
          <HStack alignItems="center" space={3}>
            <Avatar
              size="sm"
              source={{
                uri: owner.avatar,
              }}
            />
            <Text bold>{owner.name}</Text>
          </HStack>
          <HStack mt={5} space={4}>
            <Image
              source={{
                uri: product.image,
              }}
              height={70}
              width={70}
              alt="a"
            />
            <VStack>
              <Text fontSize={18}>{product.title}</Text>
              <Text bold color="red.700" fontSize={16}>
                {currencyFormatter(product.price, defaultOptions)}đ
              </Text>
              <Text fontSize={13} color="gray.500">
                {product.ward}, Quận {product.district}, TP {product.city}
              </Text>
            </VStack>
          </HStack>
        </View>
        <Divider orientation="horizontal" my={5} bg="gray.300" />
        <View px={5}>
          <HStack>
            <MaterialIcons name="shopping-bag" size={24} color="#EC870E" />
            <Text bold ml={1} fontSize={17} color="black">
              Số tiền thanh toán
            </Text>
          </HStack>
          <View
            px={5}
            mt={2}
            borderWidth={1}
            rounded={10}
            p={2}
            borderColor="#FF9900"
          >
            <View
              flexDirection="row"
              borderBottomWidth={1}
              pb={2}
              borderStyle="dotted"
            >
              <Text fontSize={16} color="#CC6600">
                Tổng tiền
              </Text>
              <Text fontSize={16} bold marginLeft="auto">
                {currencyFormatter(product.price, defaultOptions)}đ
              </Text>
            </View>
            {/* <View flexDirection="row">
              <Text fontSize={16} color="#CC6600">
                Khuyến mãi
              </Text>
              <Text fontSize={16} bold marginLeft="auto">
                1200đ (-3%)
              </Text>
            </View>
            <View
              flexDirection="row"
              borderBottomWidth={1}
              pb={2}
              borderStyle="dotted"
            >
              <Text fontSize={16} color="#CC6600">
                Phí giao hàng
              </Text>
              <Text fontSize={16} bold marginLeft="auto">
                12000đ
              </Text>
            </View> */}
            <View flexDirection="row" pt={2}>
              <Text fontSize={16} color="red.500" bold>
                Tổng thanh toán
              </Text>
              <Text fontSize={16} color="red.500" bold marginLeft="auto">
                {currencyFormatter(product.price, defaultOptions)}đ
              </Text>
            </View>
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
            mt={3}
            _focus={{ borderColor: "gray.400", bg: "white" }}
            alignItems="stretch"
            placeholder="Nhập ghi chú cho người bán.."
            onChangeText={(e) => setNote(e)}
          ></TextArea>
        </View>
      </ScrollView>
      <View px={5} pb={3} pt={3} borderTopWidth={0.5} borderTopColor="gray.200">
        <HStack>
          <View>
            <Text fontSize={10}>TỔNG CỘNG:</Text>
            <Text bold fontSize={18}>
              {currencyFormatter(product.price, defaultOptions)}đ
            </Text>
          </View>
          {loading ? (
            <Pressable
              marginLeft="auto"
              width="60%"
              bg="gray.500"
              justifyContent="center"
              rounded={7}
            >
              <ActivityIndicator size="large" />
            </Pressable>
          ) : disabled ? (
            <Pressable
              marginLeft="auto"
              width="60%"
              bg="gray.500"
              justifyContent="center"
              rounded={7}
            >
              <Text bold color="white" textAlign="center">
                ĐÃ ĐẶT HÀNG
              </Text>
            </Pressable>
          ) : (
            <Pressable
              marginLeft="auto"
              width="60%"
              bg="#EC870E"
              justifyContent="center"
              rounded={7}
              onPress={() => {
                onSubmit();
              }}
            >
              <Text bold color="white" textAlign="center">
                ĐẶT HÀNG
              </Text>
            </Pressable>
          )}
        </HStack>
      </View>
    </Box>
  );
}

export default PaymentScreen;
