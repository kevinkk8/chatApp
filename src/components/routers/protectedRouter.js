import React from "react"
import { Route, Redirect } from "react-router"
import { useSelector } from "react-redux"

const ProtecetedRouter = ({component: Component, ...props })=> {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

    return (
        <Route {...props} 
            render={
                (props) => (isLoggedIn ? <Component {...props}/> : <Redirect to='/login' />)
            }
        />
    );
}

export default ProtecetedRouter