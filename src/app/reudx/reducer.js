import types from './contains'

const initialState = {
    userInfor: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PROCESS_LOGIN:
            return {
                ...state,
                userInfor: action.userInfor,
            }
        default:
            return state;
    }
}

export default rootReducer;