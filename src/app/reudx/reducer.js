import types from './contains'

const initialState = {
    userInfor: {},
    posts: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PROCESS_LOGIN:
            return {
                ...state,
                userInfor: action.userInfor,
            }

        case types.GET_ALL_POSTS:
            return{
                ...state,
                posts: action.posts
            }
        default:
            return state;
    }
}

export default rootReducer;