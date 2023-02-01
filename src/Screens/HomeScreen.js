import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  ScrollView,
  Image,
  Button,
  Center,
  HStack,
  View,
} from "native-base";
import HomeSearch from "../Components/HomeSearch";
import HomeProducts from "../Components/HomeProducts";
import Colors from "../color";
import SlideScreen from "../Components/SlideScreen";
import { ActivityIndicator, RefreshControl } from "react-native";
import axios from "axios";
import { Storage } from "expo-storage";
import { useNavigation } from "@react-navigation/native";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const categories = [
  {
    label: "Giải trí, thể thao",
    image: require("../../assets/giaitri.png"),
  },
  {
    label: "Thời trang",
    image: require("../../assets/thoitrang.jpg"),
  },
  {
    label: "Đồ điện tử",
    image: require("../../assets/dodientu.jpg"),
  },
];
const Url = `https://server-shop-app.onrender.com`;

function HomeScreen() {
  const [pro, setPro] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${Url}/api/product/show/accept`);
      setPro(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
      <HomeSearch />
      {loading ? (
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Slide */}
          <SlideScreen />
          {/* Categories */}
          <Box bg={Colors.white} mt={2} pb={5}>
            <Text bold p={3} fontSize={15}>
              Tìm kiếm theo sở thích
            </Text>
            <HStack>
              {categories.map((i, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  alignItems="center"
                  p={0}
                  pt={2}
                  _pressed={{ bg: "#E8E8E8" }}
                  onPress={() => {
                    navigation.navigate("Search");
                  }}
                >
                  <Center>
                    <Image
                      source={i.image}
                      alt="Xe"
                      h={70}
                      flex={1}
                      w={70}
                      resizeMode="contain"
                      rounded={10}
                    />
                  </Center>
                  <Text textAlign="center" flex={1} width={130}>
                    {i.label}
                  </Text>
                </Button>
              ))}
            </HStack>
          </Box>
          {/* Products */}
          <Box bg={Colors.white} mt={2} pb={5}>
            <Text bold p={3} fontSize={15}>
              Tin đăng mới
            </Text>
            <HomeProducts products={pro} />
          </Box>
        </ScrollView>
      )}
    </Box>
  );
}

export default HomeScreen;
