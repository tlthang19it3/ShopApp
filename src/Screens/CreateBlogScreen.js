import {
  Box,
  Text,
  ScrollView,
  HStack,
  Pressable,
  View,
  Image,
  VStack,
  Input,
  TextArea,
  Select,
  CheckIcon,
  Center,
  Button,
  Progress,
  Slide,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { StorageClient } from "@supabase/storage-js";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { addBlog } from "../Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";
import { Storage } from "expo-storage";
import * as ImagePicker from "expo-image-picker";
const STORAGE_URL = "https://ngfxbagkjhxyputmwoxp.supabase.co/storage/v1";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZnhiYWdramh4eXB1dG13b3hwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDIyMDE2NSwiZXhwIjoxOTg1Nzk2MTY1fQ.v1Bml2eA_eQno7gMBfDbtgLiyovkVs9orOz1w_89aVI"; //! service key, not anon key

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});
const categories = [
  "Đồ điện tử",
  "Thời trang, đồ dùng cá nhân",
  "Giải trí thể thao",
];
const cities = ["Đà Nẵng", "Huế", "Quảng Nam", "Quảng Ngãi"];
const district1 = ["Hải châu", "Thanh khê", "Ngũ hành sơn", "Liên chiểu"];
const district2 = ["Nam Đông", "Phong Điền", "Phú Lộc", "Phú Vang"];
const district3 = ["Đại Lộc", "Đông Giang", "Phú Ninh", "Quế Sơn"];
const wards = ["Hải Châu 1", "Hoà Cường Bắc", "Nam Dương", "Phước Ninh"];
function CreateBlogScreen({ navigation }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [price2, setPrice2] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(false);
  const [id, setID] = useState("");
  const [New, setNew] = useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [fileName3, setFileName3] = useState("");

  const [ext1, setExt1] = useState("");
  const [ext2, setExt2] = useState("");
  const [ext3, setExt3] = useState("");

  const [cate, setCate] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [city, setCity] = useState("");
  const [dis, setDis] = useState("");
  const [ward, setWard] = useState("");

  const validatePrice = (price) => {
    let reg = /^[0-9\-\+]{5,10}$/;
    if (reg.test(price) === false) {
      setPrice("");
    } else {
      setPrice(price);
    }
  };

  const updateImage = async (index) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        const ext = result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf(".") + 1
        );
        const fileName = result.assets[0].uri.replace(/^.*[\\\/]/, "");
        if (index === 1) {
          setImage(result.assets[0].uri);
          setFileName1(fileName);
          setExt1(ext);
        } else if (index === 2) {
          setImage1(result.assets[0].uri);
          setFileName2(fileName);
          setExt2(ext);
        } else {
          setImage2(result.assets[0].uri);
          setFileName3(fileName);
          setExt3(ext);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const addBlogHandler = async () => {
    setLoading(true);

    const formData1 = new FormData();
    formData1.append("files", {
      uri: image,
      name: fileName1,
      type: `image/${ext1}`,
    });

    const formData2 = new FormData();
    formData2.append("files", {
      uri: image1,
      name: fileName2,
      type: `image/${ext2}`,
    });

    const formData3 = new FormData();
    formData3.append("files", {
      uri: image2,
      name: fileName3,
      type: `image/${ext3}`,
    });

    const im1 = await storageClient.from("image").upload(fileName1, formData1);
    setProgress(33);
    const im2 = await storageClient.from("image").upload(fileName2, formData2);
    setProgress(66);
    const im3 = await storageClient.from("image").upload(fileName3, formData3);
    setProgress(100);
    const link1 = await storageClient.from("image").getPublicUrl(fileName1);
    const link2 = await storageClient.from("image").getPublicUrl(fileName2);
    const link3 = await storageClient.from("image").getPublicUrl(fileName3);
    dispatch(
      addBlog(
        userInfo._id,
        cate,
        title,
        link1.data.publicUrl,
        link2.data.publicUrl,
        link3.data.publicUrl,
        des,
        price,
        New,
        city,
        dis,
        ward
      )
    );
    setIsOpen(true);
    setNew(false);
    setImage("");
    setImage1("");
    setImage2("");
    setCate("");
    setPrice("");
    setPrice2("");
    setTitle("");
    setDes("");
    setCity("");
    setDis("");
    setWard("");
    setProgress(0);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
    setLoading(false);
  };
  const userID = async () => {
    const uid = await Storage.getItem({ key: "userID" });
    setID(uid);
  };
  useEffect(() => {
    userID();
  }, []);
  return (
    <Box safeAreaTop bg={Colors.white}>
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
              Đăng tin thành công
            </Text>
          </HStack>
        </Box>
      </Slide>
      {/* Header */}
      <HStack space={3} w="full" px={4} bg="#FFA500" py={3} alignItems="center">
        <Text bold fontSize={17} color="white">
          Đăng tin
        </Text>
      </HStack>
      <Box w="100%">
        <Progress
          size="xs"
          _filledTrack={{
            bg: "#009900",
          }}
          value={progress}
          rounded={0}
        />
      </Box>

      {/* Body */}
      {userInfo ? (
        <ScrollView showsVerticalScrollIndicator={false} mt={5}>
          <View bg={Colors.white} w="full" px={3}>
            <Text fontSize={13} color="gray.500">
              Danh mục
            </Text>
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
                setCate(itemValue);
              }}
            >
              {categories.map((data, index) => (
                <Select.Item key={index} label={data} value={data} />
              ))}
            </Select>
          </View>
          <VStack mt={5} px={3}>
            <View>
              <Text fontSize={17} color="gray.400">
                THÔNG TIN CHI TIẾT
              </Text>
            </View>
            <View mt={5}>
              {/* image1 */}
              {image ? (
                <Pressable
                  borderWidth={0.5}
                  _pressed={{ opacity: 0.8 }}
                  onPress={() => updateImage(1)}
                >
                  <Image
                    source={{ uri: image }}
                    alt="a"
                    h={250}
                    w="100%"
                    resizeMode="contain"
                  />
                  <Pressable
                    position="absolute"
                    right={10}
                    top={5}
                    onPress={() => {
                      setImage("");
                    }}
                  >
                    <AntDesign name="closecircle" size={30} color="gray" />
                  </Pressable>
                </Pressable>
              ) : (
                <Pressable
                  borderWidth={0.5}
                  alignItems="center"
                  padding={5}
                  borderStyle="dashed"
                  _pressed={{ opacity: 0.8 }}
                  onPress={() => updateImage(1)}
                >
                  <Entypo
                    name="camera"
                    size={15}
                    color="white"
                    style={{
                      backgroundColor: "gray",
                      borderRadius: 20,
                      padding: 5,
                    }}
                  />
                  <Text>Chọn hình ảnh bìa</Text>
                </Pressable>
              )}
              {/* image2 */}
              {image1 ? (
                <Pressable
                  borderWidth={0.5}
                  _pressed={{ opacity: 0.8 }}
                  onPress={() => updateImage(2)}
                >
                  <Image
                    source={{ uri: image1 }}
                    alt="a"
                    h={250}
                    w="100%"
                    resizeMode="contain"
                  />
                  <Pressable
                    position="absolute"
                    right={10}
                    top={5}
                    onPress={() => {
                      setImage1("");
                    }}
                  >
                    <AntDesign name="closecircle" size={30} color="gray" />
                  </Pressable>
                </Pressable>
              ) : (
                <Pressable
                  borderWidth={0.5}
                  alignItems="center"
                  padding={5}
                  borderStyle="dashed"
                  _pressed={{ opacity: 0.8 }}
                  onPress={() => updateImage(2)}
                >
                  <Entypo
                    name="camera"
                    size={15}
                    color="white"
                    style={{
                      backgroundColor: "gray",
                      borderRadius: 20,
                      padding: 5,
                    }}
                  />
                  <Text>Chọn hình ảnh mô tả sản phẩm</Text>
                </Pressable>
              )}
              {/* image3 */}
              {image2 ? (
                <Pressable
                  borderWidth={0.5}
                  _pressed={{ opacity: 0.8 }}
                  onPress={() => updateImage(3)}
                >
                  <Image
                    source={{ uri: image2 }}
                    alt="a"
                    h={300}
                    w="100%"
                    resizeMode="contain"
                  />
                  <Pressable
                    position="absolute"
                    right={10}
                    top={5}
                    onPress={() => {
                      setImage2("");
                    }}
                  >
                    <AntDesign name="closecircle" size={30} color="gray" />
                  </Pressable>
                </Pressable>
              ) : (
                <Pressable
                  borderWidth={0.5}
                  alignItems="center"
                  padding={5}
                  borderStyle="dashed"
                  _pressed={{ opacity: 0.8 }}
                  onPress={() => updateImage(3)}
                >
                  <Entypo
                    name="camera"
                    size={15}
                    color="white"
                    style={{
                      backgroundColor: "gray",
                      borderRadius: 20,
                      padding: 5,
                    }}
                  />
                  <Text>Chọn hình ảnh mô tả sản phẩm</Text>
                </Pressable>
              )}
            </View>
            <Text mt={5} color={"gray.500"}>
              Tình trạng
            </Text>
            <View mt={2} flexDirection="row">
              <Pressable
                borderWidth={0.5}
                p={2}
                rounded={10}
                borderColor="white"
                bg={New === false ? "#FFEC8B" : "gray.200"}
                onPress={() => setNew(false)}
              >
                <Text color={New === false ? "#FFA500" : "black"}>
                  Đã sử dụng
                </Text>
              </Pressable>
              <Pressable
                ml={5}
                borderWidth={0.5}
                p={2}
                rounded={10}
                borderColor="white"
                bg={New === false ? "gray.200" : "#FFEC8B"}
                w={50}
                alignItems="center"
                onPress={() => setNew(true)}
              >
                <Text color={New === false ? "black" : "#FFA500"}>Mới</Text>
              </Pressable>
            </View>
            <View mt={5}>
              <Input
                placeholder="Giá"
                borderColor={"gray.500"}
                keyboardType="numeric"
                onChangeText={(e) => {
                  validatePrice(e);
                  setPrice2(e);
                }}
                value={price2}
                _focus={{ borderColor: "gray.500", bg: "white" }}
              />
              <Input
                value={title}
                placeholder="Tiêu đề"
                borderColor={"gray.500"}
                mt={3}
                onChangeText={(e) => setTitle(e)}
                _focus={{ borderColor: "gray.500", bg: "white" }}
              />
              <TextArea
                mt={3}
                h={40}
                value={des}
                placeholder="Mô tả chi tiết"
                borderColor={"gray.500"}
                onChangeText={(e) => setDes(e)}
                w="100%"
                alignItems="stretch"
                _focus={{ borderColor: "gray.500", bg: "white" }}
              />
            </View>
            <View mt={5}>
              <Text fontSize={17} color="gray.400">
                VỀ NGƯỜI BÁN
              </Text>
            </View>
            <View mt={2}>
              <Select
                selectedValue={city}
                accessibilityLabel="Tỉnh, Thành phố"
                placeholder="Tỉnh, Thành phố"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => {
                  setCity(itemValue);
                }}
              >
                {cities.map((data, index) => (
                  <Select.Item key={index} label={data} value={data} />
                ))}
              </Select>
              <Select
                selectedValue={dis}
                accessibilityLabel="Quận, Huyện"
                placeholder="Quận, Huyện"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                isDisabled={city != "" ? false : true}
                mt={1}
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
              <Select
                selectedValue={ward}
                accessibilityLabel="Phường, Xã"
                placeholder="Phường, Xã"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                isDisabled={city != "" && dis != "" ? false : true}
                mt={1}
                onValueChange={(itemValue) => {
                  setWard(itemValue);
                }}
              >
                {wards.map((data, index) => (
                  <Select.Item key={index} label={data} value={data} />
                ))}
              </Select>
            </View>
            <View mb={100} alignItems="center" mt={5}>
              {loading === true ? (
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    width: 150,
                    alignItems: "center",
                    backgroundColor: "gray",
                    borderColor: "white",
                  }}
                >
                  <ActivityIndicator size="small" />
                </Pressable>
              ) : image.trim() != "" &&
                image1.trim() != "" &&
                image2.trim() != "" &&
                price.trim() != "" &&
                title.trim() != "" &&
                des.trim() != "" &&
                city.trim() != "" &&
                dis.trim() != "" &&
                ward.trim() != "" ? (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    width: 150,
                    alignItems: "center",
                    backgroundColor: "#FFA500",
                    borderColor: "white",
                  }}
                  onPress={() => {
                    addBlogHandler();
                  }}
                >
                  <Text color="white" bold>
                    ĐĂNG TIN
                  </Text>
                </TouchableOpacity>
              ) : (
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    width: 150,
                    alignItems: "center",
                    backgroundColor: "gray",
                    borderColor: "white",
                  }}
                >
                  <Text color="white" bold>
                    ĐĂNG TIN
                  </Text>
                </Pressable>
              )}
            </View>
          </VStack>
        </ScrollView>
      ) : (
        <Center mt={20} alignItems="center">
          <Text fontSize={20}>Bạn chưa đăng nhập</Text>
          <View height="full" mt={2}>
            <Button
              bg="#FFCC33"
              width={200}
              _pressed={{ bg: "#FFCC33" }}
              onPress={() => navigation.navigate("Login")}
            >
              Đăng nhập
            </Button>
            <Button
              bg="#CCCC66"
              mt={2}
              _pressed={{ bg: "#CCCC66" }}
              onPress={() => navigation.navigate("Register")}
            >
              Đăng ký
            </Button>
          </View>
        </Center>
      )}
    </Box>
  );
}

export default CreateBlogScreen;
