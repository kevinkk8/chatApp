import { LOGIN, REGISTER, LOGOUT, UPDATE } from "../types/index";

const initialState = {
    // user: JSON.parse(localStorage.getItem('user')) || {},
    // token: localStorage.getItem('token') || '',
    // isLoggedIn: localStorage.getItem('user') ? true : false

    user:  {},
    token: '',
    isLoggedIn: false
}

const authReducer = (state = initialState, action)=> {

    const {type , payload } = action
    
    switch(type){
        case LOGIN:
            return {
                ...state,
                user:payload.user,
                token: payload.token,
                isLoggedIn: true
            }
        case REGISTER:
            return {
                ...state,
                user:payload.user,
                token: payload.token,
                isLoggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                user:{},
                token: '',
                isLoggedIn: false
            }
        case UPDATE:
            return {
                ...state,
                user:payload,
            }

        default: {
            return state
        }
    }

}

export default authReducer