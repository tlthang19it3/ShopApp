import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_SUCCESS,
} from "./../Constants/UserConstants";

import { Storage } from "expo-storage";
//login
const setStorage = async (data) => {
  try {
    const userinfo = JSON.stringify(data);
    await Storage.setItem({ key: "userInfo", value: userinfo });
  } catch (e) {}
};
const URL = `https://server-shop-app.onrender.com`;
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/users/login`,
      {
        email,
        password,
      },
      config
    );
    const setuid = await Storage.setItem({ key: "userID", value: data._id });
    const setPass = await Storage.setItem({ key: "pass", value: password });
    const setinfo = await Storage.setItem({
      key: "userInfo",
      value: JSON.stringify(data),
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//logout

export const logout = () => async (dispatch) => {
  try {
    await Storage.removeItem({ key: "userInfo" });
    await Storage.removeItem({ key: "userID" });
    await Storage.removeItem({ key: "pass" });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });
};

//register
export const register = (name, email, phone, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/users`,
      {
        name,
        email,
        phone,
        password,
      },
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    const setuid = await Storage.setItem({ key: "userID", value: data._id });
    const setinfo = await Storage.setItem({
      key: "userInfo",
      value: JSON.stringify(data),
    });
    const setPass = await Storage.setItem({ key: "pass", value: password });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// use details
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}`,
      config
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

//upadte profile
export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/users/profile`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

//upadte avatar
export const updateAvatar = (id, avatar, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_AVATAR_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${URL}/api/users/profile`,
      {
        id,
        avatar,
        password,
      },
      config
    );

    dispatch({
      type: USER_UPDATE_AVATAR_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    const setuid = await Storage.setItem({ key: "userID", value: data._id });
    const setinfo = await Storage.setItem({
      key: "userInfo",
      value: JSON.stringify(data),
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_AVATAR_FAIL,
      payload: message,
    });
  }
};

// add review

export const addReview =
  (sellerId, rating, buyerId, buyername, avatar, date, comment) => async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${URL}/api/users/review`,
        {
          sellerId,
          rating,
          buyerId,
          buyername,
          avatar,
          date,
          comment,
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
