import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@material-ui/core'
import { selectSignedIn, selectUserData, setUserData, setSignedIn, setSearchInput } from '../Features/userSlice'
import { GoogleLogout } from 'react-google-login'

import '../styling/navbar.css'

const NavBar = () => {
    const [inputValue, setInputValue] = useState("tech")

    const isSignedIn = useSelector(selectSignedIn)

    const userData = useSelector(selectUserData)

    const dispatch = useDispatch()

    const logout = (response) => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setSearchInput(inputValue))
    }

    return (
        <div className="navbar">
            <h1 className="navbar__header">BookBlog 📖</h1>
            {

                isSignedIn &&
                <div className="blog__search">
                    <input type="text" className="search" placeholder="search for blog" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} />
                    <button className="submit" onClick={handleClick} >Search</button>
                </div>

            }
            {
                isSignedIn ? 
                <div className="navbar__user__data">
                    <Avatar className="user" src={userData?.imageUrl} alt={userData?.name} />
                    <h1 className="signedIn">{userData?.givenName}</h1>
                    <GoogleLogout 
                        clientId="967128438808-hetstp8cslk9rjs468mpev48t3lcfgrt.apps.googleusercontent.com" 
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="logout__button">Logout 😣</button>
                        )}
                        onLogoutSuccess={logout}
                    />

                </div>
                :
                <h1 className="notSignedIn"> User not available 😪</h1>
            }
        </div>
    )
}

export default NavBar
