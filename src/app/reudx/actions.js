import types from './contains'

export const login = (userInfor) => {
    return {
        type: types.PROCESS_LOGIN,
        userInfor: userInfor
    }
}