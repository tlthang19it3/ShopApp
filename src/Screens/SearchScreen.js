import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  ScrollView,
  HStack,
  View,
  Input,
  Pressable,
  Select,
  CheckIcon,
  Button,
} from "native-base";
import HomeProducts from "../Components/HomeProducts";
import Colors from "../color";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import axios from "axios";

const Url = `https://server-shop-app.onrender.com`;
const categories = [
  "Đồ điện tử",
  "Thời trang, đồ dùng cá nhân",
  "Giải trí thể thao",
];
const cities = ["Đà Nẵng", "Huế", "Quảng Nam", "Quảng Ngãi"];

const prices = [
  "Tất cả",
  "Từ 10 ngàn đến 500 ngàn",
  "Từ 500 ngàn đến 2 triệu",
  "Từ 2 triệu đến 5 triệu",
  "Trên 5 triệu",
];

function SearchScreen({ navigation }) {
  const [pro, setPro] = useState([]);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [cate, setCate] = useState("Tất cả");
  const [city1, setCity1] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);
  const [priceAscent, setPriceAscent] = useState(true);
  const [loading, setLoading] = useState(true);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const fetchProducts = async () => {
    const { data } = await axios.get(`${Url}/api/product/show/accept`);
    if (price === 0) {
      if (priceAscent === true) {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city)
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city)
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else if (price === 1) {
      if (priceAscent === true) {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 10000 &&
                data.price <= 500000
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 10000 &&
                data.price <= 500000
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else if (price === 2) {
      if (priceAscent === true) {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 500000 &&
                data.price <= 2000000
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 500000 &&
                data.price <= 2000000
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else if (price === 3) {
      if (priceAscent === true) {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 2000000 &&
                data.price <= 5000000
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 2000000 &&
                data.price <= 5000000
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else {
      if (priceAscent === true) {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 5000000
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setPro(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 5000000
            )
            .sort((a, b) => b.price - a.price)
        );
      }
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
  return (
    <Box bg={Colors.gray} flex={1}>
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
            onChangeText={(e) => {
              e = e.replace(/  +/g, " ");
              setSearch(e.replace(/^[ \t]+|[ \t]+$/gm, ""));
            }}
            onEndEditing={() => {
              setLoading(true);
              fetchProducts();
              wait(500).then(() => {
                setLoading(false);
              });
            }}
            variant="filled"
          />
        </View>
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          bg={Colors.white}
          paddingLeft={3}
          paddingRight={3}
          paddingBottom={3}
        >
          <Select
            selectedValue={cate}
            accessibilityLabel="Chọn danh mục"
            placeholder="Chọn danh mục"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              if (itemValue === "Tất cả") {
                setCategory("");
                setCate(itemValue);
              } else {
                setCategory(itemValue);
                setCate(itemValue);
              }
            }}
          >
            <Select.Item label="Tất cả" value="Tất cả" />
            {categories.map((data, index) => (
              <Select.Item key={index} label={data} value={data} />
            ))}
          </Select>

          <Select
            accessibilityLabel="Chọn thành phố"
            placeholder="Chọn thành phố"
            selectedValue={city1}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              if (itemValue === "Tất cả") {
                setCity("");
                setCity1(itemValue);
              } else {
                setCity(itemValue);
                setCity1(itemValue);
              }
            }}
          >
            <Select.Item label="Tất cả" value="Tất cả" />
            {cities.map((data, index) => (
              <Select.Item key={index} label={data} value={data} />
            ))}
          </Select>
          <View flexDirection="row">
            <Select
              flex={1}
              selectedValue={price}
              accessibilityLabel="Chọn mức giá"
              placeholder="Chọn mức giá"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setPrice(itemValue);
              }}
            >
              {prices.map((data, index) => (
                <Select.Item key={index} label={data} value={index} />
              ))}
            </Select>

            <Select
              flex={1}
              ml={1}
              selectedValue={priceAscent ? true : false}
              accessibilityLabel="Sắp xếp"
              placeholder="Sắp xếp"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setPriceAscent(itemValue);
              }}
            >
              <Select.Item label="Giá tăng dần" value={true} />
              <Select.Item label="Giá giảm dần" value={false} />
            </Select>
          </View>

          <View mt={3}>
            <Button
              bg={"#FFA54F"}
              _pressed={{ bg: "#FFA54F" }}
              onPress={() => {
                setLoading(true);
                fetchProducts();
                wait(500).then(() => {
                  setLoading(false);
                });
              }}
            >
              <Text color={"white"}>Áp dụng</Text>
            </Button>
          </View>
        </View>
        {loading ? (
          <View flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" />
          </View>
        ) : pro.length > 0 ? (
          <Box bg={Colors.white} mt={2} pb={5}>
            <HomeProducts products={pro} />
          </Box>
        ) : (
          <View flex={1} mt={20} alignItems="center">
            <Text fontSize={15}>Không tìm thấy tin đăng đáp ứng</Text>
          </View>
        )}
      </ScrollView>
    </Box>
  );
}

export default SearchScreen;
