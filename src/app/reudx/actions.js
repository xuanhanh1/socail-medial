import types from './contains'

export const login = (userInfor) => {
    return {
        type: types.PROCESS_LOGIN,
        userInfor: userInfor
    }
}

export const getAllPosts = (posts) =>{
    return{
        type: types.GET_POSTS,
        posts: posts
    }
}