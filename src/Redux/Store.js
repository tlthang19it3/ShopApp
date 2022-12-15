import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateAvatarReducer,
  userUpdateProfileReducer,
} from "./Reducers/UserReducers";

import { Storage } from "expo-storage";
import { useEffect } from "react";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdateAvatar: userUpdateAvatarReducer,
});
let userInfoFromLocalStorage;
const getUser = async () => {
  const user = await Storage.getItem({ key: "userInfo" });
  userInfoFromLocalStorage = JSON.parse(user);
};
getUser();

const initialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
