import React from "react";
import WaitAcceptScreen from "./WaitAcceptScreen";
import AcceptScreen from "./AcceptScreen";
import ShippingScreen from "./ShippingScreen";
import SuccessfulReceiveScreen from "./SuccessfulReceiveScreen";

const Url = `http://192.168.1.7:5000`;

function OrderInfoScreen({ route }) {
  const order = route.params;

  if (order.status === "Chờ xác nhận") {
    return <WaitAcceptScreen data={order} />;
  } else if (order.status === "Đang xử lý") {
    return <AcceptScreen data={order} />;
  } else if (order.status === "Đang giao hàng") {
    return <ShippingScreen data={order} />;
  } else {
    return <SuccessfulReceiveScreen data={order} />;
  }
}

export default OrderInfoScreen;
