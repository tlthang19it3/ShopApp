import React from "react";
import AcceptOrderScreen from "./AcceptOrderScreen";
import ShippingOrderScreen from "./ShippingOrderScreen";
import ShippingOrderScreen2 from "./ShippingOrderScreen2";
import SuccessOrderScreen from "./SuccessOrderScreen";

const Url = `https://server-shop-app.onrender.com`;

function SellerOrderInfoScreen({ route }) {
  const order = route.params;

  if (order.status === "Chờ xác nhận") {
    return <AcceptOrderScreen data={order} />;
  } else if (order.status === "Đang xử lý") {
    return <ShippingOrderScreen data={order} />;
  } else if (order.status === "Đang giao hàng") {
    return <ShippingOrderScreen2 data={order} />;
  } else {
    return <SuccessOrderScreen data={order} />;
  }
}

export default SellerOrderInfoScreen;
