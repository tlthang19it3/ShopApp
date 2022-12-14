import {
  Box,
  Text,
  ScrollView,
  HStack,
  Pressable,
  View,
  VStack,
  FormControl,
  TextArea,
  Avatar,
  Divider,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../Redux/Actions/UserActions";
import Rating from "../Components/Rating";
import { ActivityIndicator, TouchableOpacity } from "react-native";
const Url = `http://192.168.1.7:5000`;
function ReviewScreen({ navigation, route }) {
  const id = route.params;
  const [loading, setLoading] = useState(true);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [owner, setOwner] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const fetchProfileOwner = async () => {
    try {
      const { data } = await axios.get(`${Url}/api/users/profile/${id}`);
      setOwner(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfileOwner();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const getDate = () => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    return date + "/" + month + "/" + year;
  };
  const dispatch = useDispatch();
  const submit = (
    sellerId,
    rating,
    buyerId,
    buyername,
    avatar,
    date,
    comment
  ) => {
    dispatch(
      addReview(sellerId, rating, buyerId, buyername, avatar, date, comment)
    );
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };
  return (
    <Box safeAreaTop flex={1} bg={Colors.white}>
      {/* Header */}
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
          ????nh gi??
        </Text>
      </HStack>
      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View m={2} bg="white" borderWidth={0.7} p={3} borderStyle="dotted">
          <Text fontSize={17} bold textAlign="center">
            Tr???i nghi???m c???a b???n v???i {owner.name} nh?? th??? n??o
          </Text>
          <VStack space={6}>
            <FormControl>
              <AirbnbRating
                reviewSize={12}
                onFinishRating={(e) => setRating(e)}
                size={50}
                reviews={""}
                defaultRating={0}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                H??y vi???t ????nh gi?? c???a b???n
              </FormControl.Label>
              <TextArea
                onChangeText={(e) => setComment(e)}
                height={40}
                mt={2}
                placeholder="Chia s??? th??m v??? tr???i nghi???m mua b??n c???a b???n"
                alignItems="stretch"
                _focus={{ borderColor: "gray.500", bg: "white" }}
              />
            </FormControl>
            <TouchableOpacity
              style={{
                backgroundColor: "#EE9A00",
                color: Colors.white,
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                submit(
                  owner._id,
                  rating,
                  userInfo._id,
                  userInfo.name,
                  userInfo.avatar,
                  getDate(),
                  comment
                );
              }}
            >
              <Text bold color="white">
                ????NH GI??
              </Text>
            </TouchableOpacity>
          </VStack>
        </View>
        <Divider orientation="horizontal" />
        {loading ? (
          <View flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View mt={5} pb={10}>
            <View
              flexDirection="row"
              px={5}
              borderBottomWidth={0.7}
              pb={3}
              borderColor={"gray.300"}
            >
              <Avatar source={{ uri: owner.avatar }} size="xl" />
              <VStack ml={3} space={1}>
                <Text bold fontSize={17}>
                  {owner.name}
                </Text>

                <View flexDirection="row" alignItems="center">
                  {owner.numReviews === 0 ? (
                    <Text fontSize={18} bold mr={1}>
                      Ch??a c?? ????nh gi??
                    </Text>
                  ) : (
                    <Text fontSize={23} bold mr={1}>
                      {(owner.rating / owner.numReviews).toFixed(1)}
                    </Text>
                  )}
                  {owner.numReviews === 0 ? (
                    <View></View>
                  ) : (
                    <FontAwesome name={"star"} color={"orange"} size={20} />
                  )}
                </View>
                <Text fontSize={13}>{owner.numReviews} ????nh gi??</Text>
              </VStack>
            </View>
            {owner ? (
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

                    <Text w="40%">{review.comment}</Text>
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
              <Text></Text>
            )}
          </View>
        )}
      </ScrollView>
    </Box>
  );
}

export default ReviewScreen;
