import React, {useReducer, createContext} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
};

if (localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    if (decodedToken.exp * 1000 < Date.now()){
        // if token time was too long
        localStorage.removeItem('jwtToken');
    } else {
        initialState.user = decodedToken;
    }
}

//3:21:00
// initial context
const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
})

//reducer
function authReducer(state, action){
    console.log("state is ", state)
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }    
        default:
            return state
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(data){
        //store token in local storage
        localStorage.setItem("jwtToken", data.token);

        dispatch({
            type: 'LOGIN',
            payload: data
        })
    }

    function logout(){
        //remove token from local storage after logging out
        localStorage.removeItem("jwtToken");
        dispatch({
            type: 'LOGOUT',
        })
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}

//export without "Default" if we want to export multiple things
//export an {object of multiple fuctions}
export {AuthContext, AuthProvider}