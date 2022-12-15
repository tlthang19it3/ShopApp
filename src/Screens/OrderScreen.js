import React from "react";
import {
  Box,
  ScrollView,
  Heading,
} from "native-base";
import Colors from "../color";
import OrderInfo from "../Components/OrderInfo";
import {FontAwesome5, Ionicons } from "@expo/vector-icons";
import OrderItem from "../Components/OrderItem";
import OrderModal from "../Components/OrderModal";

function OrderScreen() {
  return (
    <Box bg={Colors.subGreen} flex={1} safeAreaTop pt={6}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <OrderInfo
              title="SHIPPING INFO"
              subTitle="Shipping: Mew"
              text="Pay method: Paypal"
              success
              icon={
                <FontAwesome5
                  name="shipping-fast"
                  size={30}
                  color={Colors.white}
                ></FontAwesome5>
              }
            />
            <OrderInfo
              title="DELIVER TO"
              subTitle="Address:"
              text="Da nang hoang dieu"
              danger
              icon={
                <Ionicons
                  name="location-sharp"
                  size={30}
                  color={Colors.white}
                ></Ionicons>
              }
            />
          </ScrollView>
        </Box>
        {/* ORDER ITEM */}
        <Box px={6} flex={1} pb={3}>
          <Heading bold fontSize={15} isTruncated my={4}>
            PRODUCTS
          </Heading>
          <OrderItem />
          {/* TOTAL */}
          <OrderModal/>

        </Box>
      </ScrollView>
    </Box>
  );
}

export default OrderScreen;
