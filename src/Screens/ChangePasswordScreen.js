import {
  Box,
  Text,
  ScrollView,
  View,
  VStack,
  Input,
  HStack,
  FormControl,
  Icon,
  Slide,
  CheckIcon,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { ActivityIndicator, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../Redux/Actions/UserActions";
import CustomButton from "../Components/CustomButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Storage } from "expo-storage";
function ChangePasswordScreen({ navigation }) {
  const userLogin = useSelector((state) => state.userLogin);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const { userInfo } = userLogin;
  const [oldpass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [pw, setPw] = useState(null);
  const pass = async () => {
    const getPass = await Storage.getItem({ key: "pass" });
    setPw(getPass);
  };

  const validatePass = (pass) => {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (reg.test(pass) === false) {
      setNewPass(null);
    } else {
      setNewPass(pass);
    }
  };
  useEffect(() => {
    pass();
  }, []);

  const dispatch = useDispatch();
  const submitHandler = async () => {
    dispatch(updateAvatar(userInfo._id, avatar, newPass));
    const setPass = await Storage.setItem({ key: "pass", value: newPass });
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };
  return (
    <Box safeAreaTop bg={Colors.gray}>
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
              C???p nh???p m???t kh???u th??nh c??ng
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
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text bold fontSize={17} color="white">
          Thay ?????i m???t kh???u
        </Text>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View bg={Colors.white} mt={5}>
          <VStack p={5}>
            <FormControl>
              <Input
                fontSize={15}
                placeholder="M???t kh???u c??"
                mt={2}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                onChangeText={(e) => setOldPass(e)}
              />
              {pw != oldpass && oldpass != null ? (
                <FormControl.HelperText>
                  <Text color="red.400" fontSize={13}>
                    M???t kh???u kh??ng ????ng
                  </Text>
                </FormControl.HelperText>
              ) : (
                <View></View>
              )}

              <Input
                fontSize={15}
                placeholder="M???t kh???u m???i"
                mt={2}
                onChangeText={(e) => validatePass(e)}
                type={show1 ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow1(!show1)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show1 ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
              ></Input>
              {newPass == null ? (
                <FormControl.HelperText>
                  ??t nh???t 8 k?? t???, ??t nh???t 1 k?? t??? s??? v?? 1 k?? t??? ch???
                </FormControl.HelperText>
              ) : (
                <View></View>
              )}

              <Input
                fontSize={15}
                placeholder="Nh???p l???i m???t kh???u"
                mt={2}
                onChangeText={(e) => {
                  setConfirm(e);
                }}
                type={show2 ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow2(!show2)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show2 ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
              ></Input>
              {confirm != newPass && confirm != null ? (
                <FormControl.HelperText>
                  <Text color="red.400" fontSize={13}>
                    M???t kh???u kh??ng kh???p
                  </Text>
                </FormControl.HelperText>
              ) : (
                <View></View>
              )}
            </FormControl>

            <View mt={5}>
              {loading ? (
                <View rounded={9} p={3} bg="gray">
                  <ActivityIndicator size="large" />
                </View>
              ) : oldpass === pw && newPass != null && confirm === newPass ? (
                <CustomButton
                  label={"C???P NH???P"}
                  bg="#F4A460"
                  disabled={false}
                  onPress={() => submitHandler()}
                />
              ) : (
                <CustomButton label={"C???P NH???P"} bg="gray" disabled={true} />
              )}
            </View>
          </VStack>
        </View>
      </ScrollView>
    </Box>
  );
}

export default ChangePasswordScreen;
