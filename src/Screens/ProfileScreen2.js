import { Box, Text, ScrollView, View, Image, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { Pressable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/UserActions";
import { Storage } from "expo-storage";
import axios from "axios";

function ProfileScreen2({ navigation }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchProfile();
  //     console.log(userInfo);
  //   }, 1000);
  // }, []);

  const dispatch = useDispatch();
  const logoutHander = async () => {
    dispatch(logout());
  };

  return (
    <Box safeAreaTop bg={Colors.gray}>
      <View space={3} w="full" px={4} bg="#FFA500" py={3} alignItems="center">
        <Text bold fontSize={17} color="white">
          {userInfo ? "Thông tin cá nhân" : "Thêm"}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          flexDirection="row"
          bg={Colors.white}
          w="full"
          px={3}
          py={3}
          alignItems="center"
        >
          {userInfo != null ? (
            <Image
              source={{ uri: userInfo.avatar }}
              h={20}
              w={20}
              alt="avatar"
              rounded="full"
            />
          ) : (
            <Image
              source={require("../../assets/avatar.jpg")}
              h={20}
              w={20}
              alt="avatar"
              rounded="full"
            />
          )}
          {userInfo != null ? (
            <VStack ml={5}>
              <Text bold fontSize={17}>
                {userInfo.name}
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 25,
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: 2,
                  color: Colors.white,
                  borderColor: Colors.deepestGray,
                  padding: 5,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
                onPress={() => {
                  navigation.navigate("Profile1", userInfo);
                }}
              >
                <Text fontSize={12}>Xem trang cá nhân</Text>
              </TouchableOpacity>
            </VStack>
          ) : (
            <Pressable
              bold
              fontSize={17}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text bold fontSize={16} ml={5}>
                Đăng nhập/Đăng ký
              </Text>
            </Pressable>
          )}
        </View>
        <Text color="#808080" bold fontSize={15} p={3}>
          Quản lí đơn hàng
        </Text>
        <View bg={Colors.white}>
          <VStack>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 0.6,
                borderBottomColor: Colors.deepGray,
              }}
              onPress={() => {
                userInfo == null
                  ? navigation.navigate("Login")
                  : navigation.navigate("ManageBuyOrder");
              }}
            >
              <Image
                source={require("../../assets/icon1.png")}
                alt="icon"
                h={7}
                w={7}
              />
              <Text fontSize={15} ml={2}>
                Đơn mua
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                userInfo == null
                  ? navigation.navigate("Login")
                  : navigation.navigate("ManageSellOrder");
              }}
            >
              <Image
                source={require("../../assets/icon2.png")}
                alt="icon"
                h={7}
                w={7}
              />
              <Text fontSize={15} ml={2}>
                Đơn bán
              </Text>
            </TouchableOpacity>
          </VStack>
        </View>
        <Text color="#808080" bold fontSize={15} p={3}>
          Tiện ích
        </Text>
        <View bg={Colors.white} mb={20}>
          <VStack>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 0.6,
                borderBottomColor: Colors.deepGray,
              }}
              onPress={() => {
                userInfo != null
                  ? navigation.navigate("UpdateProfile", userInfo)
                  : navigation.navigate("Login");
              }}
            >
              <Image
                source={require("../../assets/icon4.png")}
                alt="icon"
                h={7}
                w={7}
              />
              <Text fontSize={15} ml={2}>
                Cài đặt tài khoản
              </Text>
            </TouchableOpacity>
            {userInfo != null ? (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => {
                  logoutHander();
                }}
              >
                <Image
                  source={require("../../assets/icon5.png")}
                  alt="icon"
                  h={7}
                  w={7}
                />
                <Text fontSize={15} ml={2}>
                  Đăng xuất
                </Text>
              </TouchableOpacity>
            ) : (
              ""
            )}
          </VStack>
        </View>
      </ScrollView>
    </Box>
  );
}

export default ProfileScreen2;
