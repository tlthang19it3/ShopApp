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
} from "native-base";
import React, { useState } from "react";
import Colors from "../color";
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StorageClient } from "@supabase/storage-js";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../Redux/Actions/UserActions";
import { ToastAndroid } from "react-native";
const STORAGE_URL = "https://ngfxbagkjhxyputmwoxp.supabase.co/storage/v1";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZnhiYWdramh4eXB1dG13b3hwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDIyMDE2NSwiZXhwIjoxOTg1Nzk2MTY1fQ.v1Bml2eA_eQno7gMBfDbtgLiyovkVs9orOz1w_89aVI"; //! service key, not anon key

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});
function UpdateProfileScreen({ navigation, route }) {
  const [avatar, setAvatar] = useState(null);
  const [pass, setPass] = useState(null);
  const userInfo = route.params;
  const dispatch = useDispatch();
  const updateImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const ext = result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf(".") + 1
        );
        const fileName = result.assets[0].uri.replace(/^.*[\\\/]/, "");
        setAvatar(result.assets[0].uri);
        const formData = new FormData();
        formData.append("files", {
          uri: result.assets[0].uri,
          name: fileName,
          type: `image/${ext}`,
        });

        const { data, error } = await storageClient
          .from("image")
          .upload(fileName, formData);
        if (error) {
          throw error;
          ToastAndroid.show(
            "Cập nhập ảnh đại diện thất bại",
            ToastAndroid.SHORT
          );
        }
        if (data) {
          dispatch(
            updateAvatar(
              userInfo._id,
              "https://ngfxbagkjhxyputmwoxp.supabase.co/storage/v1/object/public/image/" +
                fileName,
              pass
            )
          );
          ToastAndroid.show(
            "Cập nhập ảnh đại diện thành công",
            ToastAndroid.LONG
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box safeAreaTop bg={Colors.white}>
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
          Cài đặt thông tin
        </Text>
      </HStack>
      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false} py={3}>
        <View
          flexDirection="row"
          bg={Colors.white}
          w="full"
          px={3}
          alignItems="center"
        >
          <Pressable onPress={() => updateImage()}>
            {avatar === null ? (
              <Image
                source={{
                  uri: userInfo.avatar,
                }}
                h={20}
                w={20}
                alt="avatar"
                rounded="full"
              />
            ) : (
              <Image
                source={{
                  uri: avatar,
                }}
                h={20}
                w={20}
                alt="avatar"
                rounded="full"
              />
            )}
            <Entypo
              name="camera"
              size={15}
              color="white"
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                backgroundColor: "black",
                borderRadius: 20,
                padding: 5,
              }}
            />
          </Pressable>

          <VStack
            ml={5}
            borderWidth={0.5}
            flex={1}
            p={3}
            rounded={5}
            borderColor="gray.300"
          >
            <Text fontSize={13} color="gray.400">
              Họ và tên
            </Text>
            <Input
              borderWidth={0}
              p={0}
              fontSize={17}
              _focus={{ bg: Colors.white }}
              value={userInfo.name}
            />
          </VStack>
        </View>
        <View
          px={3}
          mt={3}
          borderBottomWidth={0.5}
          borderBottomColor="gray.400"
        >
          <Text color="gray.400">Số điện thoại</Text>
          <Text mt={1}>{userInfo.phone}</Text>
        </View>
        <View
          px={3}
          mt={3}
          borderBottomWidth={0.5}
          borderBottomColor="gray.400"
        >
          <Text color="gray.400">Email</Text>
          <Text mt={1}>{userInfo.email}</Text>
        </View>
        <Pressable
          px={3}
          mt={3}
          borderBottomWidth={0.5}
          borderBottomColor="gray.400"
          _pressed={{ opacity: 0.5 }}
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
        >
          <HStack justifyContent="space-between">
            <VStack>
              <Text color="gray.400">Mật khẩu</Text>
              <Text mt={1}>*******</Text>
            </VStack>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={Colors.deepestGray}
              style={{ alignSelf: "center" }}
            />
          </HStack>
        </Pressable>
      </ScrollView>
    </Box>
  );
}

export default UpdateProfileScreen;
