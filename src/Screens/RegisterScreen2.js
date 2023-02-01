import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Box, Image } from "native-base";
import CustomButton from "../Components/CustomButton";
import InputField from "../Components/InputField";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/UserActions";

import { Storage } from "expo-storage";

const RegisterScreen2 = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [error1, setError] = useState(null);
  const validateName = (name) => {
    let reg = /^.[^0-9\[\]\^\(\)\#=\-\+\/\":'|{},<>@$!%*?.&]{4,30}$/;
    if (reg.test(name) === false) {
      setName(null);
    } else {
      setName(name);
    }
  };

  const validate = (email) => {
    let reg = /^.{2,}\w+([\.-]?\w+)*@\w.{1,}([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmail(null);
    } else {
      setEmail(email);
    }
  };

  const validatePhone = (phone) => {
    let reg = /^0[0-9\-\+]{9,9}$/;
    if (reg.test(phone) === false) {
      setPhone(null);
    } else {
      setPhone(phone);
    }
  };

  const validatePass = (pass) => {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (reg.test(pass) === false) {
      setPassword(null);
    } else {
      setPassword(pass);
    }
  };

  const validatePass2 = (pass) => {
    if (pass === password) {
      setPassword2(pass);
    } else {
      setPassword2(null);
    }
  };
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading } = userRegister;
  let userInfo = null;
  const getUser = async () => {
    const user = await Storage.getItem({ key: "userInfo" });
    if (user != null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigation.navigate("Bottom");
    }
  }, [userInfo]);
  const registerHandler = () => {
    dispatch(register(name, email, phone, password));
    userInfo = getUser();
  };

  return (
    <Box
      safeAreaTop
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.white,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginTop: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/logo.jpg")}
            alt="twiter"
            height={150}
            width={150}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#FF7F00",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Tạo tài khoản mới
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../../assets/google.png")}
              alt="google"
              height={10}
              width={10}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../../assets/facebook.png")}
              alt="fb"
              height={10}
              width={10}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../../assets/twiter.png")}
              alt="twiter"
              height={10}
              width={10}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Hoặc đăng kí với email và số điện thoại
        </Text>

        <InputField
          label={"Họ và tên"}
          onChangeText={(e) => {
            validateName(e);
          }}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          autoComplete="name"
        />

        <InputField
          label={"Email"}
          onChangeText={(e) => {
            validate(e);
          }}
          icon={
            <MaterialIcons
              name="email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          autoComplete="email"
        />

        <InputField
          label={"Số điện thoại"}
          onChangeText={(e) => {
            validatePhone(e);
          }}
          icon={
            <Feather
              name="phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="numeric"
          autoComplete="tel"
        />

        <InputField
          label={"Mật khẩu"}
          onChangeText={(e) => {
            validatePass(e);
          }}
          icon={
            <Feather
              name="lock"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <InputField
          label={"Xác nhận mật khẩu"}
          onChangeText={(e) => {
            validatePass2(e);
          }}
          icon={
            <Feather
              name="lock"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        {error && (
          <View alignItems="center">
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: Colors.red,
                paddingBottom: 10,
              }}
            >
              {error}
            </Text>
          </View>
        )}
        {loading === true ? (
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <ActivityIndicator size="large" />
          </TouchableOpacity>
        ) : name != null &&
          email != null &&
          password != null &&
          password2 != null &&
          phone != null ? (
          <CustomButton
            label={"ĐĂNG KÍ"}
            bg="#FF7F00"
            disabled={false}
            onPress={() => {
              Keyboard.dismiss();
              registerHandler();
            }}
          />
        ) : (
          <CustomButton
            label={"ĐĂNG KÍ"}
            bg="#FF7F00"
            disabled={false}
            onPress={() =>
              setError(
                "Tên chứa ít nhất 5 chữ \nMật khẩu phải đáp ứng: \nÍt nhất 8 kí tự \nÍt nhất có 1 kí tự số và chữ"
              )
            }
          />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#4169E1", fontWeight: "700" }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Box>
  );
};

export default RegisterScreen2;
