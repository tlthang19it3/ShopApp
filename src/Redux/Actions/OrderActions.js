import axios from "axios";
const URL = `https://server-shop-app.onrender.com`;
export const createOrder =
  (
    buyerId,
    seller,
    blog,
    name,
    phone,
    city,
    district,
    ward,
    address,
    total,
    note,
    timeCreated
  ) =>
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${URL}/api/order`,
        {
          buyerId,
          seller,
          blog,
          name,
          phone,
          city,
          district,
          ward,
          address,
          total,
          note,
          timeCreated,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

export const updateOrderStatus = (id, status, timeReceived) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data2 = await axios.put(
      `${URL}/api/order/update-status`,
      { id, status, timeReceived },
      config
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
};

export const deleteOrder = (id) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data2 = await axios.delete(`${URL}/api/order/delete/${id}`, config);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
};
