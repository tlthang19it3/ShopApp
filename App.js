import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./src/Navigations/BottomNav";
import LoginScreen2 from "./src/Screens/LoginScreen2";
import RegisterScreen2 from "./src/Screens/RegisterScreen2";
import SimiliarProductScreen from "./src/Screens/SimiliarProductScreen";
import UpdateProfileScreen from "./src/Screens/UpdateProfileScreen";
import { Provider } from "react-redux";
import store from "./src/Redux/Store";
import CreateBlogScreen from "./src/Screens/CreateBlogScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import OwnerProfileScreen from "./src/Screens/OwnerProfileScreen";
import TestScreen from "./src/Screens/TestScreen";
import ChangePasswordScreen from "./src/Screens/ChangePasswordScreen";
import SingleProductScreen from "./src/Screens/SingleProductScreen";
import EditBlogScreen from "./src/Screens/EditBlogScreen";
import OrderScreen from "./src/Screens/OrderScreen";
import PaymentScreen from "./src/Screens/PaymentScreen";
import WaitAcceptScreen from "./src/Screens/WaitAcceptScreen";
import AcceptScreen from "./src/Screens/AcceptScreen";
import ShippingScreen from "./src/Screens/ShippingScreen";
import SuccessfulReceiveScreen from "./src/Screens/SuccessfulReceiveScreen";
import AcceptOrderScreen from "./src/Screens/SellerScreen/AcceptOrderScreen";
import ShippingOrderScreen from "./src/Screens/SellerScreen/ShippingOrderScreen";
import SuccessOrderScreen from "./src/Screens/SellerScreen/SuccessOrderScreen";
import ShippingOrderScreen2 from "./src/Screens/SellerScreen/ShippingOrderScreen2";
import ManageBuyOrderScreen from "./src/Screens/ManageBuyOrderScreen";
import OrderInfoScreen from "./src/Screens/OrderInfoScreen";
import ManageSellOrderScreen from "./src/Screens/SellerScreen/ManageSellOrderScreen";
import SellerOrderInfoScreen from "./src/Screens/SellerScreen/SellerOrderInfoScreen";
import ReviewScreen from "./src/Screens/ReviewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar hidden={false} barStyle="light-content" />

          <Stack.Navigator
            initialRouteName="Bottom"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Test" component={TestScreen} />
            <Stack.Screen name="Login" component={LoginScreen2} />
            <Stack.Screen name="Register" component={RegisterScreen2} />
            <Stack.Screen name="Bottom" component={BottomNav} />
            <Stack.Screen
              name="SimiliarProduct"
              component={SimiliarProductScreen}
            />
            <Stack.Screen
              name="UpdateProfile"
              component={UpdateProfileScreen}
            />
            <Stack.Screen name="CreateBlog" component={CreateBlogScreen} />
            <Stack.Screen name="Profile1" component={ProfileScreen} />
            <Stack.Screen name="OwnerProfile" component={OwnerProfileScreen} />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="Single" component={SingleProductScreen} />
            <Stack.Screen name="EditBlog" component={EditBlogScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            {/* Buyer order screen */}
            <Stack.Screen name="Checkout" component={PaymentScreen} />
            <Stack.Screen name="WaitScreen" component={WaitAcceptScreen} />
            <Stack.Screen name="AcceptScreen" component={AcceptScreen} />
            <Stack.Screen name="Shipping" component={ShippingScreen} />
            <Stack.Screen name="Success" component={SuccessfulReceiveScreen} />
            {/* Seller order screen */}
            <Stack.Screen name="AcceptOrder" component={AcceptOrderScreen} />
            <Stack.Screen
              name="ShippingOrder"
              component={ShippingOrderScreen}
            />
            <Stack.Screen
              name="ShippingOrder2"
              component={ShippingOrderScreen2}
            />
            <Stack.Screen name="SuccessOrder" component={SuccessOrderScreen} />
            {/* Manage Buy Order */}
            <Stack.Screen
              name="ManageBuyOrder"
              component={ManageBuyOrderScreen}
            />
            <Stack.Screen name="OrderInfo" component={OrderInfoScreen} />
            {/* Manage Sell Order */}
            <Stack.Screen
              name="ManageSellOrder"
              component={ManageSellOrderScreen}
            />
            <Stack.Screen
              name="SellerOrderInfo"
              component={SellerOrderInfoScreen}
            />
            {/* Review */}
            <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
