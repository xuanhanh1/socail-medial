import types from "./contains";
import { db } from "../../firebase";

export const login = (userInfor) => {
  return {
    type: types.PROCESS_LOGIN,
    userInfor: userInfor,
  };
};

export const logout = () => {
  return {
    type: types.PROCESS_LOGOUT,
  };
};
export const count = () => {
  return {
    type: types.COUNT,
  };
};

export const getAllPosts = (posts) => {
  return {
    type: types.GET_POSTS,
    posts: posts,
  };
};

export const suggestFollow = (arrSuggestFollow) => {
  return {
    type: types.GET_ALL_SUGGEST_USER,
    arrSuggestFollow: arrSuggestFollow,
  };
};
export const getAllUserFollowed = (userFollowed) => {
  return {
    type: types.GET_ALL_USER_FOLLOWED,
    userFollowed: userFollowed,
  };
};
export const getAllUserContact = (userContacts) => {
  return {
    type: types.GET_ALL_USER_CONTACT,
    userContacts: userContacts,
  };
};
