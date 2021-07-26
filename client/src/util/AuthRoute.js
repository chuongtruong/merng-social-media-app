//check if user is login or not
//if yes, redirect user to homepage if user go to link /register or /login
import react, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

//need to destructure AuthContext from auth.js
import {AuthContext} from '../context/auth';

function AuthRoute({component: Component, ...rest}){
    const {user} = useContext(AuthContext);

    return (
        <Route
        {...rest}
        render = {props => 
            user ? <Redirect to = "/" />: <Component {...props}/>
        }
        />
    )
}

export default AuthRoute;
