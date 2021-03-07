import React from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../Features/userSlice';

import "../styling/home.css"

const HomePage = () => {

    const dispatch = useDispatch()

    const login = (response) => {
        console.log(response);
        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj))
    }

    const isSignedIn = useSelector(selectSignedIn)

    return (
        <div className="home__page" style={{ display: isSignedIn ? "none" : "" }} >
            {
            !isSignedIn ? 
            <div className="login__message">
                <h2>🅱</h2>
                <h1>A Readers Favourite Place!</h1>
                <p>
                    We provide high quality online reading resource . Sig-in and enjoy different reading options.
                </p>
                <GoogleLogin 
                    clientId="967128438808-hetstp8cslk9rjs468mpev48t3lcfgrt.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login__button">Login with Google</button>
                    )}
                    onSuccess={login}
                    onFailure={login}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                />
            </div> 
            : (
                ""
            )
            
        }
        </div>
    )
}

export default HomePage
