import types from "./contains";
const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  userInfor: user,
  posts: [],
  count: 0,
  allUserSuggestFollow: [],
  allUserFollowed: [],
  allUserContact: [],

  conversations: [],
  chats: [],
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

    case types.GET_ALL_SUGGEST_USER:
      return {
        ...state,
        allUserSuggestFollow: action.arrSuggestFollow,
      };
    case types.GET_ALL_USER_FOLLOWED:
      return {
        ...state,
        allUserFollowed: action.userFollowed,
      };

    case types.GET_ALL_USER_CONTACT:
      return {
        ...state,
        allUserContact: action.userContacts,
      };
    case types.GET_ALL_CONVERSATIONS:
      return {
        ...state,
        conversations: action.conversations,
      };
    case types.GET_ALL_CHATS:
      return {
        ...state,
        chats: action.chats,
      };
    default:
      return state;
  }
};

export default rootReducer;
