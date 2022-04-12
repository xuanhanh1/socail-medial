import types from "./contains";
const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  userInfor: user,
  posts: [],
  count: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROCESS_LOGIN:
      localStorage.setItem("user", JSON.stringify(action.userInfor));
      return {
        ...state,
        userInfor: action.userInfor,
      };
    case types.COUNT:
      return {
        ...state,
        count: 1,
      };
    case types.PROCESS_LOGOUT:
      console.log("user logout");
      return {
        ...state,
        userInfor: null,
      };

    case types.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};

export default rootReducer;
