import axios from "axios";
const URL = `https://server-shop-app.onrender.com`;
export const addBlog =
  (
    userId,
    category,
    title,
    image,
    image1,
    image2,
    description,
    price,
    isNew,
    city,
    district,
    ward
  ) =>
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${URL}/api/product`,
        {
          userId,
          category,
          title,
          image,
          image1,
          image2,
          description,
          price,
          isNew,
          city,
          district,
          ward,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

export const updateStatusBlog = (id, status) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${URL}/api/product/update-status`,
      { id, status },
      config
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
};

export const updateBlogSold = (id, status) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${URL}/api/product/update-sold`,
      { id, status },
      config
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
};

export const updateBlog =
  (
    id,
    category,
    isNew,
    price,
    title,
    description,
    city,
    district,
    ward,
    image,
    image1,
    image2
  ) =>
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${URL}/api/product/update-blog`,
        {
          id,
          category,
          isNew,
          price,
          title,
          description,
          city,
          district,
          ward,
          image,
          image1,
          image2,
        },
        config
      );
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };
